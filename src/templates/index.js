// src/templates/index.js
// Samler alle spørsmålssett (templates) på ett sted

import * as defaultData from "../scripts/questionData.js";
import * as boligBebyggelsePlanInData from "../scripts/boligBebyggelsePlanIn.js";
import * as råstoffUtvinningData from "../scripts/råstoffUtvinning.js";
import * as råStoffPlanInData from "../scripts/råStoffPlanIn.js";

// NØKKELEN ("default", "planIn1", "form2", "planIn2") bør matche det du allerede bruker i MainContent
export const TEMPLATES = {
  default: {
    key: "default",
    title: "Standard",
    data: defaultData,
  },
  planIn1: {
    key: "planIn1",
    title: "Boligbebyggelse – Plan inn",
    data: boligBebyggelsePlanInData,
  },
  form2: {
    key: "form2",
    title: "Råstoff – Utvinning",
    data: råstoffUtvinningData,
  },
  planIn2: {
    key: "planIn2",
    title: "Råstoff – Plan inn",
    data: råStoffPlanInData,
  },
};

export function getTemplate(key) {
  return TEMPLATES[key] ?? TEMPLATES.default;
}
