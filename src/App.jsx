// Planleggingsprosjekt/src/App.jsx
import { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import Login from "./components/Login";

import "./styles/main.css";
import "./styles/app.css";
import { PLAN_TEMPLATES } from "./components/plan-templates";

// ✅ Import everything from the context, including RequireAuth
import { AuthProvider, useAuth, RequireAuth } from "./context/AuthContext";

function MainLayout() {
  const [selectedPlan, setSelectedPlan] = useState(Object.keys(PLAN_TEMPLATES)[0] || "");
  const { user } = useAuth(); // Firebase user
  const [searchParams] = useSearchParams();
  const planInstanceId = searchParams.get("planInstanceId");

  // Lifted state for all forms within a plan instance
  const [planData, setPlanData] = useState({
    scores: {},
    answers: {},
    formNames: {},
    includeInTotals: {},
  });

  // Reset plan data when the plan instance changes
  useEffect(() => {
    setPlanData({
      scores: {},
      answers: {},
      formNames: {},
      includeInTotals: {},
    });
  }, [planInstanceId]);

  const updateFormState = useCallback((formId, newState) => {
    setPlanData(prev => ({
      scores: { ...prev.scores, ...newState.score && { [formId]: newState.score } },
      answers: { ...prev.answers, ...newState.answers && { [formId]: newState.answers } },
      formNames: { ...prev.formNames, ...newState.formName && { [formId]: newState.formName } },
      includeInTotals: { ...prev.includeInTotals, ...newState.includeInTotal && { [formId]: newState.includeInTotal } },
    }));
  }, []);

  const setInitialFormData = useCallback((formId, data) => {
    updateFormState(formId, data);
  }, [updateFormState]);

  const formId = searchParams.get("formId");

  return (
    <div className="app-container" style={{
      display: 'grid',
      gridTemplateColumns: '250px 1fr',
      gridTemplateRows: 'auto 1fr auto',
      gridTemplateAreas: `
        "header header"
        "sidebar main"
        "sidebar footer"
      `,
      height: '100vh',
      overflow: 'hidden'
    }}>
      <div className="header-area" style={{ gridArea: 'header' }}>
        <Header selectedPlanKey={selectedPlan} />
      </div>
      <div className="sidebar-area" style={{ gridArea: 'sidebar', overflowY: 'auto' }}>
        <Sidebar
          selectedPlan={selectedPlan}
          onSelectPlan={setSelectedPlan}
          userId={user?.uid}
        />
      </div>
      <div className="main-content-area" style={{ gridArea: 'main', overflowY: 'auto', padding: '20px' }}>
        <MainContent
          selectedForm={formId} // Pass formId from URL to MainContent
          userId={user?.uid}
          // Pass lifted state and handlers down
          answers={planData.answers[formId]}
          formName={planData.formNames[formId]}
          includeInTotal={planData.includeInTotals[formId]}
          updateFormState={updateFormState}
          setInitialFormData={setInitialFormData}
        />
      </div>
      <div className="footer-area" style={{ gridArea: 'footer' }}>
        <Footer formScores={planData.scores} planTemplate={PLAN_TEMPLATES[selectedPlan]} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <MainLayout />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
