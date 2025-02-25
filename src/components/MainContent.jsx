import React, { useState, useEffect, useCallback } from "react";
import QuestionComponent from "../scripts/QuestionComponent.js";
import { questions, themes } from "../scripts/questionData.js";

const MainContent = ({ updateTotalScore }) => {
  // New state: an object that maps question IDs to their score and answered flag.
  const [questionScores, setQuestionScores] = useState({});
  const [collapsedThemes, setCollapsedThemes] = useState({});

  // updateQuestionScore now simply stores each question's current score and answered status.
  // Wrapped in useCallback to prevent unnecessary re-renders in children.
  const updateQuestionScore = useCallback((questionId, score, answered) => {
    setQuestionScores((prev) => ({
      ...prev,
      [questionId]: { score, answered },
    }));
  }, []);

  // Compute the theme score by aggregating scores for all questions in that theme.
  // Only return a score if at least three questions in the theme are answered.
  const getThemeScore = (themeId) => {
    const themeQuestions = questions.filter(q => q.theme === themeId);
    let totalScore = 0;
    let answeredCount = 0;
    themeQuestions.forEach((q) => {
      const qs = questionScores[q.id];
      if (qs && qs.answered) {
        totalScore += qs.score;
        answeredCount += 1;
      }
    });
    return answeredCount >= 3 ? (totalScore / answeredCount).toFixed(2) : null;
  };

  // Recalculate the overall total score when any question score changes.
  // The total score is only updated if at least three questions overall are answered.
  useEffect(() => {
    let totalScore = 0;
    let totalAnswered = 0;
    questions.forEach((q) => {
      const qs = questionScores[q.id];
      if (qs && qs.answered) {
        totalScore += qs.score;
        totalAnswered += 1;
      }
    });
    updateTotalScore(totalAnswered >= 3 ? (totalScore / totalAnswered).toFixed(2) : 0);
  }, [questionScores, updateTotalScore]);

  // Toggle the collapse state for each theme.
  const toggleCollapse = (themeId) => {
    setCollapsedThemes((prev) => ({
      ...prev,
      [themeId]: !prev[themeId],
    }));
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
              {getThemeScore(theme.id) !== null && (
                <span>Score: {getThemeScore(theme.id)}</span>
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
                    updateQuestionScore={updateQuestionScore}
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
