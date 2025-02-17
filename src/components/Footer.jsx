import React from "react";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-row">
        <button className="footer-box export-pdf">Eksporter til PDF</button>
        <div className="footer-box planinitiatv">Planinitiativ - x,xx</div>
        <div className="footer-box horingsinnspill">Høringsinnspill - x,xx</div>
        <div className="footer-box totalverdi">Totalverdi - <span id="footerDisplayResult">0.00</span></div>
      </div>
      <div className="footer-row">
        <button className="footer-box export-word">Eksporter til Word</button>
        <div className="footer-box forstegangsbehandling">Førstegangsbehandling - x,xx</div>
        <div className="footer-box sluttbehandling">Sluttbehandling - x,xx</div>
        <button className="footer-box import-sosi">Importer SOSI-fil</button>
      </div>
    </footer>
  );
}

export default Footer;
