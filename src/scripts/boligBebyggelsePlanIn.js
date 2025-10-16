// **t_question Data**
export const themes = [
  { id: "t1", title: "Egnethet" },
  { id: "t2", title: "Forholdet foreslått bruk seg til gjeldende premisser?" },
];

// **t_question List**
export const questions = [
  //t_tema 1 Egnethet
  { id: "q1", theme: "t1", text: "I hvilke grad har området en god økonomisk forutsetning for å realisere et boligprosjekt?" },
  { id: "q2", theme: "t1", text: "Hvilke påvirkning vil tiltaket ha på dyrket og dyrkbar mark?" },
  { id: "q3", theme: "t1", text: "Hvilke påvirkning vil tiltaket ha for urørt natur og dyreliv?" },
  { id: "q4", theme: "t1", text: "Hvilke påvirkning vil tiltaket ha på omkringliggende områder?" },
  { id: "q5", theme: "t1", text: "Er adkomst til området enkelt for tiltenkte brukergrupper i dag?" },
  { id: "q6", theme: "t1", text: "I hvilke grad er nødvendige servicetilbud tilgjengelige fra området?" },
  { id: "q7", theme: "t1", text: "I hvilke grad ligger området i tilstrekkelig nærhet til grøntstrukturer og rekreasjonsområder?" },
  { id: "q8", theme: "t1", text: "I hvilke grad ligger prosjektet innenfor et prioritert vekstområde?" },
  { id: "q9", theme: "t1", text: "Dersom området skal transformeres, i hvilke grad er området modent for en transformasjon?" },
  { id: "q10", theme: "t1", text: "I hvilke grad egner området seg for boligbebyggelse kontra andre arealformål, da også nullalternativ?" },
  { id: "q11", theme: "t1", text: "Er utgangspunktet godt for å oppnå gode støyforhold?" },
  { id: "q12", theme: "t1", text: "Er utgangspunktet godt for å oppnå gode sol- og lysforhold?" },
  { id: "q13", theme: "t1", text: "Har tiltenkt område god tilknytning til nødvendig grad av kollektivtrafikk?" },
  { id: "q14", theme: "t1", text: "I hvike grad kan transport til planområdet løses med sykkel, gange og kollektivtrafikk fremfor bil?" },
  { id: "q15", theme: "t1", text: "Har terreng et godt utgangspunkt for å oppnå god tilgjengelighet?" },
  { id: "q16", theme: "t1", text: "Er dagens terreng krevende eller enkelt for å realisere prosjektet?" },
  //t_tema 2 Infrastruktur og samferdsel
  { id: "q17", theme: "t2", text: "Ser prosjektet ut til å tilpasse seg omkringliggende bebyggelse i estetikk, form og skala?" },
  { id: "q18", theme: "t2", text: "Ser prosjektet ut til å følge overordnede bestemmelser og retningslinjer?" },
  { id: "q19", theme: "t2", text: "Hvordan påvirkes eventuelle kulturmiljø og kulturminner?" },
  { id: "q20", theme: "t2", text: "Legger planen opp til en god balanse mellom bevaring av natur og viktige landskapsformasjoner og utbygging?" },
  { id: "q21", theme: "t2", text: "Legges det gode premisser for at interne kvaliteter som bevegelseslinjer, attrakive arealer til grønt- og lekeområder og overvanns- og flomveier sikres?" },
  { id: "q22", theme: "t2", text: "Ser man ut til å oppnå gode premisser for en balanse mellom offentlige-, halvprivate- og private areal?" },
  { id: "q23", theme: "t2", text: "Foreslås en hensiktsmessig tetthet i forhold til lokalisering og for å oppnå tilstrekkelig kvalitet?" },
  { id: "q24", theme: "t2", text: "Presenteres en hensiktsmessig boligvariasjon som legger tilrette for en hensiktsmessig variasjon av brukere med tanke på alder og familiesammensetning?" },
  { id: "q25", theme: "t2", text: "Ser prosjektet ut til å gi en type boliger det er særlig behov for i kommunen og tettstedet?" },
  { id: "q26", theme: "t2", text: "Ser prosjektet ut til å tilføre verdier til omkringliggende områder, samt gi noe tilbake til samfunnet i form av f. eks grøntstrukturer?" },
  { id: "q27", theme: "t2", text: "Har man i tilstrekkelig grad tatt med og sikret kvaliteter som må utbedres i omkringliggende områder, f. eks infrastruturtiltak, skolevei m.m.?" },
  { id: "q28", theme: "t2", text: "Er foreslått utvikling i tråd med tenkt helhetlig utvikling av nærområdet?" }
];

// **Priority Multipliers (Unit_que per t_question)**
export const questionMultipliers = {
  //t_tema 1 Egnethet
  q1: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  q2: { Lav: 1, Normal: 1.4, Høy: 1.8, "Ikke aktuelt": 1 },
  q3: { Lav: 1, Normal: 1.4, Høy: 1.8, "Ikke aktuelt": 1 },
  q4: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  q5: { Lav: 0.6, Normal: 0.8, Høy: 1, "Ikke aktuelt": 1 },
  q6: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  q7: { Lav: 0.8, Normal: 1.1, Høy: 1.3, "Ikke aktuelt": 1 },
  q8: { Lav: 0.8, Normal: 1.1, Høy: 1.4, "Ikke aktuelt": 1 },
  q9: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  q10: { Lav: 0.8, Normal: 1.1, Høy: 1.3, "Ikke aktuelt": 1 },
  q11: { Lav: 0.5, Normal: 0.8, Høy: 1, "Ikke aktuelt": 1 },
  q12: { Lav: 0.6, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  q13: { Lav: 0.7, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  q14: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  q15: { Lav: 0.6, Normal: 0.8, Høy: 1, "Ikke aktuelt": 1 },
  q16: { Lav: 0.5, Normal: 0.9, Høy: 1.3, "Ikke aktuelt": 1 },
  //t_tema 2 Infrastruktur og samferdsel
  q17: { Lav: 0.7, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  q18: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  q19: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  q20: { Lav: 0.7, Normal: 1, Høy: 1.3, "Ikke aktuelt": 1 },
  q21: { Lav: 0.6, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  q22: { Lav: 0.8, Normal: 1, Høy: 1.4, "Ikke aktuelt": 1 },
  q23: { Lav: 0.7, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  q24: { Lav: 0.6, Normal: 1, Høy: 1.4, "Ikke aktuelt": 1 },
  q25: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  q26: { Lav: 0.6, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  q27: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
  q28: { Lav: 0.6, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 }
};