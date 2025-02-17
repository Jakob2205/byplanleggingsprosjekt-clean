import React from "react";

function Header() {
  return (
    <header className="header-container">
      <h1>Planoversikt - Instans/Firma - Brukernavn</h1>
      <div className="tabs">
        <div>Casestudie</div>
        <div>Planinitiativ</div>
        <div>Førstegangsbehandling</div>
        <div>Politisk skjema</div>
        <div>Medvirkningsskjema</div>
        <div>Sluttbehandling</div>
      </div>
      <button className="logout-button">Logout</button>
    </header>
  );
}

export default Header;
