// src/plans/myNewPlan.js
// ENSURE ALL YOUR PLAN FILES FOLLOW THIS STRUCTURE, WITH 'forms' AS AN ARRAY.
export const myNewPlan = {
  // A unique key for the plan. Use something like 'my-cool-plan'.
  key: 'myNewPlan',

  // The title that will be shown in the dropdown menu.
  title: 'My New Awesome Plan',

  // A list of forms (or categories) for this plan.
  forms: [
    {
      key: 'idefase',
      title: 'Idéfase',
      questions: [
        { id: 'q_new1', text: 'Er ideen nyskapende og strategisk viktig?', theme: 'theme_innovation' },
        { id: 'q_new2', text: 'Hva er markedspotensialet?', theme: 'theme_market' },
      ],
    },
    {
      key: 'utviklingsfase',
      title: 'Utviklingsfase',
      questions: [
        { id: 'q_dev1', text: 'Har vi en fungerende prototyp?', theme: 'theme_dev' },
      ],
    },
  ],
};

export default myNewPlan;
