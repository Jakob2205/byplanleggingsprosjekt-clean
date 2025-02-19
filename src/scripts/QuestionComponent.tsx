import React, { useState, useEffect } from "react";
import { questionMultipliers } from "../scripts/questionData.js";

const QuestionComponent = ({ question, updateThemeScores }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [isExcluded, setIsExcluded] = useState(false);

  // **🔹 Handle value selection (toggle on/off)**
  const handleValueClick = (value) => {
    if (isExcluded) return; // Prevent selection if "Ikke aktuelt" is active
    setSelectedValue((prevValue) => (prevValue === value ? null : value));
  };

  // **🔹 Handle priority selection (toggle on/off)**
  const handlePriorityClick = (priority) => {
    if (priority === "Ikke aktuelt") {
      setIsExcluded(true);
      setSelectedPriority(priority);
      setSelectedValue(null); // Reset value
      updateThemeScores(question.id, 0, false, true); // Exclude question
    } else {
      setIsExcluded(false);
      setSelectedPriority((prevPriority) =>
        prevPriority === priority ? null : priority
      );
    }
  };

  // **🔹 Calculate Score & Update Parent Component**
  useEffect(() => {
    if (!isExcluded) {
      const multiplier = selectedPriority
        ? questionMultipliers[question.id]?.[selectedPriority] || 1
        : 1;
      const score = selectedValue !== null ? selectedValue * multiplier : 0;
      updateThemeScores(question.id, score, selectedValue !== null, false);
    }
  }, [selectedValue, selectedPriority, isExcluded]);

  return (
    <div className="question-group">
      <p>{question.text}</p>
      <div className="rating">
        <span>Prioritet:</span>
        {["Lav", "Normal", "Høy", "Ikke aktuelt"].map((priority) => (
          <button
            key={priority}
            className={`priority-button ${
              selectedPriority === priority ? "active" : ""
            }`}
            onClick={() => handlePriorityClick(priority)}
          >
            {priority}
          </button>
        ))}
        <span>Verdi:</span>
        {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            className={`value-button ${
              selectedValue === value ? "active" : ""
            }`}
            onClick={() => handleValueClick(value)}
          >
            {value}
          </button>
        ))}
      </div>
      <textarea placeholder="Begrunnelse:"></textarea>
    </div>
  );
};

export default QuestionComponent;
