// **r_question Data**
export const themes = [
  { id: "t1", title: "Testing" },
  { id: "t2", title: "Yehaaw " },
];

// **r_question List**
export const questions = [
  //r_tema 1 Egnethet
  { id: "q1", theme: "t1", text: "I hvilke grad har området en god økonomisk forutsetning for å realisere prosjektet?" },
  { id: "q2", theme: "t1", text: "I hvilke grad kan foretaket generere samfunns- og økonomiske verdier?" },
  { id: "q3", theme: "t1", text: "Hvilke påvirkning vil tiltaket ha på dyrket og dyrkbar mark?" },
  { id: "q4", theme: "t1", text: "Hvilke påvirkning vil tiltaket ha for urørt natur og dyreliv?" },
  { id: "q5", theme: "t1", text: "Er dagens infrastruktur frem til området egnet for forventet trafikkøkning?" },
  { id: "q6", theme: "t1", text: "Er dagens terreng krevende eller enkelt for å realisere prosjektet?" },
  { id: "q7", theme: "t1", text: "Hvordan påvirkes eventuelle kulturmiljø og kulturminner?" },
  { id: "q8", theme: "t1", text: "I hvilke grad egner området seg for råstoffutvinning kontra andre arealformål, da også nullalternativ?" },
  { id: "q9", theme: "t1", text: "Er utgangspunktet godt for å oppnå gode støyforhold for omkringliggende områder, da også natur?" },
  { id: "q10", theme: "t1", text: "Foreligger det et godt utgangspunkt for synergier med andre foretak og næringer innenfor nærområdet?" },
  { id: "q11", theme: "t1", text: "I hvilke grad er utvinningen samfunnsmessig nødvendig?" },
  { id: "q12", theme: "t1", text: "I hvilke grad kan området tilbakeføres i en forbedret tilstand?" },
  { id: "q13", theme: "t1", text: "I hvilke grad gjøres det irreversible inngrep som forringer dagens tilstand?" },
  { id: "q14", theme: "t1", text: "I hvilke grad kan det gjennomføres et gradvis uttak og en gradvis tilbakeføring?" },
  { id: "q15", theme: "t1", text: "Hvilke påvirkning vil uttaket ha for miljø og klima?" },
  //r_tema 2 Ser prosjekt ut til å tilpasse seg gitte premisser?
  { id: "q18", theme: "t2", text: "Ser prosjektet ut til å tilpasse seg omkringliggende miljø i driftstiden?" },
  { id: "q19", theme: "t2", text: "Ser tenkt sluttprodukt etter endt uttak ut til å tilpasse seg omkringliggende miljø?" },
  { id: "q20", theme: "t2", text: "Har man gjort en god innledende vurdering på mulig etterbruk av området?" },
  { id: "q21", theme: "t2", text: "Ser prosjektet ut til å følge overordnede bestemmelser og retningslinjer?" },
  { id: "q22", theme: "t2", text: "Legges det gode premisser for at viktige natur- og terrengformasjoner kan bevares?" },
  { id: "q23", theme: "t2", text: "Har man i tilstrekkelig grad vurdert aktuelle tileggsfunksjoner? Har man et godt utgangspunkt for å etablere funksjonene?" },
  { id: "q24", theme: "t2", text: "Legges det gode premisser for soneinndelt uttak, dersom det er aktuelt?" },
  { id: "q25", theme: "t2", text: "Er innledende planavgrensing hensiktsmessig?" },
  { id: "q26", theme: "t2", text: "Skapes det gode forutsetninger for intern infrastruktur og infrastruktur frem til hovedinfrastruktur?" },
  { id: "q27", theme: "t2", text: "Legges det gode premisser for å forhindre uønskede hendelser og forurrensning?" },
  { id: "q28", theme: "t2", text: "Legges det gode premisser for å bruk av bimasser?" }
];

// **Priority Multipliers (Unir_que per r_question)**
export const questionMultipliers = {
  //r_tema 1 Egnethet
  q1: { Lav: 0.8, Normal: 1, Høy: 1.4, "Ikke aktuelt": 1 },
  q2: { Lav: 0.6, Normal: 1.1, Høy: 1.5, "Ikke aktuelt": 1 },
  q3: { Lav: 1, Normal: 1.4, Høy: 1.8, "Ikke aktuelt": 1 },
  q4: { Lav: 1, Normal: 1.4, Høy: 1.8, "Ikke aktuelt": 1 },
  q5: { Lav: 0.6, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  q6: { Lav: 0.6, Normal: 0.8, Høy: 1.2, "Ikke aktuelt": 1 },
  q7: { Lav: 0.5, Normal: 1, Høy: 1.5, "Ikke aktuelt": 1 },
  q8: { Lav: 0.5, Normal: 1, Høy: 1.3, "Ikke aktuelt": 1 },
  q9: { Lav: 0.4, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  q10: { Lav: 0.6, Normal: 0.8, Høy: 1.2, "Ikke aktuelt": 1 },
  q11: { Lav: 0.8, Normal: 1.2, Høy: 1.6, "Ikke aktuelt": 1 },
  q12: { Lav: 0.5, Normal: 1, Høy: 1.5, "Ikke aktuelt": 1 },
  q13: { Lav: 0.5, Normal: 1, Høy: 1.5, "Ikke aktuelt": 1 },
  q14: { Lav: 0.4, Normal: 1, Høy: 1.5, "Ikke aktuelt": 1 },
  q15: { Lav: 0.8, Normal: 1.2, Høy: 1.6, "Ikke aktuelt": 1 },
  //r_tema 2 Utforming og inngrep
  q18: { Lav: 1, Normal: 1.4, Høy: 1.8, "Ikke aktuelt": 1 },
  q19: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  q20: { Lav: 0.6, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  q21: { Lav: 0.6, Normal: 1.1, Høy: 1.5, "Ikke aktuelt": 1 },
  q22: { Lav: 0.6, Normal: 1, Høy: 1.4, "Ikke aktuelt": 1 },
  q23: { Lav: 0.6, Normal: 1, Høy: 1.4, "Ikke aktuelt": 1 },
  q24: { Lav: 0.8, Normal: 1, Høy: 1.3, "Ikke aktuelt": 1 },
  q25: { Lav: 0.8, Normal: 1.1, Høy: 1.4, "Ikke aktuelt": 1 },
  q26: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  q27: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  q28: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 }
};