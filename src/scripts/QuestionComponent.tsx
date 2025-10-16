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
      // Toggle off the currently active priority (remove multiplier).
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

  // We no longer use an additional useEffect here to re-update the score.
  // All updates occur within the event handlers.

  return (
    <div className="question-group">
      <p>{question.text}</p>
      <div className="question-controls">
        <div className="rating-container">
          <div className="rating-group priority-group">
            <span>Prioritet:</span>
            <ul>
              {["Lav", "Normal", "Høy", "Ikke aktuelt"].map((priority) => (
                <li
                  key={priority}
                  className={selectedPriority === priority ? "active" : ""}
                  onClick={() => handlePriorityClick(priority)}
                >
                  {priority}
                </li>
              ))}
            </ul>
          </div>
          <div className="rating-group value-group">
            <span>Verdi:</span>
            <ul>
              {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((value) => (
                <li
                  key={value}
                  className={rawValue === value ? "active" : ""}
                  onClick={() => handleValueClick(value)}
                >
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <textarea
          placeholder="Begrunnelse:"
          style={{
            width: '200px',
            height: '80px',
            marginTop: '10px'
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default QuestionComponent;
