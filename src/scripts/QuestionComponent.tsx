import React from "react";

const QuestionComponent = ({ question, updateQuestionScore, questionMultipliers, storedAnswer }) => {
  // Use the parent's stored answer as the current value.
  const currentValue = storedAnswer?.score ?? null;
  const currentAnswered = storedAnswer?.answered ?? false;
  
  // For priority, we maintain local state since we don't store it externally.
  const [selectedPriority, setSelectedPriority] = React.useState(null);
  const [isExcluded, setIsExcluded] = React.useState(false);

  // When a value button is clicked, update the parent's state immediately.
  const handleValueClick = (value) => {
    if (isExcluded) return;
    // Call the parent's update function immediately
    updateQuestionScore(question.id, value, true);
  };

  // When a priority button is clicked, update local state and then update parent's state.
  const handlePriorityClick = (priority) => {
    if (priority === "Ikke aktuelt") {
      setIsExcluded(true);
      setSelectedPriority(priority);
      // Mark the question as excluded (score = 0, not answered)
      updateQuestionScore(question.id, 0, false);
    } else {
      setIsExcluded(false);
      setSelectedPriority(priority);
      // Re-calculate the score using the current value and the new multiplier.
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
              // Apply the "active" class if the selectedPriority matches
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
              // Apply "active" if the stored currentValue matches this value.
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
