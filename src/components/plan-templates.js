// src/plan-templates.js

/**
 * Defines individual form templates.
 * The keys here should be unique across all forms.
 */
export const FORM_TEMPLATES = {
  FORSTEGANGSBEHANDLING: {
    key: "forstegangsbehandling",
    title: "Førstegangsbehandling",
    temaer: [
      {
        id: "tema-1-forstegang",
        title: "Generell Informasjon",
        questions: [
          { id: "q-1-1", text: "Hva er planens hovedmål?", type: "text" },
          {
            id: "q-1-2",
            text: "Er det foretatt en foreløpig vurdering av virkninger?",
            type: "boolean",
          },
        ],
      },
    ],
  },
  PLANINITIATIV: {
    key: "planinitiativ",
    title: "Planinitiativ",
    temaer: [
      {
        id: "tema-1-planinitiativ",
        title: "Initiativdetaljer",
        questions: [
          { id: "q-2-1", text: "Hvem er forslagsstiller?", type: "text" },
          {
            id: "q-2-2",
            text: "Beskriv kort bakgrunnen for initiativet.",
            type: "textarea",
          },
        ],
      },
    ],
  },
  SLUTTBEHANDLING: {
    key: "sluttbehandling",
    title: "Sluttbehandling",
    temaer: [
      {
        id: "tema-1-slutt",
        title: "Vedtak og Konklusjon",
        questions: [
          {
            id: "q-3-1",
            text: "Oppsummer eventuelle endringer siden førstegangsbehandling.",
            type: "textarea",
          },
          { id: "q-3-2", text: "Er planen vedtatt?", type: "boolean" },
        ],
      },
    ],
  },
  // Add other individual form templates here
};

/**
 * Defines plan templates, which are collections of form templates.
 */
export const PLAN_TEMPLATES = {
  DEFAULT_PLAN: {
    key: "default-plan",
    title: "Standard Planprosess",
    forms: [
      FORM_TEMPLATES.FORSTEGANGSBEHANDLING,
      FORM_TEMPLATES.PLANINITIATIV,
      FORM_TEMPLATES.SLUTTBEHANDLING,
    ],
  },
  // Add other plan templates here
};