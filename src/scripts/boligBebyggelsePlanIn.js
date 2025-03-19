// **t_question Data**
export const themes = [
  { id: "t_tema1", title: "Egnethet" },
  { id: "t_tema2", title: "Forholdet foreslått bruk seg til gjeldende premisser?" },
];

// **t_question List**
export const questions = [
  //t_tema 1 Egnethet
  { id: "t_q1", theme: "t_tema1", text: "I hvilke grad har området en god økonomisk forutsetning for å realisere et boligprosjekt?" },
  { id: "t_q2", theme: "t_tema1", text: "Hvilke påvirkning vil tiltaket ha på dyrket og dyrkbar mark?" },
  { id: "t_q3", theme: "t_tema1", text: "Hvilke påvirkning vil tiltaket ha for urørt natur og dyreliv?" },
  { id: "t_q4", theme: "t_tema1", text: "Hvilke påvirkning vil tiltaket ha på omkringliggende områder?" },
  { id: "t_q5", theme: "t_tema1", text: "Er adkomst til området enkelt for tiltenkte brukergrupper i dag?" },
  { id: "t_q6", theme: "t_tema1", text: "I hvilke grad er nødvendige servicetilbud tilgjengelige fra området?" },
  { id: "t_q7", theme: "t_tema1", text: "I hvilke grad ligger området i tilstrekkelig nærhet til grøntstrukturer og rekreasjonsområder?" },
  { id: "t_q8", theme: "t_tema1", text: "I hvilke grad ligger prosjektet innenfor et prioritert vekstområde?" },
  { id: "t_q9", theme: "t_tema1", text: "Dersom området skal transformeres, i hvilke grad er området modent for en transformasjon?" },
  { id: "t_q10", theme: "t_tema1", text: "I hvilke grad egner området seg for boligbebyggelse kontra andre arealformål, da også nullalternativ?" },
  { id: "t_q11", theme: "t_tema1", text: "Er utgangspunktet godt for å oppnå gode støyforhold?" },
  { id: "t_q12", theme: "t_tema1", text: "Er utgangspunktet godt for å oppnå gode sol- og lysforhold?" },
  { id: "t_q13", theme: "t_tema1", text: "Har tiltenkt område god tilknytning til nødvendig grad av kollektivtrafikk?" },
  { id: "t_q14", theme: "t_tema1", text: "I hvike grad kan transport til planområdet løses med sykkel, gange og kollektivtrafikk fremfor bil?" },
  { id: "t_q15", theme: "t_tema1", text: "Har terreng et godt utgangspunkt for å oppnå god tilgjengelighet?" },
  { id: "t_q16", theme: "t_tema1", text: "Er dagens terreng krevende eller enkelt for å realisere prosjektet?" },
  //t_tema 2 Infrastruktur og samferdsel
  { id: "t_q17", theme: "t_tema2", text: "Ser prosjektet ut til å tilpasse seg omkringliggende bebyggelse i estetikk, form og skala?" },
  { id: "t_q18", theme: "t_tema2", text: "Ser prosjektet ut til å følge overordnede bestemmelser og retningslinjer?" },
  { id: "t_q19", theme: "t_tema2", text: "Hvordan påvirkes eventuelle kulturmiljø og kulturminner?" },
  { id: "t_q20", theme: "t_tema2", text: "Legger planen opp til en god balanse mellom bevaring av natur og viktige landskapsformasjoner og utbygging?" },
  { id: "t_q21", theme: "t_tema2", text: "Legges det gode premisser for at interne kvaliteter som bevegelseslinjer, attrakive arealer til grønt- og lekeområder og overvanns- og flomveier sikres?" },
  { id: "t_q22", theme: "t_tema2", text: "Ser man ut til å oppnå gode premisser for en balanse mellom offentlige-, halvprivate- og private areal?" },
  { id: "t_q23", theme: "t_tema2", text: "Foreslås en hensiktsmessig tetthet i forhold til lokalisering og for å oppnå tilstrekkelig kvalitet?" },
  { id: "t_q24", theme: "t_tema2", text: "Presenteres en hensiktsmessig boligvariasjon som legger tilrette for en hensiktsmessig variasjon av brukere med tanke på alder og familiesammensetning?" },
  { id: "t_q25", theme: "t_tema2", text: "Ser prosjektet ut til å gi en type boliger det er særlig behov for i kommunen og tettstedet?" },
  { id: "t_q26", theme: "t_tema2", text: "Ser prosjektet ut til å tilføre verdier til omkringliggende områder, samt gi noe tilbake til samfunnet i form av f. eks grøntstrukturer?" },
  { id: "t_q27", theme: "t_tema2", text: "Har man i tilstrekkelig grad tatt med og sikret kvaliteter som må utbedres i omkringliggende områder, f. eks infrastruturtiltak, skolevei m.m.?" },
  { id: "t_q28", theme: "t_tema2", text: "Er foreslått utvikling i tråd med tenkt helhetlig utvikling av nærområdet?" }
];

// **Priority Multipliers (Unit_que per t_question)**
export const t_questionMultipliers = {
  //t_tema 1 Egnethet
  t_q1: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  t_q2: { Lav: 1, Normal: 1.4, Høy: 1.8, "Ikke aktuelt": 1 },
  t_q3: { Lav: 1, Normal: 1.4, Høy: 1.8, "Ikke aktuelt": 1 },
  t_q4: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  t_q5: { Lav: 0.6, Normal: 0.8, Høy: 1, "Ikke aktuelt": 1 },
  t_q6: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  t_q7: { Lav: 0.8, Normal: 1.1, Høy: 1.3, "Ikke aktuelt": 1 },
  t_q8: { Lav: 0.8, Normal: 1.1, Høy: 1.4, "Ikke aktuelt": 1 },
  t_q9: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  t_q10: { Lav: 0.8, Normal: 1.1, Høy: 1.3, "Ikke aktuelt": 1 },
  t_q11: { Lav: 0.5, Normal: 0.8, Høy: 1, "Ikke aktuelt": 1 },
  t_q12: { Lav: 0.6, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  t_q13: { Lav: 0.7, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  t_q14: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  t_q15: { Lav: 0.6, Normal: 0.8, Høy: 1, "Ikke aktuelt": 1 },
  t_q16: { Lav: 0.5, Normal: 0.9, Høy: 1.3, "Ikke aktuelt": 1 },
  //t_tema 2 Infrastruktur og samferdsel
  t_q17: { Lav: 0.7, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  t_q18: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  t_q19: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  t_q20: { Lav: 0.7, Normal: 1, Høy: 1.3, "Ikke aktuelt": 1 },
  t_q21: { Lav: 0.6, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  t_q22: { Lav: 0.8, Normal: 1, Høy: 1.4, "Ikke aktuelt": 1 },
  t_q23: { Lav: 0.7, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  t_q24: { Lav: 0.6, Normal: 1, Høy: 1.4, "Ikke aktuelt": 1 },
  t_q25: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  t_q26: { Lav: 0.6, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  t_q27: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  t_q28: { Lav: 0.6, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 }
};