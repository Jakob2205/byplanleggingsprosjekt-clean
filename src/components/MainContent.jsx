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

  // Select the correct data file based on selectedForm.
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

  // Helper: Calculate the theme score
  const getThemeScore = (themeId) => {
    const themeQuestions = questions.filter((q) => q.theme === themeId);
    let totalScore = 0;
    let activeQuestions = 0;

    themeQuestions.forEach((q) => {
      const ans = getAnswer(q.id);
      if (ans && ans.answered) {
        totalScore += ans.score;
        activeQuestions++;
      }
    });

    if (activeQuestions === 0) {
      return null; // No active questions in theme, return null
    }

    const themeScore = totalScore / activeQuestions; // Normalize by active questions

    return parseFloat(Math.max(-5, Math.min(themeScore, 5)).toFixed(2)); // Clamp and format
  };

  // Build an object mapping theme IDs to computed theme scores.
  const themeAverageScores = useMemo(() => {
    const scores = {};
    themes.forEach((theme) => {
      scores[theme.id] = getThemeScore(theme.id);
    });
    console.log("themeAverageScores built:", scores);
    return scores;
  }, [answers, themes]);

  // State to track whether each theme's score is included in the total score.
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
    
    let overallTotal = 0;
    if (activeScores.length > 0) {
      overallTotal = activeScores.reduce((acc, score) => acc + parseFloat(score), 0) / activeScores.length;
    }

    // Clamp the total score between -5 and 5, and format to 2 decimal places
    overallTotal = parseFloat(Math.max(-5, Math.min(overallTotal, 5)).toFixed(2));

    console.log("overallTotal (Totalverdi) being passed to updateTotalScore:", overallTotal);
    updateTotalScore(overallTotal);
  }, [themeAverageScores, includeInTotal, themes, updateTotalScore]);

  // Collapse state for each theme.
  const [collapsedThemes, setCollapsedThemes] = useState({});
  const toggleCollapse = (themeId) => {
    setCollapsedThemes((prev) => ({
      ...prev,
      [themeId]: !prev[themeId],
    }));
  };

  // Toggle inclusion of a theme in the overall total.
  const toggleInclude = (themeId) => {
    setIncludeInTotal((prev) => ({
      ...prev,
      [themeId]: !prev[themeId],
    }));
  };

  return (
    <main>
      {themes.map((theme) => {
        const themeScore = getThemeScore(theme.id);
        const isIncluded = includeInTotal[theme.id];

        return (
          <div key={theme.id} className="tema">
            <div className="tema-header">
              <button className="collapse-button" onClick={() => toggleCollapse(theme.id)}>
                {collapsedThemes[theme.id] ? "+" : "-"}
              </button>
              <h2>{theme.title}</h2>
              <div className="temascore-display">
                {themeScore !== null && <span>Verdi: {themeScore.toFixed(2)}</span>}
              </div>
              {/* Toggle Switch for including/excluding theme from total */}
              <label className="toggle-switch" htmlFor={`toggle-${theme.id}`} style={{ marginLeft: "10px" }}>
                <input
                  id={`toggle-${theme.id}`}
                  type="checkbox"
                  checked={isIncluded}
                  onChange={() => toggleInclude(theme.id)}
                />
                <span className="slider" />
              </label>
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
