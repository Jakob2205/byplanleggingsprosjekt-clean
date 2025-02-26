import React, { useState, useEffect } from "react";
import { questionMultipliers } from "../scripts/questionData.js";

const QuestionComponent = ({ question, updateQuestionScore }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [isExcluded, setIsExcluded] = useState(false);

  // Handle value selection with toggle logic.
  const handleValueClick = (value) => {
    if (isExcluded) return;
    setSelectedValue((prev) => (prev === value ? null : value));
  };

  // Handle priority selection.
  // If "Ikke aktuelt" is chosen, mark the question as excluded.
  const handlePriorityClick = (priority) => {
    if (priority === "Ikke aktuelt") {
      setIsExcluded(true);
      setSelectedPriority(priority);
      setSelectedValue(null);
    } else {
      setIsExcluded(false);
      setSelectedPriority((prev) => (prev === priority ? null : priority));
    }
  };

  // Whenever the selection changes, update the question score.
  // If excluded, score is 0 and the question is marked as unanswered.
  useEffect(() => {
    if (isExcluded) {
      updateQuestionScore(question.id, 0, false);
    } else {
      const multiplier =
        selectedPriority
          ? questionMultipliers[question.id]?.[selectedPriority] || 1
          : 1;
      const score = selectedValue !== null ? selectedValue * multiplier : 0;
      updateQuestionScore(question.id, score, selectedValue !== null);
    }
  }, [selectedValue, selectedPriority, isExcluded, question.id, updateQuestionScore]);

  return (
    <div className="question-group">
      <p>{question.text}</p>
      <div className="rating">
        <div className="rating-group">
          <span>Prioritet:</span>
          {["Lav", "Normal", "Høy", "Ikke aktuelt"].map((priority) => (
            <button
              key={priority}
              className={`priority-button ${selectedPriority === priority ? "active" : ""}`}
              onClick={() => handlePriorityClick(priority)}
            >
              {priority}
            </button>
          ))}
        </div>

        <div className="rating-group">
          <span>Verdi:</span>
          {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              className={`value-button ${selectedValue === value ? "active" : ""}`}
              onClick={() => handleValueClick(value)}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
      <textarea placeholder="Begrunnelse:"></textarea>
    </div>
  );
};

export default QuestionComponent;
