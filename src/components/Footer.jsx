// components/Footer.jsx
import React from 'react';

const Footer = ({ formScores, planTemplate }) => {
  const totalScore = Object.values(formScores).reduce((sum, score) => sum + (score || 0), 0);

  return (
    <footer style={{ padding: '12px', borderTop: '1px solid #ddd', background: '#f8f8f8', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold' }}>
        Totalverdi: {totalScore.toFixed(2)}
      </div>
      {planTemplate?.forms?.map(form => (
        <div key={form.key}>
          {form.title}: {(formScores[form.key] || 0).toFixed(2)}
        </div>
      ))}
    </footer>
  );
};

export default Footer;
