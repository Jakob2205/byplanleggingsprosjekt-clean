const standardPlanprosess = {
  key: 'standardPlanprosess',
  title: 'Standard Planprosess',
  forms: [
    {
      key: 'planinitiativ',
      title: 'Planinitiativ',
      questions: [
        { id: 'q_init1', text: 'Spørsmål A: Er planinitiativet i tråd med kommunens overordnede strategier?', theme: 'theme_strategy' },
        { id: 'q_init2', text: 'Spørsmål B: Er det foretatt en foreløpig vurdering av virkninger?', theme: 'theme_impact' },
        { id: 'q_init3', text: 'Spørsmål C: Er det identifisert interessekonflikter?', theme: 'theme_impact' },
        { id: 'q_init4', text: 'Spørsmål D: Er forslaget økonomisk gjennomførbart?', theme: 'theme_strategy' },
        { id: 'q_init5', text: 'Spørsmål E: Er det behov for ytterligere utredninger?', theme: 'theme_strategy' },
        { id: 'q_init6', text: 'Spørsmål F: Er tidsplanen realistisk?', theme: 'theme_strategy' },
      ],
      themes: [
        { id: 'theme_strategy', title: 'Strategi' },
        { id: 'theme_impact', title: 'Virkning' },
      ],
      priorityMultipliers: {
        "Lav": 0.5,
        "Medium": 1,
        "Høy": 2,
        "Ikke aktuell": 0
      }
    },
    {
      key: 'forstegangsbehandling',
      title: 'Førstegangsbehandling',
      questions: [
        { id: 'q1', text: 'Spørsmål 1: Er prosjektet i tråd med overordnede mål?', theme: 'theme_general' },
        { id: 'q2', text: 'Spørsmål 2: Hvor stor er den forventede miljøpåvirkningen?', theme: 'theme_environment' },
        { id: 'q3', text: 'Spørsmål 3: Er det tilstrekkelig finansiering?', theme: 'theme_economy' },
        { id: 'q4', text: 'Spørsmål 4: Er det tilstrekkelig med ressurser?', theme: 'theme_economy' },
        { id: 'q5', text: 'Spørsmål 5: Er det tilstrekkelig med kompetanse?', theme: 'theme_general' },
        { id: 'q6', text: 'Spørsmål 6: Er alle lovpålagte krav oppfylt?', theme: 'theme_general' },
        { id: 'q7', text: 'Spørsmål 7: Hvordan påvirkes naboer og nærmiljø?', theme: 'theme_environment' },
        { id: 'q8', text: 'Spørsmål 8: Er det behov for dispensasjoner?', theme: 'theme_general' },
        { id: 'q9', text: 'Spørsmål 9: Er kostnadsoverslaget validert?', theme: 'theme_economy' },
      ],
      themes: [
        { id: 'theme_general', title: 'Generelt' },
        { id: 'theme_environment', title: 'Miljø' },
        { id: 'theme_economy', title: 'Økonomi' },
      ],
      priorityMultipliers: {
        "Lav": 0.5,
        "Medium": 1,
        "Høy": 2,
        "Ikke aktuell": 0
      }
    },
    {
      key: 'sluttbehandling',
      title: 'Sluttbehandling',
      questions: [
        { id: 'q_final1', text: 'Spørsmål X: Er alle vilkår og rekkefølgekrav oppfylt?', theme: 'theme_conditions' },
        { id: 'q_final2', text: 'Spørsmål Y: Er planen klar for endelig vedtak?', theme: 'theme_approval' },
        { id: 'q_final3', text: 'Spørsmål Z: Er all dokumentasjon arkivert korrekt?', theme: 'theme_approval' },
        { id: 'q_final4', text: 'Spørsmål AA: Er det utarbeidet en plan for overlevering?', theme: 'theme_conditions' },
        { id: 'q_final5', text: 'Spørsmål BB: Er alle økonomiske avslutninger gjort?', theme: 'theme_conditions' },
        { id: 'q_final6', text: 'Spørsmål CC: Er det behov for en evaluering av prosessen?', theme: 'theme_approval' },
      ],
      themes: [
        { id: 'theme_conditions', title: 'Vilkår' },
        { id: 'theme_approval', title: 'Godkjenning' },
      ],
      priorityMultipliers: {
        "Lav": 0.5,
        "Medium": 1,
        "Høy": 2,
        "Ikke aktuell": 0
      }
    }
  ]
};

export default standardPlanprosess;
