import { useState, useEffect, useCallback, useMemo } from "react";
import QuestionComponent from "../scripts/QuestionComponent.js";
// Import data as namespaces since there is no default export
import * as defaultData from "../scripts/questionData.js";
import * as boligBebyggelsePlanInData from "../scripts/boligBebyggelsePlanIn.js";
import * as råstoffUtvinningData from "../scripts/råstoffUtvinning.js";
import * as råStoffPlanInData from "../scripts/råStoffPlanIn.js";

console.log("MainContent.jsx file is loaded in the bundle");

const MainContent = ({ updateTotalScore, selectedForm }) => {
  console.log("MainContent rendering with selectedForm:", selectedForm);

  // Select the proper data file based on selectedForm.
  let formData;
  switch (selectedForm) {
    case "planIn1":
      formData = boligBebyggelsePlanInData;
      break;
    case "form2":
      formData = råstoffUtvinningData;
      break;
    case "planIn2":
      formData = råStoffPlanInData;
      break;
    case "default":
    default:
      formData = defaultData;
      break;
  }
  
  const { questions, themes, questionMultipliers } = formData;

  // Store all answers in one state using composite keys: `${selectedForm}_${questionId}`
  const [answers, setAnswers] = useState({});

  // Update the score and answered flag for a given question.
  const updateQuestionScore = useCallback(
    (questionId, score, answered) => {
      const key = `${selectedForm}_${questionId}`;
      console.log("updateQuestionScore called:", { key, score, answered, selectedForm });
      setAnswers((prev) => ({
        ...prev,
        [key]: { score, answered },
      }));
    },
    [selectedForm]
  );

  // Helper: retrieve the stored answer for a given question.
  const getAnswer = (questionId) => answers[`${selectedForm}_${questionId}`];

  // Calculate the average score for a theme using answers for the current form.
  const getThemeScore = (themeId) => {
    const themeQuestions = questions.filter((q) => q.theme === themeId);
    let totalScore = 0;
    let answeredCount = 0;
    themeQuestions.forEach((q) => {
      const ans = getAnswer(q.id);
      if (ans && ans.answered) {
        totalScore += ans.score;
        answeredCount++;
      }
    });
    if (answeredCount === 0) {
      console.log("getThemeScore:", { themeId, totalScore, answeredCount, computedScore: null });
      return null;
    }
    const threshold = themeQuestions.length < 3 ? themeQuestions.length : 3;
    const computedScore =
      answeredCount >= threshold ? (totalScore / answeredCount).toFixed(2) : null;
    console.log("getThemeScore:", { themeId, totalScore, answeredCount, threshold, computedScore });
    return computedScore;
  };

  // Build an object mapping theme IDs to computed average score.
  const themeAverageScores = useMemo(() => {
    const scores = {};
    themes.forEach((theme) => {
      scores[theme.id] = getThemeScore(theme.id);
    });
    console.log("themeAverageScores built:", scores);
    return scores;
  }, [answers, themes]);

  // State to track whether a theme's score should be included in the overall total.
  const [includeInTotal, setIncludeInTotal] = useState(() => {
    const defaults = {};
    themes.forEach((theme) => {
      defaults[theme.id] = true;
    });
    return defaults;
  });

  // Calculate the overall Totalverdi based on active theme scores.
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

  // Collapse state for each theme.
  const [collapsedThemes, setCollapsedThemes] = useState({});
  const toggleCollapse = (themeId) => {
    console.log("toggleCollapse clicked:", themeId);
    setCollapsedThemes((prev) => ({
      ...prev,
      [themeId]: !prev[themeId],
    }));
  };

  // Toggle inclusion of a theme in the overall total.
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
              <button className="collapse-button" onClick={() => toggleCollapse(theme.id)}>
                {collapsedThemes[theme.id] ? "+" : "-"}
              </button>
              <h2>{theme.title}</h2>
              <div className="temascore-display">
                {themeScore !== null && <span>Score: {themeScore}</span>}
              </div>
              <button
                className="include-toggle"
                onClick={() => toggleInclude(theme.id)}
                style={{ marginLeft: "10px" }}
              >
                {includeInTotal[theme.id] ? "Exclude from Total" : "Include in Total"}
              </button>
            </div>
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
                    storedAnswer={getAnswer(question.id)}
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
