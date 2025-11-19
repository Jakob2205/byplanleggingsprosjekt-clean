import GenericForm from '../components/forms/GenericForm.jsx';

const HjemmerenoveringPlan = {
  key: 'Hjemmerenovering', // Unique key for the plan
  title: 'Hjemmerenovering', // Display name in the sidebar
  forms: {
    'budsjett': {
      title: 'Budsjett',
      component: GenericForm,
      // Define the form's structure and logic right here!
      formConfig: [
        {
          id: 'totalBudget',
          label: 'Totalbudsjett (NOK):',
          type: 'number',
          defaultValue: 100000,
          scoreLogic: (value) => (value > 500000 ? 10 : 5),
        },
        {
          id: 'hasFinancing',
          label: 'Er finansiering på plass?',
          type: 'checkbox',
          defaultValue: false,
          scoreLogic: (value) => (value ? 10 : 0),
        },
      ],
    },
    'tidslinje': {
      title: 'Tidslinje',
      component: GenericForm,
      formConfig: [
        {
          id: 'durationWeeks',
          label: 'Estimert varighet (uker):',
          type: 'number',
          defaultValue: 8,
          scoreLogic: (value) => (value < 12 ? 10 : 4),
        },
      ],
    },
  },
  calculateTotalScore: (scores, includeInTotals) => {
    let total = 0;
    for (const formId in scores) {
      if (includeInTotals[formId]) {
        total += scores[formId];
      }
    }
    return total;
  },
};

export default HjemmerenoveringPlan;
