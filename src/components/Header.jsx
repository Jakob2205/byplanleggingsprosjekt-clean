// src/components/Header.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/header.css";

const universalForms = [
   { key: "planinitiativ", title: "Planinitiativ" },
  { key: "forstegangsbehandling", title: "Førstegangsbehandling" },
  { key: "casestudie", title: "Casestudie" },
  { key: "politisk-skjema", title: "Politisk skjema" },
  { key: "medvirkningskjema", title: "Medvirkningskjema" },
  { key: "sluttbehandling", title: "Sluttbehandling" },
];

const Header = ({ selectedForm, onSelectForm }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout(); // ✅ Use the logout function from context
      console.log("User logged out");
    } catch (error) {
      console.error("Logout error:", error.message);
      alert(`Error: ${error.message}`);
    }
  };
  return (
    <header className="header-container">
      <h1>Plansikt</h1>

      <div className="tabs">
        {universalForms.map((form) => (
          <button
            key={form.key}
            className={`tab-button ${selectedForm === form.key ? "active" : ""}`}
            onClick={() => onSelectForm(form.key)}
          >
            {form.title}
          </button>
        ))}
      </div>

      {/* Show logout button only if logged in */}
      {user && (
        <button className="logout-button" onClick={handleLogout}>
          Logg ut
        </button>
      )}
    </header>
  );
};

export default Header;
