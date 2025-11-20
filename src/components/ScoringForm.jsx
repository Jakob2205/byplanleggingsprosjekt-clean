// src/components/forms/ScoringForm.jsx
import React, { useState, useMemo, useEffect } from 'react';

const ScoringForm = ({ title, data, initialState = {}, onStateChange }) => {
  const { themes, questions, priorityMultipliers: formMultipliers } = data;
  const [answers, setAnswers] = useState(initialState.answers || {});
  const [priorities, setPriorities] = useState(initialState.priorities || {});

  // Effect to update parent state when local state changes
  useEffect(() => {
    if (onStateChange) {
      onStateChange({ answers, priorities });
    }
  }, [answers, priorities, onStateChange]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handlePriorityChange = (questionId, value) => {
    setPriorities((prev) => ({ ...prev, [questionId]: value }));
  };

  const totalScore = useMemo(() => {
    let score = 0;
    for (const questionId in answers) {
      const question = questions.find(q => q.id === questionId);
      if (!question) continue;

      const answerValue = answers[questionId];
      const priority = priorities[questionId] || "Medium";

      // Use question-specific multipliers if they exist, otherwise fall back to form-level multipliers.
      const multipliers = question.priorityMultipliers || formMultipliers;

      // Get the multiplier for the selected priority, defaulting to 1 if not found.
      const multiplier = multipliers?.[priority] ?? 1;

      if (answerValue !== undefined && answerValue !== null) {
        score += answerValue * multiplier;
      }
    }
    return score.toFixed(2);
  }, [answers, priorities, questions, formMultipliers]);

  const answerOptions = [
    { label: "Svært negativt", value: -2 },
    { label: "Negativt", value: -1 },
    { label: "Nøytralt", value: 0 },
    { label: "Positivt", value: 1 },
    { label: "Svært positivt", value: 2 },
  ];

  const priorityOptions = ["Lav", "Medium", "Høy", "Ikke aktuell"];

  return (
    <div>
      <h2>{title}</h2>
      <h3>Total Score: {totalScore}</h3>
      {themes.map((theme) => (
        <div key={theme.id}>
          <h3>{theme.title}</h3>
          {questions
            .filter((q) => q.theme === theme.id)
            .map((question) => (
              <div key={question.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                <p>{question.text}</p>
                <div>
                  {answerOptions.map((opt) => (
                    <label key={opt.value} style={{ marginRight: '10px' }}>
                      <input
                        type="radio"
                        name={`answer-${question.id}`}
                        value={opt.value}
                        checked={answers[question.id] === opt.value}
                        onChange={() => handleAnswerChange(question.id, opt.value)}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
                <div style={{ marginTop: '5px' }}>
                  <label>
                    Prioritet:
                    <select
                      value={priorities[question.id] || "Medium"}
                      onChange={(e) => handlePriorityChange(question.id, e.target.value)}
                    >
                      {priorityOptions.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default ScoringForm;
