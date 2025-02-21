// **Question Data**
export const themes = [
    { id: "tema1", title: "Boligbebyggelse" },
    { id: "tema2", title: "Kulturminner" }
];

// **Question List**
export const questions = [
    { id: "q1", theme: "tema1", text: "Er planområdet tilstrekkelig dekket av nødvendige servicetilbud?" },
    { id: "q2", theme: "tema1", text: "Planens påvirkningsgrad på nødtjenester?" },
    { id: "q3", theme: "tema1", text: "Er planområdet designet bra" },
    { id: "q4", theme: "tema1", text: "Planens påvirkningsgrad på trafikk?" },
    { id: "q5", theme: "tema1", text: "Planens påvirkningsgrad på omkringliggende kulturminner og kulturmiljø?" },
    { id: "q6", theme: "tema2", text: "Påvirkning på nærliggende kulturarv?" },
    { id: "q7", theme: "tema2", text: "Påvirkning av kollektivtrafikk?" },
    { id: "q8", theme: "tema2", text: "Annen relevant påvirkning?" }
];

// **Priority Multipliers (Unique per Question)**
export const questionMultipliers = {
    q1: { Lav: 1, Normal: 1.3, Høy: 1.8, "Ikke aktuelt": 1 },
    q2: { Lav: 1, Normal: 1.2, Høy: 1.7, "Ikke aktuelt": 1 },
    q3: { Lav: 1, Normal: 1.4, Høy: 1.9, "Ikke aktuelt": 1 },
    q4: { Lav: 1.2, Normal: 1.7, Høy: 2.1, "Ikke aktuelt": 1 },
    q5: { Lav: 1.2, Normal: 1.7, Høy: 2.1, "Ikke aktuelt": 1 },
    q6: { Lav: 1.2, Normal: 1.7, Høy: 2.1, "Ikke aktuelt": 1 },
    q7: { Lav: 1.2, Normal: 1.7, Høy: 2.1, "Ikke aktuelt": 1 },
    q8: { Lav: 1.2, Normal: 1.7, Høy: 2.1, "Ikke aktuelt": 1 }
};
