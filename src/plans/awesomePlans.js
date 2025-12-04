import GenericForm from '../components/GenericForm';

const awesomePlan = {
  key: 'awesomePlan',
  title: 'Awesome Plan',
  forms: {
    planinitiativ: {
      title: 'Planinitiativ (Awesome Plan)',
      questions: [
        { id: 'ap_init1', text: 'I hvilken grad er initiativet nyskapende og fremtidsrettet?', theme: 'ap_theme_innovation' },
        { id: 'ap_init2', text: 'Hvor godt svarer planen på FNs bærekraftsmål?', theme: 'ap_theme_sustainability' },
        { id: 'ap_init3', text: 'Hvor stor er den forventede positive samfunnseffekten?', theme: 'ap_theme_sustainability' },
        { id: 'ap_init4', text: 'Er den teknologiske risikoen ved prosjektet akseptabel?', theme: 'ap_theme_innovation' },
        { id: 'ap_init5', text: 'I hvilken grad fremmer planen sosial inkludering og mangfold?', theme: 'ap_theme_sustainability' },
        { id: 'ap_init6', text: 'Er det potensial for internasjonal anerkjennelse?', theme: 'ap_theme_innovation' },
      ],
      themes: [
        { id: 'ap_theme_innovation', title: 'Innovasjon' },
        { id: 'ap_theme_sustainability', title: 'Bærekraft og Samfunn' },
      ],
      priorityMultipliers: {
        "Lav": 0.5,
        "Medium": 1,
        "Høy": 2,
        "Ikke aktuell": 0
      }
    },
    forstegangsbehandling: {
      title: 'Førstegangsbehandling (Awesome Plan)',
      questions: [
        { id: 'ap_first1', text: 'Er den tekniske gjennomførbarheten tilstrekkelig dokumentert?', theme: 'ap_theme_feasibility' },
        { id: 'ap_first2', text: 'Hvordan er brukeropplevelsen (UX) ivaretatt i designet?', theme: 'ap_theme_usability' },
        { id: 'ap_first3', text: 'Er datagrunnlaget for analysene robust og validert?', theme: 'ap_theme_feasibility' },
        { id: 'ap_first4', text: 'I hvilken grad er universell utforming integrert i løsningen?', theme: 'ap_theme_usability' },
        { id: 'ap_first5', text: 'Er skalerbarheten til løsningen vurdert?', theme: 'ap_theme_feasibility' },
        { id: 'ap_first6', text: 'Er det lagt opp til en intuitiv og effektiv arbeidsflyt for brukerne?', theme: 'ap_theme_usability' },
      ],
      themes: [
        { id: 'ap_theme_feasibility', title: 'Teknisk Gjennomførbarhet' },
        { id: 'ap_theme_usability', title: 'Brukervennlighet' },
      ],
      priorityMultipliers: {
        "Lav": 0.5,
        "Medium": 1,
        "Høy": 2,
        "Ikke aktuell": 0
      }
    },
    casestudie: {
      title: 'Casestudie (Awesome Plan)',
      component: GenericForm,
      formConfig: [
        { id: 'awesomeCaseStudy', type: 'textarea', label: 'Beskriv casestudien for Awesome Plan', name: 'awesomeCaseStudy', defaultValue: '' }
      ],
      questions: [],
      themes: [],
      priorityMultipliers: {
        "Lav": 0.5, "Medium": 1, "Høy": 2, "Ikke aktuell": 0
      },
    },
    'politisk-skjema': {
      title: 'Politisk Skjema (Awesome Plan)',
      component: GenericForm,
      formConfig: [
        { id: 'awesomePoliticalSummary', type: 'textarea', label: 'Politisk forankring og vedtak for Awesome Plan', name: 'awesomePoliticalSummary', defaultValue: '' }
      ],
      questions: [],
      themes: [],
      priorityMultipliers: {
        "Lav": 0.5, "Medium": 1, "Høy": 2, "Ikke aktuell": 0
      },
    },
    medvirkningskjema: {
      title: 'Medvirkningskjema (Awesome Plan)',
      component: GenericForm,
      formConfig: [
        { id: 'awesomeParticipationSummary', type: 'textarea', label: 'Oppsummering av medvirkning og brukerinnsikt for Awesome Plan', name: 'awesomeParticipationSummary', defaultValue: '' }
      ],
      questions: [],
      themes: [],
      priorityMultipliers: {
        "Lav": 0.5, "Medium": 1, "Høy": 2, "Ikke aktuell": 0
      },
    },
    sluttbehandling: {
      title: 'Sluttbehandling (Awesome Plan)',
      questions: [
        { id: 'ap_final1', text: 'Ble prosjektets opprinnelige målsetninger nådd?', theme: 'ap_theme_evaluation' },
        { id: 'ap_final2', text: 'Hva er den målte effekten av prosjektet etter lansering?', theme: 'ap_theme_impact' },
        { id: 'ap_final3', text: 'I hvilken grad har prosjektet levert varig verdi?', theme: 'ap_theme_evaluation' },
        { id: 'ap_final4', text: 'Er det identifisert uventede positive eller negative konsekvenser?', theme: 'ap_theme_impact' },
        { id: 'ap_final5', text: 'Er "lessons learned" dokumentert for fremtidige prosjekter?', theme: 'ap_theme_evaluation' },
        { id: 'ap_final6', text: 'Hvordan har prosjektet påvirket organisasjonens kompetanse og kultur?', theme: 'ap_theme_impact' },
      ],
      themes: [
        { id: 'ap_theme_evaluation', title: 'Evaluering og Måloppnåelse' },
        { id: 'ap_theme_impact', title: 'Virkning og Læring' },
      ],
      priorityMultipliers: {
        "Lav": 0.5,
        "Medium": 1,
        "Høy": 2,
        "Ikke aktuell": 0
      }
    },
  }
};

export default awesomePlan;