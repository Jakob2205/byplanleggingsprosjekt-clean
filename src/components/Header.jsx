// src/components/Header.jsx
import React from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PLAN_TEMPLATES } from "./plan-templates";
import "../styles/header.css";

const Header = ({ selectedPlanKey }) => {
  const { user, logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const planInstanceId = searchParams.get("planInstanceId");
  const activeFormId = searchParams.get("formId");

  const planTemplate = PLAN_TEMPLATES[selectedPlanKey];

  const handleLogout = async () => {
    try {
      await logout(); // ✅ Use the logout function from context
      console.log("User logged out");
    } catch (error) {
      console.error("Logout error:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  const handleFormSelect = (formId) => {
    setSearchParams({ planInstanceId, formId });
  };

  return (
    <header className="header-container">
      <h1>Plansikt</h1>

      {planTemplate && (
        <div className="tabs">
          {planTemplate.forms.map((form) => (
            <button
              key={form.key}
              className={`tab-button ${form.key === activeFormId ? "active" : ""}`}
              onClick={() => handleFormSelect(form.key)}
              disabled={!planInstanceId}
            >
              {form.title}
            </button>
          ))}
        </div>
      )}

      {user && (
        <div className="header-actions">
          <button className="logout-button" onClick={handleLogout}>
            Logg ut
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
