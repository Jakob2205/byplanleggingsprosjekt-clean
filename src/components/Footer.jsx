// components/Footer.jsx
import React, { useState } from "react";

const Footer = ({ totalScore }) => {
  // Local state to control whether the footer content is collapsed.
  const [collapsed, setCollapsed] = useState(false);

  return (
    <footer className="footer-container">
      {/* Toggle button to collapse/expand the footer */}
      <div className="footer-toggle">
        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "Expand Footer" : "Collapse Footer"}
        </button>
      </div>
      {!collapsed && (
        <>
          <div className="footer-row">
            <button className="footer-box export-pdf">Eksporter til PDF</button>
            <div className="footer-box planinitiatv">Planinitiativ - x,xx</div>
            <div className="footer-box horingsinnpill">Høringsinnspill - x,xx</div>
            <div className="footer-box totalverdi">
              Totalverdi - <span>{totalScore}</span>
            </div>
          </div>
          <div className="footer-row">
            <button className="footer-box export-word">Eksporter til Word</button>
            <div className="footer-box forstegangsbehandling">
              Førstegangsbehandling - x,xx
            </div>
            <div className="footer-box sluttbehandling">
              Sluttbehandling - x,xx
            </div>
            <button className="footer-box import-sosi">Importer SOSI-fil</button>
          </div>
        </>
      )}
    </footer>
  );
};

export default Footer;
