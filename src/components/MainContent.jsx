// Planleggingsprosjekt/src/components/MainContent.jsx
import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import QuestionComponent from "../scripts/QuestionComponent.js";

// Datasett
import * as defaultData from "../scripts/questionData.js";
import * as boligBebyggelsePlanInData from "../scripts/boligBebyggelsePlanIn.js";
import * as råstoffUtvinningData from "../scripts/råstoffUtvinning.js";
import * as råStoffPlanInData from "../scripts/råStoffPlanIn.js";

// Firestore
import { db } from "../firebase-config"; // Correct path
import { collection, addDoc, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

console.log("MainContent.jsx file is loaded in the bundle");

// ✅ Create a map to associate form keys with their data modules.
const formDataSource = {
  default: defaultData,
  planIn1: boligBebyggelsePlanInData,
  form2: råstoffUtvinningData,
  planIn2: råStoffPlanInData,
};

const MainContent = ({ updateTotalScore, selectedForm, userId }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // ✅ Select the data source directly from the map.
  const formData = formDataSource[selectedForm] || formDataSource.default;

  // ✅ Find the correct multiplier export regardless of its name.
  const resolvedMultipliers =
    formData.questionMultipliers ||
    formData.t_questionMultipliers ||
    formData.r_questionMultipliers ||
    formData.y_questionMultipliers ||
    formData.b_questionMultipliers || // legg til flere alias om du har andre filer
    {};

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
    themes.forEach((t) => (defaults[t.id] = true));
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
      scores[t.id] = getThemeScore(t.id);
    });
    return scores;
  }, [answers, themes]);

  // Auto-deaktiver tema < 3 spørsmål (trygg – kun sett state hvis noe endres)
  useEffect(() => {
    setIncludeInTotal((prev) => {
      const next = { ...prev };

      themes.forEach((t) => {
        const score = themeAverageScores[t.id]; // null eller tall
        if (score === null) {
          next[t.id] = false;
        } else if (!(t.id in next)) {
          // nye tema (ved bytte av template) default til true
          next[t.id] = true;
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
      .filter((t) => includeInTotal[t.id])
      .map((t) => themeAverageScores[t.id])
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
    setCollapsedThemes((p) => ({ ...p, [themeId]: !p[themeId] }));
  const toggleInclude = (themeId) =>
    setIncludeInTotal((p) => ({ ...p, [themeId]: !p[themeId] }));

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
        const themeScore = themeAverageScores[theme.id];
        const isIncluded = !!includeInTotal[theme.id];

        return (
          <div key={theme.id} className="tema">
            <div className="tema-header">
              <button
                className="collapse-button"
                onClick={() => toggleCollapse(theme.id)}
              >
                {collapsedThemes[theme.id] ? "+" : "-"}
              </button>
              <h2>{theme.title}</h2>
              <div className="temascore-display">
                {themeScore !== null && typeof themeScore !== "undefined" && (
                  <span>Verdi: {themeScore.toFixed(2)}</span>
                )}
              </div>
              <label
                className="toggle-switch"
                htmlFor={`toggle-${theme.id}`}
                style={{ marginLeft: "10px" }}
              >
                <input
                  id={`toggle-${theme.id}`}
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
              style={{ display: collapsedThemes[theme.id] ? "none" : "block" }}
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
