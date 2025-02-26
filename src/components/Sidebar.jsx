import React from "react";
import FormSelector from "./FormSelector"; // Adjust the path as needed

const Sidebar = ({ selectedForm, onSelectForm }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        {/* Render the FormSelector here */}
        <FormSelector selectedForm={selectedForm} onSelectForm={onSelectForm} />
      </div>
      <div className="sidebar-bottom">
        Arkiv
      </div>
    </aside>
  );
};

export default Sidebar;
