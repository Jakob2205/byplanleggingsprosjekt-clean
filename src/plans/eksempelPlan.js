// src/plans/eksempelPlan.js

/*
================================================================================
||  MAIN PLAN DEFINITION                                                      ||
||  This is the main object that gets exported. It defines the entire plan.   ||
================================================================================
*/

const eksempelPlan = {
  // 'key' must be unique for each plan file. It's used to identify the plan.
  key: 'eksempelPlan',
  // 'title' is the display name for the plan.
  title: 'Eksempel Plan',

  // 'forms' is an object containing all the different forms/stages of this plan.
  forms: {
    // The key for each form (e.g., 'planinitiativ') must match a key from 'UNIVERSAL_FORMS'
    // in 'src/constants/forms.js' to link them correctly in the UI (Header/Footer).
    planinitiativ: {
      title: 'Planinitiativ for Eksempel', // This title is shown on the form page itself.
      // --- Themes for this form ---
      themes: [
        { id: "t1", title: "Egnethet" },
        { id: "t2", title: "Forholdet foreslått bruk seg til gjeldende premisser?" },
      ],
      questions: [ // --- Questions for this form ---
        { id: "q1", theme: "t1", text: "I hvilke grad har området en god økonomisk forutsetning for å realisere et boligprosjekt?" },
        { 
          id: "q2", 
          theme: "t1", 
          text: "Hvilke påvirkning vil tiltaket ha på dyrket og dyrkbar mark?",
          // ========================================================================
          // || SPECIFIC MULTIPLIER EXAMPLE                                        ||
          // || This question has its own 'priorityMultipliers' object.            ||
          // || This OVERRIDES the general multiplier defined at the form level.   ||
          // || Here, a "Høy" priority will have a weight of 3, instead of the     ||
          // || form's default of 2. This makes this specific question more impactful.||
          // ========================================================================
          priorityMultipliers: { "Lav": 0.5, "Medium": 1, "Høy": 3, "Ikke aktuell": 0 }
        },
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
        // --- Questions for theme 2 ---
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
      ],
      // ========================================================================
      // || GENERAL MULTIPLIER                                                 ||
      // || This is the default set of multipliers for this form.              ||
      // || It applies to EVERY question in this form, UNLESS a question has   ||
      // || its own specific multiplier (like question 'q2' above).            ||
      // ========================================================================
      priorityMultipliers: {
        "Lav": 0.5,
        "Medium": 1,
        "Høy": 2,
        "Ikke aktuell": 0
      }
    },
    forstegangsbehandling: {
      title: 'Førstegangsbehandling for Eksempel',
      // --- Themes for this form ---
      themes: [
        { id: "tema1", title: "Egnethet" },
        { id: "tema2", title: "Infrastruktur og samferdsel" },
        { id: "tema3", title: "Utforming og plassering av bygg" },
        { id: "tema4", title: "Lekeplasser, natur- og grøntområder" },
        { id: "tema5", title: "Barn og unges interesser" },
        { id: "tema6", title: "Universell utforming og tilgjengelighet" },
        { id: "tema7", title: "Vann og avløp" },
        { id: "tema8", title: "Rekkefølgekrav" },
        { id: "tema9", title: "Kvalitet på plan og kunnskapsgrunnlag" },
      ],
      questions: [ // --- Questions for this form ---
        { id: "q1", theme: "tema1", text: "I hvilke grad har området en god økonomisk forutsetning for å realisere et boligprosjekt?" },
        { id: "q2", theme: "tema1", text: "Hvilke påvirkning vil tiltaket ha på dyrket og dyrkbar mark?" },
        { id: "q3", theme: "tema1", text: "Hvilke påvirkning vil tiltaket ha for urørt natur og dyreliv?" },
        { id: "q4", theme: "tema1", text: "Hvilke påvirkning vil tiltaket ha på omkringliggende områder?" },
        { id: "q5", theme: "tema1", text: "Er adkomst til området enkelt for tiltenkte brukergrupper i dag?" },
        { id: "q6", theme: "tema1", text: "I hvilke grad er nødvendige servicetilbud tilgjengelige fra området?" },
        { id: "q7", theme: "tema1", text: "I hvilke grad ligger området i tilstrekkelig nærhet til grøntstrukturer og rekreasjonsområder?" },
        { id: "q8", theme: "tema1", text: "I hvilke grad ligger prosjektet innenfor et prioritert vekstområde?" },
        { id: "q9", theme: "tema1", text: "Hvordan kan en utbygging påvirke kulturminner og kulturmiljø?" },
        { id: "q10", theme: "tema1", text: "Dersom området skal transformeres, i hvilke grad er området modent for en transformasjon?" },
        { id: "q11", theme: "tema1", text: "I hvilke grad egner området seg for boligbebyggelse kontra andre arealformål, da også nullalternativ?" },
        { id: "q12", theme: "tema1", text: "Er utgangspunktet godt for å oppnå gode støyforhold?" },
        { id: "q13", theme: "tema1", text: "Er utgangspunktet godt for å oppnå gode sol- og lysforhold?" },
        { id: "q14", theme: "tema1", text: "Har tiltenkt område god tilknytning til nødvendig grad av kollektivtrafikk?" },
        { id: "q15", theme: "tema1", text: "I hvilke grad kan transport til planområdet løses med sykkel, gange og kollektivtrafikk fremfor bil?" },
        { id: "q16", theme: "tema1", text: "Har terreng et godt utgangspunkt for å oppnå god tilgjengelighet?" },
        { id: "q17", theme: "tema1", text: "Har terreng et godt utgangspunkt for å realisere et boligprosjekt med tilhørende funksjoner?" },
    
        // Tema 2 Infrastruktur og samferdsel
        { id: "q18", theme: "tema2", text: "I hvilke grad sikres det en tilstrekkelig veistandard til boligene fra omkringliggende områder og målpunkt?" },
        { id: "q19", theme: "tema2", text: "I hvilke grad sikres gode løsninger på infrastruktur for myke trafikanter fra boligene til målpunkt, servicetilbud og grøntstrukturer?" },
        { id: "q20", theme: "tema2", text: "Får interne bevegelseslinjer for myke trafikanter tilstrekkelig kvalitet med tanke på utforming, plassering, tiltenkt bruk og sikkerhet?" },
        { id: "q21", theme: "tema2", text: "Er interne bevegelseslinjer for myke trafikanter tilstrekkelig prioritert for å skape logiske og attraktive traseer?" },
        { id: "q22", theme: "tema2", text: "Sikres det et hensiktsmessig antall parkeringsplasser?" },
        { id: "q23", theme: "tema2", text: "Sikres det tilstrekkelig kvalitet for utforming og lokalisering av parkeringsløsninger?" },
        { id: "q24", theme: "tema2", text: "Sikres det tilstrekkelig antall sykkelparkeringsplasser?" },
        { id: "q25", theme: "tema2", text: "Sikres det tilstrekkelig kvalitet med tanke på utforming og lokalisering av sykkelparkeringsplasser?" },
        { id: "q26", theme: "tema2", text: "I hvilke grad får boligene en hensiktsmessig kollektivdekning?" },
        { id: "q27", theme: "tema2", text: "I hvilken grad er kollektivtilbud tilgjengelig og attraktiv som transportvalg?" },
    
        // Tema 3 Utforming og plassering av bygg
        { id: "q28", theme: "tema3", text: "Sikres det en god estetisk kvalitet?" },
        { id: "q29", theme: "tema3", text: "Hvilken påvirkning vil byggverks utforming og estetiske kvaliteter ha for tilgrensende områder, deriblant også sol- og lysforhold?" },
        { id: "q30", theme: "tema3", text: "Hvilke fjernvirkninger vil bygg gi?" },
        { id: "q31", theme: "tema3", text: "Har planen en hensiktsmessig utnyttelsesgrad ut fra områdets tåleevne?" },
        { id: "q32", theme: "tema3", text: "Har planen en hensiktsmessig utnyttelsesgrad gitt plassering og tilpasning til omkringliggende bebyggelse?" },
        { id: "q33", theme: "tema3", text: "Har man lagt til rette for en hensiktsmessig utnytting gitt planlagt fremtidig bruk av tilgrensende områder?" },
        { id: "q34", theme: "tema3", text: "Er planlagte bygg godt tilpasset eksisterende landskap og bebyggelse?" },
        { id: "q35", theme: "tema3", text: "Er det sikret en variert og hensiktsmessig boenhetsfordeling med tanke på størrelser?" },
        { id: "q36", theme: "tema3", text: "Ser boenheter ut til å få en god kvalitet og funksjonalitet?" },
        { id: "q37", theme: "tema3", text: "Sikres gode private uteoppholdsareal tilknyttet boenhetene?" },
        { id: "q38", theme: "tema3", text: "I hvilke grad har planen en riktig boligtetthet og boligsammensetning basert på planområdets plassering?" },
        { id: "q39", theme: "tema3", text: "I hvilke grad er det tenkt på og avsatt areal til nødvendige servicebygg som f.eks. trafo?" },
        { id: "q40", theme: "tema3", text: "Sikres det i nødvendig grad felles innendørs oppholdsareal av god kvalitet med hensiktsmessige funksjoner?" },
        { id: "q41", theme: "tema3", text: "Oppnås det et godt samspill mellom bygg og andre funksjoner som parkering og uteoppholdsareal?" },
        { id: "q42", theme: "tema3", text: "I hvilke grad er bygg plassert slik at man oppnår et godt samspill med andre bygg, uteareal, naturelementer, traseer, overvannsløsninger osv.?" },
        { id: "q43", theme: "tema3", text: "I hvilke grad sikres material- og fargevalg av god kvalitet?" },
    
        // Tema 4 Natur- og grøntområder
        { id: "q44", theme: "tema4", text: "Settes det av nødvendige landskaps- og terrengbuffere mot tilgrensende funksjoner og urørt natur?" },
        { id: "q45", theme: "tema4", text: "Har man beholdt eksisterende natur- og landskapsdrag, terrengformasjoner, trær og vann i dagen med særlig verdi?" },
        { id: "q46", theme: "tema4", text: "Har man uavhengig av naturverdi beholdt tilstrekkelig med naturelementer og områder som ikke bearbeides?" },
        { id: "q47", theme: "tema4", text: "Er det avsatt gode grøntområder med tanke på plassering, kvalitet og funksjon?" },
        { id: "q48", theme: "tema4", text: "Sikres en hensiktsmessig opparbeiding og beplantning av arealene?" },
        { id: "q49", theme: "tema4", text: "Er det gode synergier mellom overvanns- og flomhåndtering og grøntområder?" },
        { id: "q50", theme: "tema4", text: "I hvilke grad oppnår planen en god balanse mellom private, halvprivate og offentlige areal?" },
        { id: "q51", theme: "tema4", text: "Har man utredet og beholdt eventuelle stier og grøntdrag som går gjennom planområdet?" },
        { id: "q52", theme: "tema4", text: "Skapes det gode og naturlige bevegelseslinjer gjennom planområdet, som i nødvendig grad kan brukes av alle?" },
        { id: "q53", theme: "tema4", text: "Er det sikret tilstrekkelig belysning i traseer som etableres gjennom planområdet?" },
        { id: "q54", theme: "tema4", text: "Foreligger det rødlistede arter innenfor planområdet, og hvordan ivaretas disse?" },
    
        // Tema 5 Barn og unges interesser
        { id: "q55", theme: "tema5", text: "Er det avsatt tilstrekkelige uteareal til barn og unge som er tilgjengelige for alle?" },
        { id: "q56", theme: "tema5", text: "Får eventuelle private uteoppholdsareal gode premisser for bruk av barn og unge?" },
        { id: "q57", theme: "tema5", text: "Sikres viktige natur- og terrengformasjoner som kan være attraktive for barn og unge?" },
        { id: "q58", theme: "tema5", text: "Sikres det gode lekeplasser og grøntområder med tanke på størrelse, varierte funksjoner og lek?" },
        { id: "q59", theme: "tema5", text: "Gis arealene en attraktiv plassering med gode støy- og lysforhold?" },
        { id: "q60", theme: "tema5", text: "Sikres sittegrupper og voksenfunksjoner som kan kombineres med lek?" },
        { id: "q61", theme: "tema5", text: "Sikres sammenhengende bevegelseslinjer til målpunkt som er trafikksikre og attraktive?" },
        { id: "q62", theme: "tema5", text: "Oppnås det tilstrekkelig trafikksikkerhet utad og internt i planområdet?" },
        { id: "q63", theme: "tema5", text: "Oppnås det tilstrekkelig sikkerhet for å unngå uønsket og farlig bruk av barn og unge?" },
        { id: "q64", theme: "tema5", text: "Er det sikret tilstrekkelig belysning i traseer som etableres gjennom planområdet?" },
    
        // Tema 6 Universell utforming og tilgjengelighet
        { id: "q65", theme: "tema6", text: "Er området tilgjengelig og forståelig for myke trafikanter med funksjonsnedsettelser?" },
        { id: "q66", theme: "tema6", text: "I hvilke grad legges det til rette for alle aldersgrupper og familiesammensetninger?" },
        { id: "q67", theme: "tema6", text: "Er det sikret gode leke- og uteoppholdsmuligheter for mennesker med funksjonsvariasjoner?" },
        { id: "q68", theme: "tema6", text: "Sikres det et hensiktsmessig antall UU- og tilgjengelige boliger?" },
        { id: "q69", theme: "tema6", text: "Er det gjort en analyse av tiltak som bør gjøres for å oppnå tilgjengelighet for prosjektet?" },
        { id: "q70", theme: "tema6", text: "Er det utarbeidet konkrete bestemmelser for å oppnå UU der det er nødvendig?" },
    
        // Tema 7 Vann og avløp
        { id: "q71", theme: "tema7", text: "I hvilke grad sikres det at overvann håndteres internt på planområdet og at tiltaket ikke øker påkjenningen på tilgrensende områder?" },
        { id: "q72", theme: "tema7", text: "I hvilken grad forbedres overvannssituasjonen i forhold til dagens situasjon?" },
        { id: "q73", theme: "tema7", text: "I hvilke grad er løsninger for overvann prosjektert og gjennomførbare?" },
        { id: "q74", theme: "tema7", text: "I hvilke grad brukes overvannssystemer for å oppnå synergier med natur og grøntområder?" },
        { id: "q75", theme: "tema7", text: "Sikres nødvendige flomveier, og får de en funksjon utover at de er flomveier?" },
        { id: "q76", theme: "tema7", text: "I hvilke grad har planen fokus på permeable flater, grønne tak m.m.?" },
        { id: "q77", theme: "tema7", text: "I hvilke grad er nødvendige traseer for vann- og avløpsledninger kartlagt? Hvilke konsekvenser vil etablering av ledningsnettet ha for området?" },
        { id: "q78", theme: "tema7", text: "Får vann- og avløpsledninger nødvendige dimensjoner til å sikre en helhetlig utvikling?" },
    
        // Tema 8 Rekkefølgekrav
        { id: "q79", theme: "tema8", text: "I hvilke grad sikres rekkefølgekrav for nødvendig omkringliggende infrastruktur gjennom planen?" },
        { id: "q80", theme: "tema8", text: "I hvilke grad sikres rekkefølgekrav for nødvendig infrastruktur for vann, overvann og flom?" },
        { id: "q81", theme: "tema8", text: "I hvilke grad sikres rekkefølgekrav for nødvendige grøntområder, grøntdrag, lekeplasser m.m.?" },
        { id: "q82", theme: "tema8", text: "I hvilke grad sikres rekkefølgekrav for ønsket utbyggingsrekkefølge?" },
        { id: "q83", theme: "tema8", text: "I hvilke grad sikres andre nødvendige rekkefølgekrav for prosjektet?" },
    
        // Tema 9 Kvalitet på plan og kunnskapsgrunnlag
        { id: "q84", theme: "tema9", text: "Foreligger det et nødvendig kunnskapsgrunnlag for å kunne sette gode rekkefølgekrav?" },
        { id: "q85", theme: "tema9", text: "Foreligger det et nødvendig kunnskapsgrunnlag for å oppnå tilstrekkelig sikkerhet for planområdet og omkringliggende områder?" },
        { id: "q86", theme: "tema9", text: "Foreligger det et nødvendig kunnskapsgrunnlag for å kunne vurdere og ivareta natur-, kultur- og miljøinteresser?" },
        { id: "q87", theme: "tema9", text: "Foreligger det et nødvendig kunnskapsgrunnlag for å kunne vurdere en helhetlig utvikling av feltet og omkringliggende områder?" },
        { id: "q88", theme: "tema9", text: "I hvilke grad er plankart tilstrekkelig detaljert for å sikre planens intensjoner og kvaliteter?" },
        { id: "q89", theme: "tema9", text: "I hvilke grad er bestemmelser konkrete og dekkende for å sikre planens intensjoner og kvaliteter?" },
        { id: "q90", theme: "tema9", text: "Er det samsvar mellom ikke-juridiske og juridisk bindende dokumenter og illustrasjoner?" }
      ],
      // This form also has its own general multipliers.
      priorityMultipliers: {
        "Lav": 0.5,
        "Medium": 1,
        "Høy": 2,
        "Ikke aktuell": 0
      }
    },
    // --- Other forms can be added here, following the same structure ---
    casestudie: {
      title: 'Casestudie for Eksempel',
      themes: [
        { id: 'general', title: 'Generelt' }
      ],
      questions: [
        { id: 'caseDescription', text: 'Vurder kvaliteten på casestudien', theme: 'general' }
      ],
      priorityMultipliers: { "Lav": 0.5, "Medium": 1, "Høy": 2, "Ikke aktuell": 0 },
    },
    'politisk-skjema': {
      title: 'Politisk skjema for Eksempel',
      themes: [
        { id: 'general', title: 'Generelt' }
      ],
      questions: [
        { id: 'politicalSummary', text: 'Vurder kvaliteten på politisk behandling og vedtak', theme: 'general' }
      ],
      priorityMultipliers: { "Lav": 0.5, "Medium": 1, "Høy": 2, "Ikke aktuell": 0 },
    },
    medvirkningskjema: {
      title: 'Medvirkningskjema for Eksempel',
      themes: [
        { id: 'general', title: 'Generelt' }
      ],
      questions: [
        { id: 'participationSummary', text: 'Vurder kvaliteten på oppsummering av medvirkning', theme: 'general' }
      ],
      priorityMultipliers: { "Lav": 0.5, "Medium": 1, "Høy": 2, "Ikke aktuell": 0 },
    },
    sluttbehandling: {
      title: 'Sluttbehandling for Eksempel',
      themes: [
        { id: 'legal_final', title: 'Juridisk og formelt' },
        { id: 'infrastructure_final', title: 'Infrastruktur' },
        { id: 'general_final', title: 'Generelt' },
      ],
      questions: [
        { id: 'legalReqsMet', text: 'I hvilken grad er alle juridiske krav oppfylt?', theme: 'legal_final' },
        { id: 'infraComplete', text: 'I hvilken grad er infrastruktur ferdigstilt og godkjent?', theme: 'infrastructure_final' },
        { id: 'finalCertIssued', text: 'I hvilken grad er ferdigattest utstedt?', theme: 'legal_final' },
        { id: 'finalComments', text: 'Vurder kvaliteten på avsluttende kommentarer', theme: 'general_final' },
      ],
      priorityMultipliers: { "Lav": 0.5, "Medium": 1, "Høy": 2, "Ikke aktuell": 0 },
    },
  }
};

export default eksempelPlan;