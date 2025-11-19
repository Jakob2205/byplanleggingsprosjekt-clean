// src/plans/byggesak.js
import GenericForm from '../components/GenericForm';

// Example question set for a detailed scoring form
const byggesakForstegangQuestions = [
    { id: 'bs_q1', text: 'Er søknaden komplett i henhold til lovverket?', theme: 'formaliteter' },
    { id: 'bs_q2', text: 'Er nabovarsling utført korrekt?', theme: 'formaliteter' },
    { id: 'bs_q3', text: 'Er tiltaket i tråd med gjeldende reguleringsplan?', theme: 'planavklaring' },
    { id: 'bs_q4', text: 'Er det søkt om nødvendige dispensasjoner?', theme: 'planavklaring' },
    { id: 'bs_q5', text: 'Er ansvarsretter og gjennomføringsplan på plass?', theme: 'formaliteter' },
];

const byggesakPlan = {
  key: 'byggesak',
  title: 'Byggesak',
  forms: {
    // --- FORM 1: planinitiativ (Using GenericForm) ---
    planinitiativ: {
      title: 'Planinitiativ for Byggesak',
      component: GenericForm,
      formConfig: [
        { id: 'søkerNavn', type: 'text', label: 'Navn på søker', name: 'søkerNavn', defaultValue: '' },
        { id: 'gnrBnr', type: 'text', label: 'Gårds- og bruksnummer', name: 'gnrBnr', defaultValue: '' },
      ],
      questions: [ // Required for scoring
        { id: 'søkerNavn', text: 'Navn på søker', theme: 'grunndata', scoreLogic: (val) => (val ? 1 : 0) },
        { id: 'gnrBnr', text: 'Gårds- og bruksnummer', theme: 'grunndata', scoreLogic: (val) => (val ? 1 : 0) },
      ],
      themes: [{ id: 'grunndata', title: 'Grunndata' }],
      priorityMultipliers: { "Lav": 0.5, "Medium": 1, "Høy": 2, "Ikke aktuell": 0 },
    },

    // --- FORM 2: forstegangsbehandling (Using ScoringQuestion) ---
    forstegangsbehandling: {
      title: 'Førstegangsbehandling av Byggesak',
      questions: byggesakForstegangQuestions,
      themes: [
        { id: 'formaliteter', title: 'Formaliteter' },
        { id: 'planavklaring', title: 'Planavklaring' },
      ],
      priorityMultipliers: { "Lav": 0.5, "Medium": 1, "Høy": 2, "Ikke aktuell": 0 },
    },

    // --- FORM 3: casestudie (Placeholder GenericForm) ---
    casestudie: {
      title: 'Casestudie (Byggesak)',
      component: GenericForm,
      formConfig: [{ id: 'caseDesc', type: 'textarea', label: 'Beskrivelse av casestudie', name: 'caseDesc', defaultValue: '' }],
      questions: [{ id: 'caseDesc', text: 'Beskrivelse', theme: 'generelt', scoreLogic: (val) => (val ? 1 : 0) }],
      themes: [{ id: 'generelt', title: 'Generelt' }],
      priorityMultipliers: { "Lav": 0.5, "Medium": 1, "Høy": 2, "Ikke aktuell": 0 },
    },

    // --- FORM 4: politisk-skjema (Placeholder GenericForm) ---
    'politisk-skjema': {
      title: 'Politisk Skjema (Byggesak)',
      component: GenericForm,
      formConfig: [{ id: 'polSummary', type: 'textarea', label: 'Oppsummering for politisk behandling', name: 'polSummary', defaultValue: '' }],
      questions: [{ id: 'polSummary', text: 'Oppsummering', theme: 'generelt', scoreLogic: (val) => (val ? 1 : 0) }],
      themes: [{ id: 'generelt', title: 'Generelt' }],
      priorityMultipliers: { "Lav": 0.5, "Medium": 1, "Høy": 2, "Ikke aktuell": 0 },
    },

    // --- FORM 5: medvirkningskjema (Placeholder GenericForm) ---
    medvirkningskjema: {
      title: 'Medvirkningskjema (Byggesak)',
      component: GenericForm,
      formConfig: [{ id: 'partSummary', type: 'textarea', label: 'Oppsummering av medvirkning', name: 'partSummary', defaultValue: '' }],
      questions: [{ id: 'partSummary', text: 'Oppsummering', theme: 'generelt', scoreLogic: (val) => (val ? 1 : 0) }],
      themes: [{ id: 'generelt', title: 'Generelt' }],
      priorityMultipliers: { "Lav": 0.5, "Medium": 1, "Høy": 2, "Ikke aktuell": 0 },
    },

    // --- FORM 6: sluttbehandling (Placeholder GenericForm) ---
    sluttbehandling: {
      title: 'Sluttbehandling (Byggesak)',
      component: GenericForm,
      formConfig: [
        { id: 'finalCheck', type: 'checkbox', label: 'Er ferdigattest utstedt?', name: 'finalCheck', defaultValue: false },
        { id: 'finalDocs', type: 'checkbox', label: 'Er all dokumentasjon arkivert?', name: 'finalDocs', defaultValue: false },
      ],
      questions: [
        { id: 'finalCheck', text: 'Ferdigattest', theme: 'avslutning', scoreLogic: (val) => (val ? 1 : 0) },
        { id: 'finalDocs', text: 'Dokumentasjon arkivert', theme: 'avslutning', scoreLogic: (val) => (val ? 1 : 0) },
      ],
      themes: [{ id: 'avslutning', title: 'Avslutning' }],
      priorityMultipliers: { "Lav": 0.5, "Medium": 1, "Høy": 2, "Ikke aktuell": 0 },
    },
  }
};

export default byggesakPlan;