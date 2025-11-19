// Planleggingsprosjekt/src/components/MainContent.jsx
import { useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from 'prop-types'; // Import PropTypes
import { useSearchParams } from "react-router-dom";
// Firestore
import { db } from "../firebase-config"; // Correct path
import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import GenericForm from "./GenericForm";
import { PLAN_TEMPLATES } from "./plan-templates";

const ScoringQuestion = ({ question, onAnswer, answer, onPriorityChange, priority, onCommentChange, comment }) => {
  const { id, text } = question;
  const answerOptions = Array.from({ length: 11 }, (_, i) => i - 5); // -5 to 5
  const priorityOptions = [
    { label: "Lav", value: "Lav" },
    { label: "Medium", value: "Medium" },
    { label: "Høy", value: "Høy" },
    { label: "Ikke aktuell", value: "Ikke aktuell" },
  ];

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <p>{text}</p>
      <div style={{ marginTop: '5px' }}>
        <label>
          Prioritet:
          {priorityOptions.map(opt => (
            <label key={opt.value} style={{ marginLeft: '10px' }}>
              <input
                type="radio"
                name={`priority-${id}`}
                value={opt.value}
                checked={priority === opt.value}
                onChange={() => onPriorityChange(id, opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </label>
      </div>
      <div style={{ display: 'flex', marginTop: '15px' }}>
        {answerOptions.map((value) => (
          <label key={value} style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            marginRight: '20px', 
            cursor: 'pointer' 
          }}>
            {value}
            <input
              type="radio"
              name={`answer-${id}`}
              value={value}
              checked={answer === value}
              onChange={() => onAnswer(id, value)}
              style={{ marginTop: '5px' }}
            />
          </label>
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        <textarea
          placeholder="Kommentar..."
          value={comment || ''}
          onChange={(e) => onCommentChange(id, e.target.value)}
          style={{ width: '100%', minHeight: '40px', border: '1px solid #ddd', borderRadius: '4px', padding: '5px' }}
        />
      </div>
    </div>
  );
};

const MainContent = ({
  selectedPlan,
  userId,
  initialAnswers,
  formName,
  includeInTotal,
  updateFormState,
  setInitialFormData,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const formId = searchParams.get('formId');

  // ---- Hooks must be called at the top level ----
  const [collapsedThemes, setCollapsedThemes] = useState({});
  const [loading, setLoading] = useState(false);

  const planInstanceId = searchParams.get("planInstanceId");
  const instanceId = searchParams.get("instanceId");

  // ---- Memoized values and callbacks ----
  // These are safe to call unconditionally.
  // If formId or selectedPlan is missing, they will just return null/empty values.

  const answers = initialAnswers; // Use initialAnswers prop

  const handleNameChange = (e) => {
    updateFormState(formId, { formName: e.target.value });
  };

  // ---- Logic that depends on props ----

  const formInfo = useMemo(() => {
    if (!selectedPlan || !formId) return null;
    const forms = PLAN_TEMPLATES[selectedPlan]?.forms;
    if (!forms) return null;

    // Handle both array-based (old) and object-based (new) form structures
    if (Array.isArray(forms)) {
      return forms.find(f => f.key === formId) || null;
    }
    return forms[formId] || null;
  }, [selectedPlan, formId]);

  // formInfo now directly contains the full form template including questions, themes, etc.
  const formTemplate = formInfo;
  const { questions = [], themes = [], priorityMultipliers = {} } = formTemplate || {};

  const temaer = useMemo(() => {
    return (themes || []).map(theme => ({
      ...theme,
      questions: (questions || []).filter(q => q.theme === theme.id)
    }));
  }, [themes, questions]);

  const handleAnswerChange = useCallback((questionId, score) => {
    const newAnswers = {
      ...(answers || {}),
      [questionId]: { ...(answers || {})[questionId], score },
    };
    updateFormState(formId, { answers: newAnswers });
  }, [answers, updateFormState, formId]);

  const handlePriorityChange = useCallback((questionId, priority) => {
    const newAnswers = {
      ...(answers || {}),
      [questionId]: { ...(answers || {})[questionId], priority },
    };
    updateFormState(formId, { answers: newAnswers });
  }, [answers, updateFormState, formId]);

  const handleCommentChange = useCallback((questionId, comment) => {
    const newAnswers = {
      ...(answers || {}),
      [questionId]: { ...(answers || {})[questionId], comment },
    };
    updateFormState(formId, { answers: newAnswers });
  }, [answers, updateFormState, formId]);

  const getThemeScore = useCallback((theme) => {
    let total = 0;
    let answeredQuestions = 0;

    (theme.questions || []).forEach(q => {
      const answerData = answers?.[q.id];
      const priority = answerData?.priority || "Medium";

      // Only include questions that have a score and are not marked as "Ikke aktuell" in the average calculation.
      if (answers && answerData && answerData.score !== undefined && priority !== "Ikke aktuell") {
        answeredQuestions++;
        const multiplier = formTemplate.priorityMultipliers[priority] || 1;
        total += (answerData.score || 0) * multiplier; // Ensure score is a number
      }
    });

    // A theme is only active if it has at least 3 relevant, answered questions.
    if (answeredQuestions < 3) return null;

    const score = total / answeredQuestions;
    return parseFloat(Math.max(-5, Math.min(score, 5)).toFixed(2)); // Clamp score between -5 and 5
  }, [answers, formTemplate]); // This dependency array is correct, no change needed here.

  const { themeAverageScores, calculatedIncludeInTotal } = useMemo(() => {
    const scores = {};
    const newIncludeInTotal = {};
    (temaer || []).forEach((t) => {
      const themeKey = `${formId}_${t.id}`;
      scores[themeKey] = getThemeScore(t);
      newIncludeInTotal[themeKey] = scores[themeKey] !== null;
    });
    return { themeAverageScores: scores, calculatedIncludeInTotal: newIncludeInTotal };
  }, [temaer, getThemeScore, formId]); // This dependency array is also correct.

  // Auto-deaktiver tema < 3 spørsmål (trygg – kun sett state hvis noe endres)
  useEffect(() => {
    // Use the `includeInTotal` prop directly as the current state
    const currentIncludeState = includeInTotal || {};
    const next = { ...currentIncludeState };
    let changed = false;

    (temaer || []).forEach((t) => {
      const themeKey = `${formId}_${t.id}`;
      const score = themeAverageScores[themeKey]; // null eller tall
      if (score === null && currentIncludeState[themeKey] !== false) {
        next[themeKey] = false;
        changed = true;
      } else if (score !== null && !(themeKey in currentIncludeState)) {
        next[themeKey] = true;
        changed = true;
      }
    });

    // Only update if `next` is actually different from `currentIncludeState`
    // This deep comparison prevents infinite loops due to new object references with same content.
    if (changed && JSON.stringify(next) !== JSON.stringify(currentIncludeState)) {
      updateFormState(formId, { includeInTotal: next });
    }

  }, [themeAverageScores, temaer, formId, includeInTotal, updateFormState]); // Dependency array updated

  // Memoize the stringified dependencies to prevent the effect from running unnecessarily.
  const overallScoreDeps = useMemo(() => {
    return JSON.stringify({ themeAverageScores, includeInTotal });
  }, [themeAverageScores, includeInTotal]);

  // Totalverdi
  useEffect(() => {
    const activeScores = (temaer || [])
      .map((t) => `${formId}_${t.id}`)
      .filter((themeKey) => includeInTotal?.[themeKey] === true)
      .map((themeKey) => themeAverageScores[themeKey])
      .filter((s) => s !== null && s !== undefined);

    let overall = 0;
    if (activeScores.length > 0) {
      overall = activeScores.reduce((acc, s) => acc + parseFloat(s), 0) / activeScores.length;
    }
    updateFormState(formId, { score: parseFloat(Math.max(-5, Math.min(overall, 5)).toFixed(2)) });
  }, [overallScoreDeps, temaer, updateFormState, formId]); // Use the memoized dependency

  const toggleCollapse = (themeId) =>
    setCollapsedThemes((p) => {
      const themeKey = `${formId}_${themeId}`;
      return { ...p, [themeKey]: !p[themeKey] };
    });
  const toggleInclude = (themeId) =>
    {
      const themeKey = `${formId}_${themeId}`;
      const newInclude = { ...(includeInTotal || {}), [themeKey]: !(includeInTotal || {})[themeKey] };
      updateFormState(formId, { includeInTotal: newInclude });
    };

  // ==========================
  // Firestore: lasting/lagring
  // ==========================

  // Last inn eksisterende instans
  useEffect(() => {
    let mounted = true;

    async function loadInstance() {
      if (!planInstanceId) {
        setInitialFormData(formId, { formName: "", answers: {}, includeInTotal: {} });
        return;
      }
      setLoading(true);
      try {
        // Find the specific form document for the current plan instance and formId
        const q = query(
          collection(db, "forms"),
          where("planInstanceId", "==", planInstanceId),
          where("userId", "==", userId),
          where("formId", "==", formId)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const formDoc = querySnapshot.docs[0];
          const data = formDoc.data();

          if (!mounted) return;

          setInitialFormData(formId, {
            formName: data.name || "Uten navn",
            answers: data.answers || {},
            includeInTotal: data.includeInTotal || {},
          });

          // Update URL to include the correct instanceId for this form
          setSearchParams(
            (prev) => {
              prev.set("instanceId", formDoc.id);
              return prev;
            },
            { replace: true }
          );
        } else {
          // Handle case where form for this plan doesn't exist (should not happen with new logic)
          setInitialFormData(formId, { formName: "Ny plan", answers: {}, includeInTotal: {} });
        }
      } catch (e) {
        console.error("Kunne ikke laste instans:", e);
      }
      setLoading(false);
    }

    if (userId && formId) loadInstance();
    return () => {
      mounted = false;
    };
  }, [planInstanceId, formId, userId, setSearchParams, setInitialFormData]);
  
  // Generic save function to reduce duplication
  const saveForm = async (isCopy = false) => {
    try {
      if (!userId || !planInstanceId) {
        alert("Du må være logget inn for å lagre.");
        return;
      }

      const isNew = !instanceId || isCopy;
      const dataToSave = {
        name: formName || "Uten navn",
        answers: initialAnswers,
        includeInTotal,
        updatedAt: serverTimestamp(),
        userId: userId,
      };

      if (isNew) {
        // This logic path should ideally not be hit with the new "plan instance" creation model.
        // Saving should always be an update.
        alert("Kan ikke lagre et nytt skjema direkte. Opprett en ny plan først.");
      } else {
        // Update an existing document
        const batch = writeBatch(db);

        // Update the name for all forms in the same plan instance
        const q = query(
          collection(db, "forms"),
          where("planInstanceId", "==", planInstanceId),
          where("userId", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
          batch.update(doc.ref, { name: formName || "Uten navn" });
        });

        // Update the current form's answers
        await setDoc(doc(db, "forms", instanceId), dataToSave, { merge: true });

        // Commit all updates
        await batch.commit();
        alert("Endringer lagret ✅");
      }
    } catch (e) {
      console.error("Feil ved lagring:", e);
      alert(
        e?.code === "permission-denied"
          ? "Manglende rettigheter. Sjekk Firestore-reglene og at du er logget inn."
          : `Klarte ikke lagre${isCopy ? ' kopi' : ''}. Se konsoll for detaljer.`
      );
    }
  };

  // Lagre (ny / oppdater)
  const handleSave = () => saveForm(false);

  // Lagre som kopi
  const handleSaveAsCopy = () => saveForm(true);

  // ---- Conditional Rendering ----
  // This now happens after all hooks have been called.

  if (formInfo && formInfo.component === GenericForm) {
    const { component: FormComponent, ...componentProps } = formInfo;
    return (
      <FormComponent
        key={`${selectedPlan}-${formId}`}
        formId={formId}
        initialAnswers={initialAnswers}
        updateFormState={updateFormState}
        setInitialFormData={setInitialFormData}
        {...componentProps}
      />
    );
  }
  if (!formId || !formTemplate) {
    return (
      <main style={{ padding: '20px' }}>
        <h2>Velkommen</h2>
        <p>Velg en plan og et skjema fra menyen til venstre for å begynne.</p>
      </main>
    );
  }

  if (loading) {
    return <main style={{ padding: '20px' }}>Laster skjema...</main>;
  }

  return (
    <main>
      {/* Verktøylinje */}
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          padding: "8px 0 16px",
          borderBottom: "1px solid #ddd",
          marginBottom: 16,
        }}
      >
        <input
          type="text"
          placeholder="Skjemanavn (f.eks. Felt A – høst 2025)"
          value={formName}
          onChange={handleNameChange}
          style={{
            flex: 1,
            padding: "8px 10px",
            border: "1px solid #ccc",
            borderRadius: 6,
          }}
        />
        <button onClick={handleSave} disabled={!userId}>
          Lagre
        </button>
        <button onClick={handleSaveAsCopy} disabled={!userId}>
          Lagre som kopi
        </button>
        <span style={{ color: "#666", fontSize: 12 }}>
          ID: {instanceId ? instanceId : "nytt (ikke lagret)"}{" "}
          {userId ? "" : " – (ikke innlogget)"}
        </span>
      </div>

      <h2>{formTemplate.title}</h2>

      {temaer.map((theme) => {
        const themeKey = `${formId}_${theme.id}`;
        const themeScore = themeAverageScores[themeKey];
        const isIncluded = !!includeInTotal?.[themeKey];

        return (
          <div key={theme.id} className="tema">
            <div className="tema-header">
              <button
                className="collapse-button"
                onClick={() => toggleCollapse(theme.id)}
              >
                {collapsedThemes[themeKey] ? "+" : "-"}
              </button>
              <h2>{theme.title}</h2>
              <div className="theme-score">
                {themeScore !== null && typeof themeScore !== "undefined" && (
                  <span>Verdi: {themeScore.toFixed(2)}</span>
                )}
              </div>
              <label
                className="toggle-switch"
                htmlFor={`toggle-${themeKey}`}
                style={{ marginLeft: "10px" }}
              >
                <input
                  id={`toggle-${themeKey}`}
                  type="checkbox"
                  checked={isIncluded}
                  onChange={() => toggleInclude(theme.id)}
                  disabled={themeScore === null}
                />
                <span className="slider" />
              </label>
            </div>

            <div
              className="content-section"
              style={{ display: collapsedThemes[themeKey] ? "none" : "block" }}
            >
              {theme.questions.map((question) => (
                  <ScoringQuestion
                    key={question.id}
                    question={question}
                    onAnswer={handleAnswerChange}
                    answer={answers?.[question.id]?.score}
                    onPriorityChange={handlePriorityChange}
                    priority={answers?.[question.id]?.priority}
                    onCommentChange={handleCommentChange}
                    comment={answers?.[question.id]?.comment} />
                ))}
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default MainContent;

// Prop validation for MainContent
MainContent.propTypes = {
  selectedPlan: PropTypes.string.isRequired,
  userId: PropTypes.string, // userId can be null if not logged in
  initialAnswers: PropTypes.object,
  formName: PropTypes.string,
  includeInTotal: PropTypes.object,
  updateFormState: PropTypes.func.isRequired,
  setInitialFormData: PropTypes.func.isRequired,
};
