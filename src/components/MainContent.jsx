import React, { useEffect } from "react";
import { toggleValueButton, setPriorityButton, updateThemeScores } from "../scripts/Buttonfunctionality";
import { renderQuestions } from "../scripts/questions";

function MainContent() {
  useEffect(() => {
    renderQuestions(); // Load questions when component mounts
  }, []);

  return (
    <main>
      <section className="tema" data-tema-id="tema1">
        <div className="tema-header">
          <h2>Tema 1: Boligbebyggelse</h2>
          <button className="collapse-button">-</button>
          <div className="temascore-display">
            Temascore: <span className="tema-score-value">0.00</span>
          </div>
        </div>
        <div className="content-section">
          <button className="value-button" onClick={(e) => toggleValueButton(e.target)}>1</button>
          <button className="priority-button" onClick={(e) => setPriorityButton(e.target)}>Høy</button>
        </div>
      </section>
    </main>
  );
}

export default MainContent;
