// src/plan-templates.js

/**
 * Defines individual form templates.
 * The keys here should be unique across all forms.
 */
export const FORM_TEMPLATES = {
  POLITISK_SKJEMA: { key: "politisk-skjema", title: "Politisk skjema" },
  FORSTEGANGSBEHANDLING: { key: "forstegangsbehandling", title: "Førstegangsbehandling" },
  PLANINITIATIV: { key: "planinitiativ", title: "Planinitiativ" },
  SLUTTBEHANDLING: { key: "sluttbehandling", title: "Sluttbehandling" },
  MEDVIRKNINGSSKJEMA: { key: "medvirkningsskjema", title: "Medvirkningsskjema" },
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