// components/Footer.jsx
import React, { useMemo } from "react";
import { UNIVERSAL_FORMS } from "../constants/forms";

const Footer = ({ formScores, planTemplate }) => {
  const totalScore = Object.values(formScores).reduce((sum, score) => sum + (score || 0), 0);

  // Handle both array-based (old) and object-based (new) form structures
  const forms = useMemo(() => {
    if (!planTemplate?.forms) return [];
    if (Array.isArray(planTemplate.forms)) {
      return planTemplate.forms; // Old structure
    }
    // New structure: convert object to array
    return Object.entries(planTemplate.forms).map(([key, value]) => ({ key, ...value }));
  }, [planTemplate]);

  // Create a lookup map for universal titles for better performance
  const universalTitles = useMemo(() => 
    UNIVERSAL_FORMS.reduce((acc, form) => {
      acc[form.key] = form.title;
      return acc;
    }, {}), []);

  return (
    <footer style={{ padding: '12px', borderTop: '1px solid #ddd', background: '#f8f8f8', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>
        Totalverdi: {totalScore.toFixed(2)}
      </div>
      {forms.map(form => (
        <div key={form.key}>
          {universalTitles[form.key] || form.title}: {(formScores[form.key] || 0).toFixed(2)}
        </div>
      ))}
    </footer>
  );
};

export default Footer;
