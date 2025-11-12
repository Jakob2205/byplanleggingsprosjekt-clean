// Dynamically import all files from the 'plans' directory.
// The `eager: true` option makes sure all modules are loaded at once.
const modules = import.meta.glob('../plans/*.js', { eager: true });

export const PLAN_TEMPLATES = {};

for (const path in modules) {
  const plan = modules[path].default;
  if (plan && plan.key) {
    PLAN_TEMPLATES[plan.key] = plan;
  }
}