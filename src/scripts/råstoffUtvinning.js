// råstoffUtvinning.js

// -------------------------------
// Themes
// -------------------------------
export const themes = [
    { id: "r_tema1", title: "Egnethet" },
    { id: "r_tema2", title: "Infrastruktur og samferdsel" },
    { id: "r_tema3", title: "Utforming og inngrep" },
    { id: "r_tema4", title: "Lekeplasser, natur- og grøntområder" },
    { id: "r_tema5", title: "Barn og unges interesser" },
    { id: "r_tema6", title: "Universell utforming og tilgjengelighet" },
    { id: "r_tema7", title: "Vann og avløp" },
    { id: "r_tema8", title: "Rekkefølgekrav" },
    { id: "r_tema9", title: "Kvalitet på plan og kunnskapsgrunnlag" },
  ];
  
  // -------------------------------
  // Question List
  // -------------------------------
  export const questions = [
    // Tema 1: Egnethet
    { id: "r_q1", theme: "r_tema1", text: "I hvilke grad har området en god økonomisk forutsetning for å realisere prosjektet?" },
    { id: "r_q2", theme: "r_tema1", text: "I hvilke grad kan foretaket generere samfunns- og økonomiske verdier?" },
    { id: "r_q3", theme: "r_tema1", text: "Hvilke påvirkning vil tiltaket ha på dyrket og dyrkbar mark?" },
    { id: "r_q4", theme: "r_tema1", text: "Hvilke påvirkning vil tiltaket ha for urørt natur og dyreliv?" },
    { id: "r_q5", theme: "r_tema1", text: "Er dagens infrastruktur frem til området egnet for forventet trafikkøkning?" },
    { id: "r_q6", theme: "r_tema1", text: "Er dagens terreng krevende eller enkelt for å realisere prosjektet?" },
    { id: "r_q7", theme: "r_tema1", text: "Hvordan påvirkes eventuelle kulturmiljø og kulturminner?" },
    { id: "r_q8", theme: "r_tema1", text: "I hvilke grad egner området seg for råstoffutvinning kontra andre arealformål, da også nullalternativ?" },
    { id: "r_q9", theme: "r_tema1", text: "Er utgangspunktet godt for å oppnå gode støyforhold for omkringliggende områder, da også natur?" },
    { id: "r_q10", theme: "r_tema1", text: "Foreligger det et godt utgangspunkt for synergier med andre foretak og næringer?" },
    { id: "r_q11", theme: "r_tema1", text: "I hvilke grad er utvinningen samfunnsmessig nødvendig?" },
    { id: "r_q12", theme: "r_tema1", text: "I hvilke grad kan området tilbakeføres i en forbedret tilstand?" },
    { id: "r_q13", theme: "r_tema1", text: "I hvilke grad gjøres det irreversible inngrep som forringer dagens tilstand?" },
    { id: "r_q14", theme: "r_tema1", text: "I hvilke grad kan det gjennomføres et gradvis uttak og en gradvis tilbakeføring?" },
    { id: "r_q15", theme: "r_tema1", text: "Hvilke påvirkning vil uttaket ha for miljø og klima?" },
    
    // Tema 2: Infrastruktur og samferdsel
    { id: "r_q18", theme: "r_tema2", text: "Sikres det nødvendig areal til lagring og mellomlagring av masser?" },
    { id: "r_q19", theme: "r_tema2", text: "Sikres en god håndtering av eventuelle biprodukter fra uttaket?" },
    { id: "r_q20", theme: "r_tema2", text: "Setter man hensiktsmessige dybdegrenser for maksimalt uttak, som gir en god balanse mellom utnytting av arealressurs og ivaretakelse av andre interesser?" },
    { id: "r_q21", theme: "r_tema2", text: "Setter man hensiktsmessige arealgrenser for maksimalt uttak, som gir en god balanse mellom utnytting av arealressurs og ivaretakelse av andre interesser?" },
    { id: "r_q22", theme: "r_tema2", text: "Er det kartlagt hvilke andre funksjoner som kan ha synergier med råstoffutvinningen som legges til området? Er det eventuelt en hensiktsmessig plassering for slike funksjoner?" },
    { id: "r_q23", theme: "r_tema2", text: "Dersom man tenker sonedelt uttak, sikres det tilstrekkelig areal for alle nødvendige funksjoner for hver sone?" },
    { id: "r_q24", theme: "r_tema2", text: "Sikres det areal til nødvendig bebyggelse?" },
    { id: "r_q25", theme: "r_tema2", text: "I hvilke grad er det tenkt på og avsatt areal til nødvendige serviceareal som f.eks parkering og servicefunksjoner?" },
    
    // Tema 3: Natur og miljø
    { id: "r_q26", theme: "r_tema3", text: "I hvilken grad vil foretak forurrense miljøet? Sikres det en god estetisk kvalitet?" },
    { id: "r_q27", theme: "r_tema3", text: "I hvilke grad kan foretaket forårsake negative og uplanlagte miljøhendelser?" },
    { id: "r_q28", theme: "r_tema3", text: "Foreligger det rødlistede arter innenfor planområdet, om ja, hvordan er ivaretagelsen av artene?" },
    { id: "r_q29", theme: "r_tema3", text: "Hvilke påvirkning vil foretaket ha på vassdrag og vannmiljø?" },
    { id: "r_q30", theme: "r_tema3", text: "Beholdes identifiserte viktige naturelement som trær, terrengformasjoner og dyreliv og får de en naturlig kobling til tilgresende naturområder?" },
    { id: "r_q31", theme: "r_tema3", text: "Er eksisternde natur- og landskapsdrag av høy kvalitet identifisert og sikret bevart?" },
    { id: "r_q32", theme: "r_tema3", text: "Dersom området skal tilbakeføres til natur- eller kulturlandskap; i hvilken grad sikres en bedre utforming og bruk av området kontra dagens situasjon?" },
    { id: "r_q33", theme: "r_tema3", text: "Er avrenning fra området i tilstrekkelig grad håndtert?" },
    { id: "r_q34", theme: "r_tema3", text: "Er overvannssystemer og flomveier sikret og vist i plankart?" },
    
    // Tema 4: Påvirkning på omkringliggende områder
    { id: "r_q35", theme: "r_tema4", text: "Sikres det hensiktsmessige åpningstider for uttak for å redusere påkjenning på omkringliggende områder?" },
    { id: "r_q36", theme: "r_tema4", text: "Settes det i nødvendig grad krav om støvreduserende tiltak?" },
    { id: "r_q37", theme: "r_tema4", text: "Settes det i nødvendig grad krav om støyreduserende tiltak?" },
    { id: "r_q38", theme: "r_tema4", text: "Sikres området i tilstrekkelig grad mot uønsket bruk og hendelser?" },
    { id: "r_q39", theme: "r_tema4", text: "Settes det av nødvendige landskaps- og terrengbuffere mot tilgrensende funksjoner og urørt natur?" },
    { id: "r_q40", theme: "r_tema4", text: "Er det tatt tilstrekkelige hensyn til tilgrensende funksjoner, som boliger, landbruk, rekreasjonstilbud m.m?" },
    { id: "r_q41", theme: "r_tema4", text: "Hvilke fjernvirkninger vil utvinningsanlegget ha?" },
    { id: "r_q42", theme: "r_tema4", text: "Hvilke påvirkning har tiltaket på berørte kulturminner og kulturmiljø?" },
    
    // Tema 5: Samferdsel og logistikk
    { id: "r_q43", theme: "r_tema5", text: "I hvilke grad sikres det en tilstrekkelig veistandard frem til uttaket på offentlig vei?" },
    { id: "r_q44", theme: "r_tema5", text: "Sikres det tilstrekkelig gode og sikre kryssløsninger fra uttak til offentlig vei?" },
    { id: "r_q45", theme: "r_tema5", text: "I hvilke grad sikres en hensiktsmessig standard og utforming på internt veinett?" },
    { id: "r_q46", theme: "r_tema5", text: "Er veinettet som benyttes tilstrekkelig dimensjonert for forventet trafikkøkning og bruk, da også med tanke på støy?" },
    { id: "r_q47", theme: "r_tema5", text: "Sikres det et hensiktsmessig antall parkeringsplasser?" },
    { id: "r_q48", theme: "r_tema5", text: "Sikres det tilstrekkelig kvalitet for utforming og lokalisering av parkeringsløsninger?" },
    { id: "r_q49", theme: "r_tema5", text: "I hvilke grad sikres det en tilstrekkelig sikkerhet for myke trafikanter på veinett som benyttes?" },
    { id: "r_q50", theme: "r_tema5", text: "Sikres det tilstrekkelig antall sykkelparkeringsplasser og kvalitet på disse?" },
    { id: "r_q51", theme: "r_tema5", text: "Får tiltaket tilstrekkelig kollektivdekning?" },
    
    // Tema 6: Tilbakeføring og sonedeling
    { id: "r_q52", theme: "r_tema6", text: "Er det i tilstrekkelig grad utforsket alternativer til etterbruk av området?" },
    { id: "r_q53", theme: "r_tema6", text: "Er det utarbeidet en hensiktsmessig tilbakeføringsplan som knyttes opp til og sikres i planens bestemmelser?" },
    { id: "r_q54", theme: "r_tema6", text: "Er det sikret en sonedelt gradvis tilbakeføring etterhvert som uttaket fullføres?" },
    { id: "r_q55", theme: "r_tema6", text: "Får tilbakeført område en hensiktsmessig utforming som gir et naturlig preg og er tilrettelagt for enkel etablering av tenkt etterbruksformål?" },
    { id: "r_q56", theme: "r_tema6", text: "Får området en bedre utforming og bruk som et resultat av råstoffutvinningen?" },
    { id: "r_q57", theme: "r_tema6", text: "Bevares råmateriale slik at det, i den grad det er mulig, kan brukes ved etablering av etterbruk?" },
    
    // Tema 7: Rekkefølgekrav
    { id: "r_q58", theme: "r_tema7", text: "I hvilke grad sikres rekkefølgekrav for opparbeiding av nødvendig infrastruktur for samferdsel?" },
    { id: "r_q59", theme: "r_tema7", text: "I hvilke grad sikres rekkefølgekrav for nødvendige tiltak for miljø og avrenning?" },
    { id: "r_q60", theme: "r_tema7", text: "I hvilke grad sikres rekkefølgekrav for tilbakeføring av utvinningsområder, da også sonedelt tilbakeføring?" },
    { id: "r_q61", theme: "r_tema7", text: "I hvilke grad sikres rekkefølgekrav for etablering av eventuelle terrengbuffere og andre tiltak som er ment å forhindre negative konsekvenser på omkringliggende områder?" },
    { id: "r_q62", theme: "r_tema7", text: "I hvilke grad sikres andre nødvendige rekkefølgekrav for prosjektet?" },
    
    // Tema 8: Kvalitet på plan og kunnskapsgrunnlag
    { id: "r_q63", theme: "r_tema8", text: "Foreligger det et nødvendig kunnskapsgrunnlag for å kunne sette gode rekkefølgekrav?" },
    { id: "r_q64", theme: "r_tema8", text: "Foreligger det et nødvendig kunnskapsgrunnlag for å oppnå tilstrekkelig sikkerhet for planområdet og omkringliggende områder?" },
    { id: "r_q65", theme: "r_tema8", text: "Foreligger det et nødvendig kunnskapsgrunnlag for å kunne vurdere og ivareta natur-, kultur-, og miljøinteresser?" },
    { id: "r_q66", theme: "r_tema8", text: "I hvilke grad er plankart tilstrekkelig detaljert for å sikre planens intensjoner og kvaliteter?" },
    { id: "r_q67", theme: "r_tema8", text: "I hvilke grad er bestemmelser i nødvendig grad konkrete og i nødvendig grad dekkende for å sikre planens intensjoner og kvaliteter?" },
    { id: "r_q68", theme: "r_tema8", text: "Foreligger det tilstrekkelig gode illustrasjoner og snitt som viser dagens terreng, terreng etter uttak og terreng ved etterbruk?" },
    { id: "r_q69", theme: "r_tema8", text: "Er det i stor grad samsvar mellom ikke juridiske og juridisk bindende dokumenter?" }
  ];
    
  // -------------------------------
  // Priority Multipliers
  // -------------------------------
  export const questionMultipliers = {
    // Tema 1 Egnethet
    r_q1: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q2: { Lav: 1, Normal: 1.4, Høy: 1.8, "Ikke aktuelt": 1 },
    r_q3: { Lav: 1, Normal: 1.4, Høy: 1.8, "Ikke aktuelt": 1 },
    r_q4: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q5: { Lav: 0.6, Normal: 0.8, Høy: 1, "Ikke aktuelt": 1 },
    r_q6: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q7: { Lav: 0.8, Normal: 1.1, Høy: 1.3, "Ikke aktuelt": 1 },
    r_q8: { Lav: 0.8, Normal: 1.1, Høy: 1.4, "Ikke aktuelt": 1 },
    r_q9: { Lav: 0.6, Normal: 1, Høy: 1.4, "Ikke aktuelt": 1 },
    r_q10: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q11: { Lav: 0.8, Normal: 1.1, Høy: 1.3, "Ikke aktuelt": 1 },
    r_q12: { Lav: 0.5, Normal: 0.8, Høy: 1, "Ikke aktuelt": 1 },
    r_q13: { Lav: 0.6, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q14: { Lav: 0.7, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q15: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q16: { Lav: 0.6, Normal: 0.8, Høy: 1, "Ikke aktuelt": 1 },
    r_q17: { Lav: 0.5, Normal: 0.9, Høy: 1.3, "Ikke aktuelt": 1 },
    // Tema 2 Infrastruktur og samferdsel
    r_q18: { Lav: 0.7, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q19: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q20: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q21: { Lav: 0.7, Normal: 1, Høy: 1.3, "Ikke aktuelt": 1 },
    r_q22: { Lav: 0.6, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q23: { Lav: 0.8, Normal: 1, Høy: 1.4, "Ikke aktuelt": 1 },
    r_q24: { Lav: 0.7, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q25: { Lav: 0.6, Normal: 1, Høy: 1.4, "Ikke aktuelt": 1 },
    r_q26: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q27: { Lav: 0.6, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    // Tema 3 Utforming og plassering av bygg
    r_q28: { Lav: 0.7, Normal: 1.1, Høy: 1.4, "Ikke aktuelt": 1 },
    r_q29: { Lav: 0.5, Normal: 1, Høy: 1.5, "Ikke aktuelt": 1 },
    r_q30: { Lav: 0.4, Normal: 0.8, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q31: { Lav: 0.8, Normal: 1.1, Høy: 1.4, "Ikke aktuelt": 1 },
    r_q32: { Lav: 0.8, Normal: 1, Høy: 1.4, "Ikke aktuelt": 1 },
    r_q33: { Lav: 0.6, Normal: 1, Høy: 1.3, "Ikke aktuelt": 1 },
    r_q34: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q35: { Lav: 0.5, Normal: 1, Høy: 1.4, "Ikke aktuelt": 1 },
    r_q36: { Lav: 0.5, Normal: 1, Høy: 1.3, "Ikke aktuelt": 1 },
    r_q37: { Lav: 0.5, Normal: 0.8, Høy: 1, "Ikke aktuelt": 1 },
    r_q38: { Lav: 0.6, Normal: 1, Høy: 1.4, "Ikke aktuelt": 1 },
    r_q39: { Lav: 0.6, Normal: 0.8, Høy: 1, "Ikke aktuelt": 1 },
    r_q40: { Lav: 0.6, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q41: { Lav: 0.6, Normal: 1, Høy: 1.4, "Ikke aktuelt": 1 },
    r_q42: { Lav: 0.8, Normal: 1, Høy: 1.4, "Ikke aktuelt": 1 },
    r_q43: { Lav: 0.6, Normal: 1, Høy: 1.4, "Ikke aktuelt": 1 },
    // Tema 4 Lekeplasser, natur- og grøntområder
    r_q44: { Lav: 0.6, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q45: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q46: { Lav: 0.6, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q47: { Lav: 0.9, Normal: 1.2, Høy: 1.6, "Ikke aktuelt": 1 },
    r_q48: { Lav: 0.5, Normal: 0.8, Høy: 1, "Ikke aktuelt": 1 },
    r_q49: { Lav: 0.5, Normal: 0.9, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q50: { Lav: 0.8, Normal: 1, Høy: 1.3, "Ikke aktuelt": 1 },
    r_q51: { Lav: 0.5, Normal: 0.8, Høy: 1.1, "Ikke aktuelt": 1 },
    r_q52: { Lav: 0.8, Normal: 1, Høy: 1.4, "Ikke aktuelt": 1 },
    r_q53: { Lav: 0.4, Normal: 0.7, Høy: 1, "Ikke aktuelt": 1 },
    r_q54: { Lav: 0.7, Normal: 1.1, Høy: 1.5, "Ikke aktuelt": 1 },
    // Tema 5 Barn og unges interesser
    r_q55: { Lav: 1, Normal: 1.2, Høy: 1.4, "Ikke aktuelt": 1 },
    r_q56: { Lav: 0.6, Normal: 0.8, Høy: 1, "Ikke aktuelt": 1 },
    r_q57: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q58: { Lav: 1, Normal: 1.2, Høy: 1.6, "Ikke aktuelt": 1 },
    r_q59: { Lav: 0.9, Normal: 1.1, Høy: 1.4, "Ikke aktuelt": 1 },
    r_q60: { Lav: 0.7, Normal: 0.9, Høy: 1.1, "Ikke aktuelt": 1 },
    r_q61: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q62: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q63: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q64: { Lav: 0.6, Normal: 0.8, Høy: 1, "Ikke aktuelt": 1 },
    // Tema 6 Universell utforming og tilgjengelighet
    r_q65: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q66: { Lav: 0.6, Normal: 1, Høy: 1.4, "Ikke aktuelt": 1 },
    r_q67: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q68: { Lav: 1, Normal: 1.2, Høy: 1.4, "Ikke aktuelt": 1 },
    r_q69: { Lav: 0.6, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q70: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    // Tema 7 Vann og avløp
    r_q71: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q72: { Lav: 0.6, Normal: 1, Høy: 1, "Ikke aktuelt": 1 },
    r_q73: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q74: { Lav: 0.5, Normal: 0.9, Høy: 1.1, "Ikke aktuelt": 1 },
    r_q75: { Lav: 0.6, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q76: { Lav: 0.8, Normal: 1, Høy: 1.4, "Ikke aktuelt": 1 },
    r_q77: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q78: { Lav: 0.6, Normal: 1, Høy: 1.1, "Ikke aktuelt": 1 },
    // Tema 8 Rekkefølgekrav
    r_q79: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q80: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q81: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q82: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q83: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    // Tema 9 Kvalitet på plan og kunnskapsgrunnlag
    r_q84: { Lav: 0.8, Normal: 1, Høy: 1.2, "Ikke aktuelt": 1 },
    r_q85: { Lav: 1, Normal: 1.2, Høy: 1.4, "Ikke aktuelt": 1 },
    r_q86: { Lav: 1, Normal: 1.2, Høy: 1.4, "Ikke aktuelt": 1 },
    r_q87: { Lav: 1, Normal: 1.2, Høy: 1.4, "Ikke aktuelt": 1 },
    r_q88: { Lav: 1, Normal: 1.2, Høy: 1.4, "Ikke aktuelt": 1 },
    r_q89: { Lav: 1, Normal: 1.2, Høy: 1.4, "Ikke aktuelt": 1 },
    r_q90: { Lav: 1, Normal: 1.2, Høy: 1.4, "Ikke aktuelt": 1 }
  };
  