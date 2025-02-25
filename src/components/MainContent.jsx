import React, { useState, useEffect, useCallback, useMemo } from "react";
import QuestionComponent from "../scripts/QuestionComponent.js";
import { questions, themes } from "../scripts/questionData.js";

// MainContent now accepts updateTotalScore as a prop
const MainContent = ({ updateTotalScore }) => {
  // Store individual question scores and answered flags for each question.
  const [questionScores, setQuestionScores] = useState({});
  // Track whether each theme is collapsed.
  const [collapsedThemes, setCollapsedThemes] = useState({});

  // Update the score and answered flag for a given question.
  const updateQuestionScore = useCallback((questionId, score, answered) => {
    setQuestionScores((prev) => ({
      ...prev,
      [questionId]: { score, answered },
    }));
  }, []);

  // Compute the average score for a theme based on a dynamic threshold:
  // - If the theme has fewer than 3 questions, require all to be answered.
  // - Otherwise, require at least 3 answered.
  const getThemeScore = (themeId) => {
    const themeQuestions = questions.filter((q) => q.theme === themeId);
    let totalScore = 0;
    let answeredCount = 0;

    themeQuestions.forEach((q) => {
      const qs = questionScores[q.id];
      if (qs && qs.answered) {
        totalScore += qs.score;
        answeredCount += 1;
      }
    });

    // Determine threshold: if theme has fewer than 3 total questions, threshold = themeQuestions.length; else 3.
    const threshold = themeQuestions.length < 3 ? themeQuestions.length : 3;
    return answeredCount >= threshold ? (totalScore / answeredCount).toFixed(2) : null;
  };

  // Build an object mapping theme IDs to their computed average score.
  const themeAverageScores = useMemo(() => {
    const scores = {};
    themes.forEach((theme) => {
      scores[theme.id] = getThemeScore(theme.id);
    });
    return scores;
  }, [questionScores]);

  // Calculate the overall total score (Totalverdi) from active theme scores.
  useEffect(() => {
    const activeScores = Object.values(themeAverageScores).filter(
      (score) => score !== null
    );
    const overallTotal =
      activeScores.length > 0
        ? (
            activeScores.reduce((acc, score) => acc + parseFloat(score), 0) /
            activeScores.length
          ).toFixed(2)
        : 0;
    updateTotalScore(overallTotal);
  }, [themeAverageScores, updateTotalScore]);

  // Toggle the collapse state for a theme.
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
            <button
              className="collapse-button"
              onClick={() => toggleCollapse(theme.id)}
            >
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
