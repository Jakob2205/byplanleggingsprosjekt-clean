// **r_question Data**
export const themes = [
  { id: "r_tema1", title: "Egnethet" },
  { id: "r_tema2", title: "Ser " },
];

// **r_question List**
export const questions = [
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
];

// **Priority Multipliers (Unir_que per r_question)**
export const r_questionMultipliers = {
  //r_tema 1 Egnethet
  r_q1: { Lav: 0.8, Normal: 1, Høy: 1.4, "Ikke aktuelt": 1 },
  r_q2: { Lav: 0.6, Normal: 1.1, Høy: 1.5, "Ikke aktuelt": 1 },
  r_q3: { Lav: 1, Normal: 1.4, Høy: 1.8, "Ikke aktuelt": 1 },
  r_q4: { Lav: 1, Normal: 1.4, Høy: 1.8, "Ikke aktuelt": 1 },
  r_q5: { Lav: 0.6, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  r_q6: { Lav: 0.6, Normal: 0.8, Høy: 1.2, "Ikke aktuelt": 1 },
  r_q7: { Lav: 0.5, Normal: 1, Høy: 1.5, "Ikke aktuelt": 1 },
  r_q8: { Lav: 0.5, Normal: 1, Høy: 1.3, "Ikke aktuelt": 1 },
  r_q9: { Lav: 0.4, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  r_q10: { Lav: 0.6, Normal: 0.8, Høy: 1.2, "Ikke aktuelt": 1 },
  r_q11: { Lav: 0.8, Normal: 1.2, Høy: 1.6, "Ikke aktuelt": 1 },
  r_q12: { Lav: 0.5, Normal: 1, Høy: 1.5, "Ikke aktuelt": 1 },
  r_q13: { Lav: 0.5, Normal: 1, Høy: 1.5, "Ikke aktuelt": 1 },
  r_q14: { Lav: 0.4, Normal: 1, Høy: 1.5, "Ikke aktuelt": 1 },
  r_q15: { Lav: 0.8, Normal: 1.2, Høy: 1.6, "Ikke aktuelt": 1 },
  //r_tema 2 Utforming og inngrep
  r_q18: { Lav: 1, Normal: 1.4, Høy: 1.8, "Ikke aktuelt": 1 },
  r_q19: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  r_q20: { Lav: 0.6, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  r_q21: { Lav: 0.6, Normal: 1.1, Høy: 1.5, "Ikke aktuelt": 1 },
  r_q22: { Lav: 0.6, Normal: 1, Høy: 1.4, "Ikke aktuelt": 1 },
  r_q23: { Lav: 0.6, Normal: 1, Høy: 1.4, "Ikke aktuelt": 1 },
  r_q24: { Lav: 0.8, Normal: 1, Høy: 1.3, "Ikke aktuelt": 1 },
  r_q25: { Lav: 0.8, Normal: 1.1, Høy: 1.4, "Ikke aktuelt": 1 },
  r_q26: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  r_q27: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  r_q27: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 }
};