// Planleggingsprosjekt/src/App.jsx
import { useState, useCallback, useEffect } from "react";
import {
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom"; // No change needed here
import { useSearchParams } from "react-router-dom"; // No change needed here

import { HashRouter as Router } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const planInstanceId = searchParams.get("planInstanceId");

  // Lifted state for all forms within a plan instance
  const [planData, setPlanData] = useState({
    scores: {},
    answers: {},
    formNames: {},
    includeInTotals: {},
  });

  // Reset plan data ONLY when switching to a NEW plan instance.
  useEffect(() => {
    // This effect now correctly clears data only when the planInstanceId changes from one ID to another.
    // It will not run on the initial load or when the ID is null.
    return () => {
      setPlanData({
        scores: {},
        answers: {},
        formNames: {},
        includeInTotals: {},
      });
    };
  }, [planInstanceId]);

  const updateFormState = useCallback((formId, newState) => {
    setPlanData(prev => {
      const newScores = newState.score !== undefined ? { ...prev.scores, [formId]: newState.score } : prev.scores;
      const newAnswers = newState.answers ? { ...prev.answers, [formId]: newState.answers } : prev.answers;
      const newFormNames = newState.formName ? { ...prev.formNames, [formId]: newState.formName } : prev.formNames;
      const newIncludeInTotals = newState.includeInTotal ? { ...prev.includeInTotals, [formId]: newState.includeInTotal } : prev.includeInTotals;
      return { scores: newScores, answers: newAnswers, formNames: newFormNames, includeInTotals: newIncludeInTotals };
    });
  }, []); // Empty dependency array makes this function stable

  const setInitialFormData = useCallback((formId, data) => {
    updateFormState(formId, data);
  }, [updateFormState]);

  const formId = searchParams.get("formId");

  const handleSelectForm = (formKey) => {
    if (planInstanceId) {
      setSearchParams({ planInstanceId, formId: formKey });
    } else {
      // Optional: handle case where no plan is selected.
      // Maybe show a notification to select a plan first.
    }
  };

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
        <Header selectedForm={formId} onSelectForm={handleSelectForm} />
      </div>
      <div className="sidebar-area" style={{ gridArea: 'sidebar', overflowY: 'auto' }}>
        <Sidebar
          selectedPlan={selectedPlan}
          onSelectPlan={setSelectedPlan}
          userId={user?.uid}
        />
      </div>
      <div className="main-content-area" style={{ gridArea: 'main', overflowY: 'auto', padding: '20px' }}>
        {formId ? (
          <MainContent
            selectedForm={formId} // Pass formId from URL to MainContent
            selectedPlan={selectedPlan} // Pass selectedPlan to MainContent
            userId={user?.uid}
            // Pass lifted state and handlers down
            initialAnswers={planData.answers[formId] || {}}
            formName={planData.formNames[formId]}
            includeInTotal={planData.includeInTotals[formId]}
            updateFormState={updateFormState}
            setInitialFormData={setInitialFormData}
          />
        ) : (
          <div>Please select a plan and a form to continue.</div>
        )}
      </div>
      <div className="footer-area" style={{ gridArea: 'footer' }}>
        <Footer formScores={planData.scores} planTemplate={PLAN_TEMPLATES[selectedPlan]} />
      </div>
    </div>
  );
}

function Root() {
  const auth = useAuth();
  return <Navigate to={auth.user ? "/plans" : "/login"} replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/plans"
            element={
              <RequireAuth>
                <MainLayout />
              </RequireAuth>
            }
          />
          {/* The Root component handles the initial redirect */}
          <Route path="/" element={<Root />} />
          <Route path="*" element={<Navigate to="/plans" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
