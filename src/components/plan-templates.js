// src/components/plan-templates.js

// --- Priority Multipliers ---
const priorityMultipliers = {
  "Lav": 0.8,
  "Medium": 1.2,
  "Høy": 1.5,
  "Ikke aktuell": 0, // Will result in a score of 0
};

// --- Form Data Definitions ---

const forstegangsbehandlingData = {
  themes: [
    { id: "r_tema1", title: "Egnethet" },
    { id: "r_tema2", title: "Ser prosjekt ut til å tilpasse seg gitte premisser?" },
  ],
  questions: [
    //r_tema 1 Egnethet
    { id: "r_q1", theme: "r_tema1", text: "I hvilke grad har området en god økonomisk forutsetning for å realisere prosjektet?" },
    { id: "r_q2", theme: "r_tema1", text: "I hvilke grad kan foretaket generere samfunns- og økonomiske verdier?" },
    { id: "r_q3", theme: "r_tema1", text: "Hvilke påvirkning vil tiltaket ha på dyrket og dyrkbar mark?" },
    { id: "r_q4", theme: "r_tema1", text: "Hvilke påvirkning vil tiltaket ha for urørt natur og dyreliv?" },
    { id: "r_q5", theme: "r_tema1", text: "Er dagens infrastruktur frem til området egnet for forventet trafikkøkning?" },
    { id: "r_q6", theme: "r_tema1", text: "Er dagens terreng krevende eller enkelt for å realisere prosjektet?" },
    { id: "r_q7", theme: "r_tema1", text: "Hvordan påvirkes eventuelle kulturmiljø og kulturminner?" },
    { id: "r_q8", theme: "r_tema1", text: "I hvilke grad egner området seg for råstoffutvinning kontra andre arealformål, da også nullalternativ?" },
    { id: "r_q9", theme: "r_tema1", text: "Er utgangspunktet godt for å oppnå gode støyforhold for omkringliggende områder, da også natur?" },
    { id: "r_q10", theme: "r_tema1", text: "Foreligger det et godt utgangspunkt for synergier med andre foretak og næringer innenfor nærområdet?" },
    { id: "r_q11", theme: "r_tema1", text: "I hvilke grad er utvinningen samfunnsmessig nødvendig?" },
    { id: "r_q12", theme: "r_tema1", text: "I hvilke grad kan området tilbakeføres i en forbedret tilstand?" },
    { id: "r_q13", theme: "r_tema1", text: "I hvilke grad gjøres det irreversible inngrep som forringer dagens tilstand?" },
    { id: "r_q14", theme: "r_tema1", text: "I hvilke grad kan det gjennomføres et gradvis uttak og en gradvis tilbakeføring?" },
    { id: "r_q15", theme: "r_tema1", text: "Hvilke påvirkning vil uttaket ha for miljø og klima?" },
    //r_tema 2 Ser prosjekt ut til å tilpasse seg gitte premisser?
    { id: "r_q18", theme: "r_tema2", text: "Ser prosjektet ut til å tilpasse seg omkringliggende miljø i driftstiden?" },
    { id: "r_q19", theme: "r_tema2", text: "Ser tenkt sluttprodukt etter endt uttak ut til å tilpasse seg omkringliggende miljø?" },
    { id: "r_q20", theme: "r_tema2", text: "Har man gjort en god innledende vurdering på mulig etterbruk av området?" },
    { id: "r_q21", theme: "r_tema2", text: "Ser prosjektet ut til å følge overordnede bestemmelser og retningslinjer?" },
    { id: "r_q22", theme: "r_tema2", text: "Legges det gode premisser for at viktige natur- og terrengformasjoner kan bevares?" },
    { id: "r_q23", theme: "r_tema2", text: "Har man i tilstrekkelig grad vurdert aktuelle tileggsfunksjoner? Har man et godt utgangspunkt for å etablere funksjonene?" },
    { id: "r_q24", theme: "r_tema2", text: "Legges det gode premisser for soneinndelt uttak, dersom det er aktuelt?" },
    { id: "r_q25", theme: "r_tema2", text: "Er innledende planavgrensing hensiktsmessig?" },
    { id: "r_q26", theme: "r_tema2", text: "Skapes det gode forutsetninger for intern infrastruktur og infrastruktur frem til hovedinfrastruktur?" },
    { id: "r_q27", theme: "r_tema2", text: "Legges det gode premisser for å forhindre uønskede hendelser og forurrensning?" },
    { id: "r_q28", theme: "r_tema2", text: "Legges det gode premisser for å bruk av bimasser?" }
  ],
  priorityMultipliers,
};

const planinitiativData = {
  themes: [{ id: "tema-1-planinitiativ", title: "Initiativdetaljer" }, { id: "tema-2-planinitiativ", title: "Område og Omfang" }],
  questions: [
    { id: "pi_q1", theme: "tema-1-planinitiativ", text: "I hvilken grad er initiativet i tråd med kommunens overordnede planer?" },
    { id: "pi_q2", theme: "tema-1-planinitiativ", text: "Vurderes initiativets samfunnsnytte som betydelig?" },
    { id: "pi_q3", theme: "tema-1-planinitiativ", text: "Er det identifisert noen umiddelbare 'deal-breakers' eller store konflikter?" },
    { id: "pi_q4", theme: "tema-2-planinitiativ", text: "Er planområdets avgrensning hensiktsmessig for formålet?" },
    { id: "pi_q5", theme: "tema-2-planinitiativ", text: "Hvor godt er kunnskapsgrunnlaget i planinitiativet?" },
    { id: "pi_q6", theme: "tema-2-planinitiativ", text: "I hvilken grad er de foreslåtte rammene realistiske?" },
  ],
  priorityMultipliers,
};

const sluttbehandlingData = {
  themes: [{ id: "tema-1-slutt", title: "Vedtak og Konklusjon" }],
  questions: [
    { id: "sb_q1", theme: "tema-1-slutt", text: "I hvilken grad oppfyller den endelige planen de opprinnelige målene fra planinitiativet?" },
    { id: "sb_q2", theme: "tema-1-slutt", text: "Har prosessen avdekket og løst vesentlige konflikter på en god måte?" },
    { id: "sb_q3", theme: "tema-1-slutt", text: "Vurder den endelige planens kvalitet og gjennomførbarhet." },
    { id: "sb_q4", theme: "tema-1-slutt", text: "I hvilken grad har medvirkning påvirket det endelige planforslaget positivt?" },
  ],
  priorityMultipliers,
};

/**
 * Defines individual form templates.
 * The keys here should be unique across all forms.
 */
export const FORM_TEMPLATES = {
  FORSTEGANGSBEHANDLING: {
    key: "forstegangsbehandling",
    title: "Førstegangsbehandling",
    ...forstegangsbehandlingData,
  },
  PLANINITIATIV: {
    key: "planinitiativ",
    title: "Planinitiativ",
    ...planinitiativData,
  },
  SLUTTBEHANDLING: {
    key: "sluttbehandling",
    title: "Sluttbehandling",
    ...sluttbehandlingData,
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