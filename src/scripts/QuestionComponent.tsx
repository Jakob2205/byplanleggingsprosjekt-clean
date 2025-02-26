import React, { useState, useEffect } from "react";

const QuestionComponent = ({ question, updateQuestionScore, questionMultipliers, storedAnswer }) => {
  // Use the parent's stored answer for value.
  const currentValue = storedAnswer?.score ?? null;
  
  // We'll maintain local state for priority and exclusion.
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [isExcluded, setIsExcluded] = useState(storedAnswer ? !storedAnswer.answered : false);

  // Handle value selection with toggle logic.
  const handleValueClick = (value) => {
    if (isExcluded) return;
    if (currentValue === value) {
      // Toggle off if the same value is clicked.
      updateQuestionScore(question.id, null, false);
    } else {
      updateQuestionScore(question.id, value, true);
    }
  };

  // Handle priority selection.
  const handlePriorityClick = (priority) => {
    if (selectedPriority === priority) {
      // Toggle off if this priority is already active.
      setSelectedPriority(null);
      setIsExcluded(false);
      // Recalculate score with no multiplier.
      updateQuestionScore(question.id, currentValue, currentValue !== null);
    } else if (priority === "Ikke aktuelt") {
      setIsExcluded(true);
      setSelectedPriority(priority);
      updateQuestionScore(question.id, 0, false);
    } else {
      setIsExcluded(false);
      setSelectedPriority(priority);
      const multiplier = questionMultipliers[question.id]?.[priority] || 1;
      updateQuestionScore(question.id, currentValue !== null ? currentValue * multiplier : 0, currentValue !== null);
    }
  };

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
              className={`value-button ${currentValue === value ? "active" : ""}`}
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
