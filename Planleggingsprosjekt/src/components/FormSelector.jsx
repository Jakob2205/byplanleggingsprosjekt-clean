import React from "react";

const FormSelector = ({ selectedForm, onSelectForm }) => {
  return (
    <div className="form-selector">
      <button
        onClick={() => onSelectForm("default")}
        className={selectedForm === "default" ? "active" : ""}
      >
        Boligbebyggelse Førstegangsbehandling
      </button>
      <button
        onClick={() => onSelectForm("planIn1")}
        className={selectedForm === "planIn1" ? "active" : ""}
      >
        BoligBegyggelsePlanIn
      </button>
      <button
        onClick={() => onSelectForm("form2")}
        className={selectedForm === "form2" ? "active" : ""}
      >
        RåstoffUtvinning Førstegangsbehandling
      </button>
      <button
        onClick={() => onSelectForm("planIn2")}
        className={selectedForm === "planIn2" ? "active" : ""}
      >
        RåStoffPlanIn
      </button>
    </div>
  );
};

export default FormSelector;
