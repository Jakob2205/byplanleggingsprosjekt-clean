import React from "react";

const FormSelector = ({ selectedForm, onSelectForm }) => {
  return (
    <div className="form-selector">
      <button
        onClick={() => onSelectForm("default")}
        className={selectedForm === "default" ? "active" : ""}
      >
        Default Form
      </button>
      <button
        onClick={() => onSelectForm("form2")}
        className={selectedForm === "form2" ? "active" : ""}
      >
        Form 2
      </button>
      {/* Add additional buttons for more forms as needed */}
    </div>
  );
};

export default FormSelector;
