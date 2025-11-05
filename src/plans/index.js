// src/plans/index.js
import { boligbebyggelsePlan } from './boligbebyggelse';
// import { næringsbyggPlan } from './næringsbygg'; // When you add more

const plans = {
  boligbebyggelse: boligbebyggelsePlan,
  // næringsbygg: næringsbyggPlan,
};

export const getPlanById = (id) => plans[id];

export default plans;
