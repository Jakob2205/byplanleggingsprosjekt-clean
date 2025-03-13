import React, { useState, useEffect } from "react";

interface StoredAnswer {
  score: number | null;
  answered: boolean;
  rawValue?: number | null;
}

interface QuestionComponentProps {
  question: { id: string; text: string; theme: string };
  updateQuestionScore: (
    questionId: string,
    score: number | null,
    answered: boolean
  ) => void;
  questionMultipliers: Record<string, Record<string, number>>;
  storedAnswer?: StoredAnswer;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  question,
  updateQuestionScore,
  questionMultipliers,
  storedAnswer,
}) => {
  // Initialize rawValue from storedAnswer only once on mount.
  const initialRawValue = storedAnswer?.rawValue ?? storedAnswer?.score ?? null;
  const [rawValue, setRawValue] = useState<number | null>(initialRawValue);

  // Local state for the selected priority.
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);

  // Local state for exclusion.
  const [isExcluded, setIsExcluded] = useState<boolean>(
    storedAnswer ? !storedAnswer.answered : false
  );

  // NOTE: We removed the effect that reinitializes local state when storedAnswer changes
  // so that the component's state persists and doesn't reset on re-renders.

  // Handler for value buttons.
  const handleValueClick = (value: number) => {
    if (isExcluded) return;
    if (rawValue === value) {
      // Toggle off if the same value is clicked.
      setRawValue(null);
      updateQuestionScore(question.id, null, false);
    } else {
      setRawValue(value);
      const multiplier = selectedPriority
        ? questionMultipliers[question.id]?.[selectedPriority] || 1
        : 1;
      updateQuestionScore(question.id, value * multiplier, true);
    }
  };

  // Handler for priority buttons.
  const handlePriorityClick = (priority: string) => {
    if (selectedPriority === priority) {
      // Toggling off: remove priority (and multiplier) so score reverts to rawValue.
      setSelectedPriority(null);
      setIsExcluded(false);
      updateQuestionScore(question.id, rawValue, rawValue !== null);
    } else if (priority === "Ikke aktuelt") {
      setIsExcluded(true);
      setSelectedPriority(priority);
      setRawValue(null);
      updateQuestionScore(question.id, 0, false);
    } else {
      setIsExcluded(false);
      setSelectedPriority(priority);
      const multiplier = questionMultipliers[question.id]?.[priority] || 1;
      updateQuestionScore(
        question.id,
        rawValue !== null ? rawValue * multiplier : 0,
        rawValue !== null
      );
    }
  };

  // useEffect to update parent's score when local state changes.
  useEffect(() => {
    if (isExcluded) {
      updateQuestionScore(question.id, 0, false);
    } else if (rawValue !== null) {
      const multiplier = selectedPriority
        ? questionMultipliers[question.id]?.[selectedPriority] || 1
        : 1;
      updateQuestionScore(question.id, rawValue * multiplier, true);
    } else {
      updateQuestionScore(question.id, null, false);
    }
  }, [
    rawValue,
    selectedPriority,
    isExcluded,
    question.id,
    updateQuestionScore,
    questionMultipliers,
  ]);

  return (
    <div className="question-group">
      <p>{question.text}</p>
      <div className="rating">
        <div className="rating-group">
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
        </div>
        <div className="rating-group">
          <span>Verdi:</span>
          {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              className={`value-button ${rawValue === value ? "active" : ""}`}
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
