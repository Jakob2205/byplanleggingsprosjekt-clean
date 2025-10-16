// Planleggingsprosjekt/src/components/MainContent.jsx
import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import QuestionComponent from "../scripts/QuestionComponent.js";
import { TEMPLATES } from "../templates";

// Firestore
import { db } from "../firebase-config"; // Correct path
import { collection, addDoc, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const MainContent = ({ updateTotalScore, selectedForm, userId }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const formData = TEMPLATES[selectedForm]?.data || TEMPLATES.default.data;

  const resolvedMultipliers = formData.questionMultipliers || {};

  // Memoize questions and themes to prevent re-creation on every render
  const { questions, themes } = useMemo(() => {
    const { questions: qs = [], themes: thms = [] } = formData;
    return { questions: qs, themes: thms };
  }, [formData]);

  // ---- Lokal state ----
  const [answers, setAnswers] = useState({});
  const [includeInTotal, setIncludeInTotal] = useState({});
  const [formName, setFormName] = useState("");
  const instanceId = searchParams.get("instanceId") || null;

  // Reset når template byttes
  useEffect(() => {
    const defaults = {};
    themes.forEach((t) => {
      const themeKey = `${selectedForm}_${t.id}`;
      defaults[themeKey] = true;
    });
    setIncludeInTotal(defaults);
    setAnswers({});
    setFormName("");
    // ikke rør instanceId i URL – du kan fortsette i samme instans om du vil
  }, [selectedForm, themes]);

  // Oppdater svar
  const updateQuestionScore = useCallback(
    (questionId, score, answered) => {
      const key = `${selectedForm}_${questionId}`;
      setAnswers((prev) => ({
        ...prev,
        [key]: { score, answered },
      }));
    },
    [selectedForm]
  );

  const getAnswer = (questionId) => answers[`${selectedForm}_${questionId}`];

  // Tema-score
  const getThemeScore = (themeId) => {
    const themeQuestions = questions.filter((q) => q.theme === themeId);
    let total = 0;
    let active = 0;

    themeQuestions.forEach((q) => {
      const ans = getAnswer(q.id);
      if (ans && ans.answered) {
        total += ans.score;
        active++;
      }
    });

    if (active < 3) return null;
    const score = total / active;
    return parseFloat(Math.max(-5, Math.min(score, 5)).toFixed(2));
  };

  const themeAverageScores = useMemo(() => {
    const scores = {};
    themes.forEach((t) => {
      const themeKey = `${selectedForm}_${t.id}`;
      scores[themeKey] = getThemeScore(t.id);
    });
    return scores;
  }, [answers, themes]);

  // Auto-deaktiver tema < 3 spørsmål (trygg – kun sett state hvis noe endres)
  useEffect(() => {
    setIncludeInTotal((prev) => {
      const next = { ...prev };

      themes.forEach((t) => {
        const themeKey = `${selectedForm}_${t.id}`;
        const score = themeAverageScores[themeKey]; // null eller tall
        if (score === null) {
          next[themeKey] = false;
        } else if (!(themeKey in next)) {
          // nye tema (ved bytte av template) default til true
          next[themeKey] = true;
        }
      });

      // unngå unødvendig state-oppdatering
      const same =
        Object.keys(next).length === Object.keys(prev).length &&
        Object.keys(next).every((k) => next[k] === prev[k]);

      return same ? prev : next;
    });
  }, [themeAverageScores, themes]);

  // Totalverdi
  useEffect(() => {
    const activeScores = themes
      .map((t) => `${selectedForm}_${t.id}`)
      .filter((themeKey) => includeInTotal[themeKey])
      .map((themeKey) => themeAverageScores[themeKey])
      .filter((s) => s !== null && typeof s !== "undefined");

    let overall = 0;
    if (activeScores.length > 0) {
      overall =
        activeScores.reduce((acc, s) => acc + parseFloat(s), 0) /
        activeScores.length;
    }
    overall = parseFloat(Math.max(-5, Math.min(overall, 5)).toFixed(2));
    updateTotalScore(overall);
  }, [themeAverageScores, includeInTotal, themes, updateTotalScore]);

  // Kollaps/inkludering
  const [collapsedThemes, setCollapsedThemes] = useState({});
  const toggleCollapse = (themeId) =>
    setCollapsedThemes((p) => {
      const themeKey = `${selectedForm}_${themeId}`;
      return { ...p, [themeKey]: !p[themeKey] };
    });
  const toggleInclude = (themeId) =>
    setIncludeInTotal((p) => {
      const themeKey = `${selectedForm}_${themeId}`;
      return { ...p, [themeKey]: !p[themeKey] };
    });

  // ==========================
  // Firestore: lasting/lagring
  // ==========================

  // Last inn eksisterende instans
  useEffect(() => {
    let mounted = true;

    async function loadInstance(id) {
      try {
        const snap = await getDoc(doc(db, "forms", id));
        if (!snap.exists()) return;

        const data = snap.data();

        if (data.formId && data.formId !== selectedForm) {
          console.warn(
            `Instansen er laget med formId="${data.formId}", men nå vises "${selectedForm}".`
          );
        }

        if (!mounted) return;

        setFormName(data.name || "");
        setAnswers(data.answers || {});
        if (data.includeInTotal) {
          setIncludeInTotal((prev) => ({ ...prev, ...data.includeInTotal }));
        }
      } catch (e) {
        console.error("Kunne ikke laste instans:", e);
      }
    }

    if (instanceId) loadInstance(instanceId);
    return () => {
      mounted = false;
    };
  }, [instanceId, selectedForm]);

  // ✅ Generic save function to reduce duplication
  const saveForm = async (isCopy = false) => {
    try {
      if (!userId) {
        alert("Du må være logget inn for å lagre.");
        return;
      }

      const isNew = !instanceId || isCopy;
      const dataToSave = {
        name: formName || "Uten navn",
        answers,
        includeInTotal,
        updatedAt: serverTimestamp(),
      };

      if (isNew) {
        // Create a new document (either initial save or save as copy)
        const docPayload = {
          ...dataToSave,
          userId, // 🔐 nødvendig for reglene
          formId: selectedForm,
          createdAt: serverTimestamp(),
        };
        if (isCopy) {
          docPayload.name = `${docPayload.name} (kopi)`;
        }
        const ref = await addDoc(collection(db, "forms"), docPayload);
        setSearchParams({ instanceId: ref.id });
        alert(isCopy ? "Kopi lagret ✅" : "Skjema lagret ✅");
      } else {
        // Update an existing document
        await setDoc(doc(db, "forms", instanceId), dataToSave, { merge: true });
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

      {themes.map((theme) => {
        const themeKey = `${selectedForm}_${theme.id}`;
        const themeScore = themeAverageScores[themeKey];
        const isIncluded = !!includeInTotal[themeKey];

        return (
          <div key={theme.id} className="tema">
            <div className="tema-header">
              <button
                className="collapse-button"
                onClick={() => toggleCollapse(theme.id)} // Pass local id
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
              {questions
                .filter((q) => q.theme === theme.id)
                .map((question) => (
                  <QuestionComponent
                    key={question.id}
                    question={question}
                    updateQuestionScore={updateQuestionScore}
                    // 👇 pass den løste multiplikator-tabellen
                    questionMultipliers={resolvedMultipliers}
                    storedAnswer={getAnswer(question.id)}
                  />
                ))}
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default MainContent;
