import React from "react";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h3>Mine Planer</h3>
      <ul id="planList"></ul>
      <button id="newPlanButton">+ Ny plan</button>
    </aside>
  );
}

export default Sidebar;
