import { useState, useEffect, useCallback, useMemo } from "react";
import QuestionComponent from "../scripts/QuestionComponent.js";
// Import both default data and form2 data
import * as defaultData from "../scripts/questionData.js";
import * as råstoffUtvinningData from "../scripts/råstoffUtvinning.js";

console.log("MainContent.jsx file is loaded in the bundle");

const MainContent = ({ updateTotalScore, selectedForm }) => {
  console.log("MainContent component is rendering now...");

  // Choose which form data to use based on selectedForm.
  // "default" represents the default form; "form2" uses råstoffUtvinningData.
  const formData = selectedForm === "form2" ? råstoffUtvinningData : defaultData;
  const { questions, themes, questionMultipliers } = formData;

  // Instead of one state for questionScores, we store answers per form.
  const [answersByForm, setAnswersByForm] = useState({
    default: {},
    form2: {},
  });
  // Derive the current answers based on selectedForm.
  const currentAnswers = answersByForm[selectedForm] || {};

  // Control collapse state for each theme.
  const [collapsedThemes, setCollapsedThemes] = useState({});
  // Track whether each theme should be included in the overall Totalverdi calculation.
  const [includeInTotal, setIncludeInTotal] = useState(() => {
    const defaults = {};
    themes.forEach((theme) => {
      defaults[theme.id] = true;
    });
    return defaults;
  });

  // Update the score and answered flag for a given question in the current form.
  const updateQuestionScore = useCallback((questionId, score, answered) => {
    console.log("updateQuestionScore called:", { questionId, score, answered });
    setAnswersByForm((prev) => ({
      ...prev,
      [selectedForm]: {
        ...prev[selectedForm],
        [questionId]: { score, answered },
      },
    }));
  }, [selectedForm]);

  // Calculate the average score for a theme based on a dynamic threshold:
  // - If a theme has fewer than 3 questions, require all to be answered.
  // - Otherwise, require at least 3 answered.
  const getThemeScore = (themeId) => {
    const themeQuestions = questions.filter((q) => q.theme === themeId);
    let totalScore = 0;
    let answeredCount = 0;

    themeQuestions.forEach((q) => {
      const qs = currentAnswers[q.id];
      if (qs && qs.answered) {
        totalScore += qs.score;
        answeredCount += 1;
      }
    });

    const threshold = themeQuestions.length < 3 ? themeQuestions.length : 3;
    const computedScore =
      answeredCount >= threshold
        ? (totalScore / answeredCount).toFixed(2)
        : null;

    console.log("getThemeScore:", {
      themeId,
      totalScore,
      answeredCount,
      threshold,
      computedScore,
    });
    return computedScore;
  };

  // Build an object mapping theme IDs to their computed average score.
  const themeAverageScores = useMemo(() => {
    const scores = {};
    themes.forEach((theme) => {
      scores[theme.id] = getThemeScore(theme.id);
    });
    console.log("themeAverageScores object built:", scores);
    return scores;
  }, [currentAnswers, themes]);

  // Calculate the overall Totalverdi based only on themes that are toggled "in."
  useEffect(() => {
    const activeScores = themes
      .filter((theme) => includeInTotal[theme.id])
      .map((theme) => themeAverageScores[theme.id])
      .filter((score) => score !== null);

    console.log("Active theme scores for total:", activeScores);

    const overallTotal =
      activeScores.length > 0
        ? (
            activeScores.reduce((acc, score) => acc + parseFloat(score), 0) /
            activeScores.length
          ).toFixed(2)
        : 0;

    console.log("overallTotal (Totalverdi) being passed to updateTotalScore:", overallTotal);
    updateTotalScore(overallTotal);
  }, [themeAverageScores, includeInTotal, themes, updateTotalScore]);

  // Toggle the collapse state for a theme.
  const toggleCollapse = (themeId) => {
    console.log("toggleCollapse clicked:", themeId);
    setCollapsedThemes((prev) => ({
      ...prev,
      [themeId]: !prev[themeId],
    }));
  };

  // Toggle whether a theme's score should be included in the overall Totalverdi.
  const toggleInclude = (themeId) => {
    console.log("toggleInclude clicked:", themeId);
    setIncludeInTotal((prev) => ({
      ...prev,
      [themeId]: !prev[themeId],
    }));
  };

  return (
    <main>
      {themes.map((theme) => {
        const themeScore = getThemeScore(theme.id);
        console.log("Rendering theme row:", theme.id, { themeScore });

        return (
          <div key={theme.id} className="tema">
            <div className="tema-header">
              {/* Collapse toggle for the theme */}
              <button
                className="collapse-button"
                onClick={() => toggleCollapse(theme.id)}
              >
                {collapsedThemes[theme.id] ? "+" : "-"}
              </button>
              <h2>{theme.title}</h2>
              {/* Display the theme's score if available */}
              <div className="temascore-display">
                {themeScore !== null && <span>Score: {themeScore}</span>}
              </div>
              {/* Toggle inclusion in Totalverdi */}
              <button
                className="include-toggle"
                onClick={() => toggleInclude(theme.id)}
                style={{ marginLeft: "10px" }}
              >
                {includeInTotal[theme.id]
                  ? "Exclude from Total"
                  : "Include in Total"}
              </button>
            </div>
            {/* Always render the content section; hide it with inline style if collapsed */}
            <div
              className="content-section"
              style={{ display: collapsedThemes[theme.id] ? "none" : "block" }}
            >
              {questions
                .filter((q) => q.theme === theme.id)
                .map((question) => (
                  <QuestionComponent
                    key={question.id}
                    question={question}
                    updateQuestionScore={updateQuestionScore}
                    questionMultipliers={questionMultipliers}
                  />
                ))}
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default MainContent;
