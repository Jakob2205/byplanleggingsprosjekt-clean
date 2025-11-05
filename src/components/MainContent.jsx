// Planleggingsprosjekt/src/components/MainContent.jsx
import { useState, useEffect, useCallback, useMemo } from "react";
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
import { PLAN_TEMPLATES } from "./plan-templates";

const MainContent = ({ updateTotalScore, selectedForm, userId }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const formTemplate = useMemo(() => {
    if (!selectedForm) return null;
    for (const planKey in PLAN_TEMPLATES) {
      const form = PLAN_TEMPLATES[planKey].forms.find(f => f.key === selectedForm);
      if (form) return form;
    }
    return null;
  }, [selectedForm]);

  // This part of your code seems to be from an older structure. I'll adapt it.
  const formData = formTemplate || { temaer: [], questions: [] };

  const resolvedMultipliers = formData.questionMultipliers || {};

  // Memoize questions and themes to prevent re-creation on every render
  const { questions, themes } = useMemo(() => {
    const { questions: qs = [], themes: thms = [] } = formData;
    return { questions: qs, themes: thms };
  }, [formData]);

  // ---- Lokal state ----
  const [answers, setAnswers] = useState({});
  const [formName, setFormName] = useState("");
  const [loading, setLoading] = useState(false);

  const planInstanceId = searchParams.get("planInstanceId");
  const instanceId = searchParams.get("instanceId");

  // Reset når template byttes
  useEffect(() => {
    const defaults = {};
    (themes || []).forEach((t) => {
      const themeKey = `${selectedForm}_${t.id}`;
      defaults[themeKey] = true;
    });
    setAnswers({});
    setFormName("");
    // ikke rør instanceId i URL – du kan fortsette i samme instans om du vil
  }, [selectedForm]);

  // ==========================
  // Firestore: lasting/lagring
  // ==========================

  // Last inn eksisterende instans
  useEffect(() => {
    let mounted = true;

    async function loadInstance() {
      if (!planInstanceId) {
        setFormName("");
        setAnswers({});
        return;
      }
      setLoading(true);
      try {
        // Find the specific form document for the current plan instance and formId
        const q = query(
          collection(db, "forms"),
          where("planInstanceId", "==", planInstanceId),
          where("userId", "==", userId),
          where("formId", "==", selectedForm)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const formDoc = querySnapshot.docs[0];
          const data = formDoc.data();

          if (!mounted) return;

          setFormName(data.name || "Uten navn");
          setAnswers(data.answers || {});

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
          setFormName("Ny plan");
          setAnswers({});
        }
      } catch (e) {
        console.error("Kunne ikke laste instans:", e);
      }
      setLoading(false);
    }

    if (userId) loadInstance();
    return () => {
      mounted = false;
    };
  }, [planInstanceId, selectedForm, userId, setSearchParams]);

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
        answers,
        updatedAt: serverTimestamp(),
      };

      if (isNew) {
        // This logic path should ideally not be hit with the new "plan instance" creation model.
        // Saving should always be an update.
        alert("Kan ikke lagre et nytt skjema direkte. Opprett en ny plan først.");
      } else {
        // Update an existing document
        const batch = writeBatch(db);

        // Update the name for all forms in the same plan instance
        const q = query(collection(db, "forms"), where("planInstanceId", "==", planInstanceId));
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

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  if (!selectedForm || !formTemplate) {
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
          onChange={(e) => setFormName(e.target.value)}
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

      {formTemplate.temaer.map((tema) => (
        <div key={tema.id} className="tema" style={{ marginBottom: '2rem', border: '1px solid #eee', padding: '1rem' }}>
          <h3>{tema.title}</h3>
          {tema.questions.map((question) => (
            <div key={question.id} style={{ margin: '1rem 0' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>{question.text}</label>
              {question.type === 'text' && (
                <input type="text" value={answers[question.id] || ''} onChange={(e) => handleAnswerChange(question.id, e.target.value)} style={{ width: '100%', padding: '8px' }} />
              )}
              {question.type === 'textarea' && (
                <textarea value={answers[question.id] || ''} onChange={(e) => handleAnswerChange(question.id, e.target.value)} style={{ width: '100%', padding: '8px', minHeight: '80px' }} />
              )}
              {question.type === 'boolean' && (
                <div>
                  <label><input type="radio" name={question.id} checked={answers[question.id] === true} onChange={() => handleAnswerChange(question.id, true)} /> Ja</label>
                  <label style={{ marginLeft: '1rem' }}><input type="radio" name={question.id} checked={answers[question.id] === false} onChange={() => handleAnswerChange(question.id, false)} /> Nei</label>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </main>
  );
};

export default MainContent;
