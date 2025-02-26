// newForm.js

// -------------------------------
// Themes
// -------------------------------
export const themes = [
    { id: "y_tema1", title: "Egnethet" },
    { id: "y_tema2", title: "Ser" },
  ];
  
  // -------------------------------
  // Question List
  // -------------------------------
  export const questions = [
    // Tema 1: Egnethet
    { id: "y_q1", theme: "y_tema1", text: "I hvilke grad har området en god økonomisk forutsetning for å realisere prosjektet?" },
    { id: "y_q2", theme: "y_tema1", text: "I hvilke grad kan foretaket generere samfunns- og økonomiske verdier?" },
    { id: "y_q3", theme: "y_tema1", text: "Hvilke påvirkning vil tiltaket ha på dyrket og dyrkbar mark?" },
    { id: "y_q4", theme: "y_tema1", text: "Hvilke påvirkning vil tiltaket ha for urørt natur og dyreliv?" },
    { id: "y_q5", theme: "y_tema1", text: "Er dagens infrastruktur frem til området egnet for forventet trafikkøkning?" },
    { id: "y_q6", theme: "y_tema1", text: "Er dagens terreng krevende eller enkelt for å realisere prosjektet?" },
    { id: "y_q7", theme: "y_tema1", text: "Hvordan påvirkes eventuelle kulturmiljø og kulturminner?" },
    { id: "y_q8", theme: "y_tema1", text: "I hvilke grad egner området seg for råstoffutvinning kontra andre arealformål, da også nullalternativ?" },
    { id: "y_q9", theme: "y_tema1", text: "Er utgangspunktet godt for å oppnå gode støyforhold for omkringliggende områder, da også natur?" },
    { id: "y_q10", theme: "y_tema1", text: "Foreligger det et godt utgangspunkt for synergier med andre foretak og næringer innenfor nærområdet?" },
    { id: "y_q11", theme: "y_tema1", text: "I hvilke grad er utvinningen samfunnsmessig nødvendig?" },
    { id: "y_q12", theme: "y_tema1", text: "I hvilke grad kan området tilbakeføres i en forbedret tilstand?" },
    { id: "y_q13", theme: "y_tema1", text: "I hvilke grad gjøres det irreversible inngrep som forringer dagens tilstand?" },
    { id: "y_q14", theme: "y_tema1", text: "I hvilke grad kan det gjennomføres et gradvis uttak og en gradvis tilbakeføring?" },
    { id: "y_q15", theme: "y_tema1", text: "Hvilke påvirkning vil uttaket ha for miljø og klima?" },
    
    // Tema 2: Ser prosjekt ut til å tilpasse seg gitte premisser?
    { id: "y_q18", theme: "y_tema2", text: "Ser prosjektet ut til å tilpasse seg omkringliggende miljø i driftstiden?" },
    { id: "y_q19", theme: "y_tema2", text: "Ser tenkt sluttprodukt etter endt uttak ut til å tilpasse seg omkringliggende miljø?" },
    { id: "y_q20", theme: "y_tema2", text: "Har man gjort en god innledende vurdering på mulig etterbruk av området?" },
    { id: "y_q21", theme: "y_tema2", text: "Ser prosjektet ut til å følge overordnede bestemmelser og retningslinjer?" },
    { id: "y_q22", theme: "y_tema2", text: "Legges det gode premisser for at viktige natur- og terrengformasjoner kan bevares?" },
    { id: "y_q23", theme: "y_tema2", text: "Har man i tilstrekkelig grad vurdert aktuelle tileggsfunksjoner? Har man et godt utgangspunkt for å etablere funksjonene?" },
    { id: "y_q24", theme: "y_tema2", text: "Legges det gode premisser for soneinndelt uttak, dersom det er aktuelt?" },
    { id: "y_q25", theme: "y_tema2", text: "Er innledende planavgrensing hensiktsmessig?" },
    { id: "y_q26", theme: "y_tema2", text: "Skapes det gode forutsetninger for intern infrastruktur og infrastruktur frem til hovedinfrastruktur?" },
    { id: "y_q27", theme: "y_tema2", text: "Legges det gode premisser for å forhindre uønskede hendelser og forurrensning?" },
    { id: "y_q28", theme: "y_tema2", text: "Legges det gode premisser for å bruk av bimasser?" },
    { id: "y_q29", theme: "y_tema2", text: "Er foreslått utvikling i tråd med tenkt helhetlig utvikling av nærområdet?" }
  ];
  
  export const questionMultipliers = {
    // Tema 1 Egnethet
    y_q1: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    y_q2: { Lav: 0.6, Normal: 1.1, Høy: 1.5, "Ikke aktuelt": 1 },
    y_q3: { Lav: 1, Normal: 1.4, Høy: 1.8, "Ikke aktuelt": 1 },
    y_q4: { Lav: 1, Normal: 1.4, Høy: 1.8, "Ikke aktuelt": 1 },
    y_q5: { Lav: 0.6, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    y_q6: { Lav: 0.6, Normal: 0.8, Høy: 1.2, "Ikke aktuelt": 1 },
    y_q7: { Lav: 0.5, Normal: 1, Høy: 1.5, "Ikke aktuelt": 1 },
    y_q8: { Lav: 0.5, Normal: 1, Høy: 1.3, "Ikke aktuelt": 1 },
    y_q9: { Lav: 0.4, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    y_q10: { Lav: 0.6, Normal: 0.8, Høy: 1.2, "Ikke aktuelt": 1 },
    y_q11: { Lav: 0.8, Normal: 1.2, Høy: 1.6, "Ikke aktuelt": 1 },
    y_q12: { Lav: 0.5, Normal: 0.8, Høy: 1, "Ikke aktuelt": 1 },
    y_q13: { Lav: 0.5, Normal: 1, Høy: 1.5, "Ikke aktuelt": 1 },
    y_q14: { Lav: 0.4, Normal: 1, Høy: 1.5, "Ikke aktuelt": 1 },
    y_q15: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    y_q16: { Lav: 0.6, Normal: 0.8, Høy: 1, "Ikke aktuelt": 1 },
    y_q17: { Lav: 0.5, Normal: 0.9, Høy: 1.3, "Ikke aktuelt": 1 },
    // Tema 2 Infrastruktur og samferdsel
    y_q18: { Lav: 0.7, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    y_q19: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    y_q20: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    y_q21: { Lav: 0.7, Normal: 1, Høy: 1.3, "Ikke aktuelt": 1 },
    y_q22: { Lav: 0.6, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    y_q23: { Lav: 0.8, Normal: 1, Høy: 1.4, "Ikke aktuelt": 1 },
    y_q24: { Lav: 0.7, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    y_q25: { Lav: 0.6, Normal: 1, Høy: 1.4, "Ikke aktuelt": 1 },
    y_q26: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    y_q27: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    y_q28: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    y_q29: { Lav: 0.6, Normal: 1, Høy: 1, "Ikke aktuelt": 1 },
  };
  