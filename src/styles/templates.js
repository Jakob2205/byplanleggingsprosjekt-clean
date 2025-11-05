// src/templates.js

export const TEMPLATES = {
  forstegangsbehandling: {
    key: "forstegangsbehandling",
    title: "Førstegangsbehandling",
    temaer: [
      {
        id: "tema-1-forstegang",
        title: "Generell Informasjon",
        questions: [
          {
            id: "q-1-1",
            text: "Hva er planens hovedmål?",
            type: "text",
          },
          {
            id: "q-1-2",
            text: "Er det foretatt en foreløpig vurdering av virkninger?",
            type: "boolean",
          },
        ],
      },
    ],
  },
  planinitiativ: {
    key: "planinitiativ",
    title: "Planinitiativ",
    temaer: [
      {
        id: "tema-1-planinitiativ",
        title: "Initiativdetaljer",
        questions: [
          {
            id: "q-2-1",
            text: "Hvem er forslagsstiller?",
            type: "text",
          },
          {
            id: "q-2-2",
            text: "Beskriv kort bakgrunnen for initiativet.",
            type: "textarea",
          },
        ],
      },
      {
        id: "tema-2-planinitiativ",
        title: "Område og Omfang",
        questions: [
          {
            id: "q-2-3",
            text: "Spesifiser planområdets avgrensning.",
            type: "text",
          },
        ],
      },
    ],
  },
  sluttbehandling: {
    key: "sluttbehandling",
    title: "Sluttbehandling",
    temaer: [
      {
        id: "tema-1-slutt",
        title: "Vedtak og Konklusjon",
        questions: [
          {
            id: "q-3-1",
            text: "Oppsummer eventuelle endringer siden førstegangsbehandling.",
            type: "textarea",
          },
          {
            id: "q-3-2",
            text: "Er planen vedtatt?",
            type: "boolean",
          },
        ],
      },
    ],
  },
};