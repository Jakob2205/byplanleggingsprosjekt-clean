import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

// Helper to get a default score if scoreLogic is not provided
const getDefaultScore = (type, value) => {
  switch (type) {
    case 'checkbox':
      return value ? 1 : 0; // 1 for checked, 0 for unchecked
    case 'number':
      return typeof value === 'number' && !isNaN(value) ? (value > 0 ? 1 : 0) : 0; // 1 if positive number, 0 otherwise
    case 'text':
    case 'textarea':
    case 'date':
      return value && value.length > 0 ? 1 : 0; // 1 if not empty, 0 if empty
    default:
      return 0;
  }
};

const GenericForm = ({ formId, title, formConfig, updateFormState, setInitialFormData, initialAnswers }) => {
  // Initialize state from config defaultValues or existing answers
  const getInitialState = useCallback(() => {
    const state = {};
    if (formConfig) {
      formConfig.forEach(configItem => { // The error points here, but the cause is the useEffect below
        const answerObject = initialAnswers?.[configItem.id];
        // Check for the rawValue, otherwise fall back to score, then defaultValue
        let value = answerObject?.rawValue;
        if (value === undefined) {
          value = configItem.defaultValue;
        }
        state[configItem.id] = value ?? ''; // Ensure it's never undefined, fallback to empty string
      });
    }
    return state;
  }, [formConfig, initialAnswers]);

  const [answers, setAnswers] = useState(getInitialState);

  // Set initial form data in the global state
  useEffect(() => {
    setInitialFormData(formId, {
      formName: title,
      score: 0, // Reset score
      answers: getInitialState(),
      includeInTotal: true,
    });
  }, [formId, title, setInitialFormData]); // Removed getInitialState to break loop

  // Update global state whenever answers change
  useEffect(() => {
    if (!formConfig) return;

    const newAnswersForGlobalState = {};
    formConfig.forEach(question => {
      const rawValue = answers[question.id];
      const calculatedScore = question.scoreLogic
        ? question.scoreLogic(rawValue)
        : getDefaultScore(question.type, rawValue);

      newAnswersForGlobalState[question.id] = {
        score: calculatedScore,
        priority: 'Medium', // GenericForm questions default to Medium priority
        comment: '', // GenericForm questions don't have comments by default
        rawValue: rawValue, // Store raw value for debugging/future use if needed
      };
    });

    updateFormState(formId, {
      // GenericForm doesn't calculate an overall score, MainContent does.
      // It just provides the question-level answers with scores.
      answers: newAnswersForGlobalState,
    });
  }, [answers, formId, formConfig, updateFormState]);

  const handleInputChange = (id, target) => {
    const finalValue = target.type === 'checkbox' ? target.checked : target.value;
    setAnswers(prev => ({ ...prev, [id]: finalValue }));
  };

  if (!formConfig) {
    return <div>Form configuration is missing.</div>;
  }

  return (
    <div>
      <h2>{title}</h2>
      {formConfig.map(question => (
        <div key={question.name || question.id} style={{ margin: '1em 0' }}>
          <label>
            {question.label}
            <input
              type={question.type}
              checked={question.type === 'checkbox' ? !!answers[question.id] : undefined}
              value={question.type !== 'checkbox' ? (answers[question.id] ?? '') : ''}
              onChange={e => handleInputChange(question.id, e.target)}
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
      ))}
    </div>
  );
};

GenericForm.propTypes = {
  formId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  formConfig: PropTypes.arrayOf(PropTypes.shape({ // formConfig is still used internally
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    defaultValue: PropTypes.any,
    scoreLogic: PropTypes.func,
  })).isRequired,
  updateFormState: PropTypes.func.isRequired,
  setInitialFormData: PropTypes.func.isRequired,
  initialAnswers: PropTypes.object,
};

export default GenericForm;
