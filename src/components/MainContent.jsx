// MainContent.jsx
import React, { useState, useEffect } from "react";
import QuestionComponent from "../scripts/QuestionComponent.js";
import { questions, themes } from "../scripts/questionData.js";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../scripts/firebase-config";

const MainContent = ({ updateTotalScore }) => {
  const [themeScores, setThemeScores] = useState({});
  const [collapsedThemes, setCollapsedThemes] = useState({});

  // **🔹 Update theme scores**
  const updateThemeScores = (questionId, scoreChange, isAnswered, isExcluded) => {
    setThemeScores((prevScores) => {
      const newScores = { ...prevScores };
      const themeId = questions.find((q) => q.id === questionId)?.theme;
      if (!themeId) return prevScores;

      if (!newScores[themeId]) {
        newScores[themeId] = { totalScore: 0, answeredCount: 0 };
      }

      if (isExcluded) {
        newScores[themeId].totalScore -= scoreChange;
        newScores[themeId].answeredCount = Math.max(0, newScores[themeId].answeredCount - 1);
      } else {
        newScores[themeId].totalScore += scoreChange;
        if (isAnswered) {
          newScores[themeId].answeredCount += 1;
        } else {
          newScores[themeId].answeredCount = Math.max(0, newScores[themeId].answeredCount - 1);
        }
      }

      return { ...newScores };
    });
  };

  // **🔹 Update total score when theme scores change**
  useEffect(() => {
    let totalSum = 0;
    let totalAnswered = 0;

    Object.values(themeScores).forEach((theme) => {
      totalSum += theme.totalScore;
      totalAnswered += theme.answeredCount;
    });

    if (totalAnswered >= 3) {
      updateTotalScore((totalSum / totalAnswered).toFixed(2));
    } else {
      updateTotalScore(0);
    }
  }, [themeScores, updateTotalScore]);

  // **🔹 Save scores to Firebase when updated**
  useEffect(() => {
    if (auth.currentUser) {
      const userDoc = doc(db, "users", auth.currentUser.uid);
      setDoc(userDoc, { themeScores }, { merge: true })
        .then(() => console.log("Scores saved to Firestore"))
        .catch((error) => console.error("Error saving scores:", error));
    }
  }, [themeScores]);

  // **🔹 Toggle Collapse State**
  const toggleCollapse = (themeId) => {
    setCollapsedThemes((prev) => ({
      ...prev,
      [themeId]: !prev[themeId],
    }));
  };

  // **🔹 Calculate Theme Score**
  const calculateThemeScore = (themeId) => {
    const theme = themeScores[themeId];
    if (!theme || theme.answeredCount < 3) return null; // Hide if <3 answers
    return (theme.totalScore / theme.answeredCount).toFixed(2);
  };

  return (
    <main>
      {themes.map((theme) => (
        <div key={theme.id} className="tema">
          <div className="tema-header">
            <button className="collapse-button" onClick={() => toggleCollapse(theme.id)}>
              {collapsedThemes[theme.id] ? "+" : "-"}
            </button>
            <h2>{theme.title}</h2>
            <div className="temascore-display">
              {calculateThemeScore(theme.id) !== null && (
                <span>Score: {calculateThemeScore(theme.id)}</span>
              )}
            </div>
          </div>
          {!collapsedThemes[theme.id] && (
            <div className="content-section">
              {questions
                .filter((q) => q.theme === theme.id)
                .map((question) => (
                  <QuestionComponent
                    key={question.id}
                    question={question}
                    updateThemeScores={updateThemeScores}
                  />
                ))}
            </div>
          )}
        </div>
      ))}
    </main>
  );
};

export default MainContent;
