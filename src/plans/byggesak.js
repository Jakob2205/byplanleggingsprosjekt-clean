// src/plans/byggesak.js
import GenericForm from '../components/GenericForm';

// Example question set for a detailed scoring form
const byggesakForstegangQuestions = [
    { id: 'bs_q1', text: 'Er søknaden komplett i henhold til lovverket?', theme: 'formaliteter' },
    { id: 'bs_q2', text: 'Er nabovarsling utført korrekt?', theme: 'formaliteter' },
    { 
      id: 'bs_q3', 
      text: 'Er tiltaket i tråd med gjeldende reguleringsplan?', 
      theme: 'planavklaring',
      // This specific question has a higher weight for "Høy"
      priorityMultipliers: { "Lav": 0.5, "Medium": 1, "Høy": 3, "Ikke aktuell": 0 },
    },
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
      questions: [
        { id: 'søkerNavn', text: 'Vurder kvaliteten på søkers navn', theme: 'grunndata' },
        { id: 'gnrBnr', text: 'Vurder kvaliteten på Gårds- og bruksnummer', theme: 'grunndata' },
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
      // These are the default multipliers for any question in this form that doesn't have its own.
      priorityMultipliers: { "Lav": 0.5, "Medium": 1, "Høy": 2, "Ikke aktuell": 0 },
    },

    // --- FORM 3: casestudie (Placeholder GenericForm) ---
    casestudie: {
      title: 'Casestudie (Byggesak)',
      questions: [{ id: 'caseDesc', text: 'Vurder kvaliteten på casestudien', theme: 'generelt' }],
      themes: [{ id: 'generelt', title: 'Generelt' }],
      priorityMultipliers: { "Lav": 0.5, "Medium": 1, "Høy": 2, "Ikke aktuell": 0 },
    },

    // --- FORM 4: politisk-skjema (Placeholder GenericForm) ---
    'politisk-skjema': {
      title: 'Politisk Skjema (Byggesak)',
      questions: [{ id: 'polSummary', text: 'Vurder kvaliteten på oppsummering for politisk behandling', theme: 'generelt' }],
      themes: [{ id: 'generelt', title: 'Generelt' }],
      priorityMultipliers: { "Lav": 0.5, "Medium": 1, "Høy": 2, "Ikke aktuell": 0 },
    },

    // --- FORM 5: medvirkningskjema (Placeholder GenericForm) ---
    medvirkningskjema: {
      title: 'Medvirkningskjema (Byggesak)',
      questions: [{ id: 'partSummary', text: 'Vurder kvaliteten på oppsummering av medvirkning', theme: 'generelt' }],
      themes: [{ id: 'generelt', title: 'Generelt' }],
      priorityMultipliers: { "Lav": 0.5, "Medium": 1, "Høy": 2, "Ikke aktuell": 0 },
    },

    // --- FORM 6: sluttbehandling (Placeholder GenericForm) ---
    sluttbehandling: {
      title: 'Sluttbehandling (Byggesak)',
      questions: [
        { id: 'finalCheck', text: 'I hvilken grad er ferdigattest utstedt?', theme: 'avslutning' },
        { id: 'finalDocs', text: 'I hvilken grad er all dokumentasjon arkivert?', theme: 'avslutning' },
      ],
      themes: [{ id: 'avslutning', title: 'Avslutning' }],
      priorityMultipliers: { "Lav": 0.5, "Medium": 1, "Høy": 2, "Ikke aktuell": 0 },
    },
  }
};

export default byggesakPlan;