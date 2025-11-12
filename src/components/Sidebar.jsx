// src/components/Sidebar.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { db } from "../firebase-config";
import {
  collection,
  query,
  where,
  onSnapshot,
  limit,
  getDocs,
  doc,
  deleteDoc,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";
import { PLAN_TEMPLATES } from "./plan-templates";

const Sidebar = ({ selectedPlan, onSelectPlan, userId }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [myForms, setMyForms] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [isMyPlansOpen, setIsMyPlansOpen] = useState(true);
  const [planToDelete, setPlanToDelete] = useState(null); // For custom delete confirmation

  // A flat map of all templates for easy lookup by key.
  const ALL_TEMPLATES = useMemo(() =>
    Object.values(PLAN_TEMPLATES).flatMap(plan => plan.forms || []).reduce((acc, form) => ({ ...acc, [form.key]: form }), {}),
  []);

  useEffect(() => {
    if (!userId) {
      setMyForms([]);
      return;
    }

    setLoadingList(true);

    // Build query
    const base = collection(db, "forms");
    const q = query(
      base,
      where("userId", "==", userId),
      where("planTemplateKey", "==", selectedPlan),
      limit(50)
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        // Group forms by planInstanceId
        const plans = items.reduce((acc, form) => {
          const { planInstanceId, name } = form;
          if (!acc[planInstanceId]) {
            acc[planInstanceId] = { planInstanceId, name: name || "Uten navn", forms: [] };
          }
          acc[planInstanceId].forms.push(form);
          return acc;
        }, {});
        setMyForms(Object.values(plans));
        setLoadingList(false);
      },
      (err) => {
        console.error("Kunne ikke hente skjema:", err);
        setLoadingList(false);
      }
    );

    return () => unsub();
  }, [userId, selectedPlan]);

  const handleNewPlan = async () => {
    if (!userId) return;

    const planTemplate = PLAN_TEMPLATES[selectedPlan] || {};
    if (!planTemplate.forms || planTemplate.forms.length === 0) return;

    const planInstanceId = uuidv4();
    const batch = writeBatch(db);
    const now = serverTimestamp();

    planTemplate.forms.forEach(formTemplate => {
      const newFormRef = doc(collection(db, "forms"));
      batch.set(newFormRef, {
        userId,
        formId: formTemplate.key,
        planInstanceId,
        planTemplateKey: selectedPlan,
        name: "Ny plan",
        createdAt: now,
        updatedAt: now,
      });
    });

    await batch.commit();

    const params = { planInstanceId };
    // If there are forms, navigate to the first one.
    if (planTemplate.forms && planTemplate.forms.length > 0) {
      params.formId = planTemplate.forms[0].key;
    }
    setSearchParams(params);
  };

  const requestDeletePlan = (plan) => {
    setPlanToDelete(plan);
  };

  const cancelDelete = () => {
    setPlanToDelete(null);
  };

  const confirmDeletePlan = async () => {
    if (!planToDelete || !userId) return;

    try {
      const batch = writeBatch(db);
      const q = query(collection(db, "forms"), where("planInstanceId", "==", planToDelete.planInstanceId), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.warn("No forms found for plan to delete:", planToDelete.planInstanceId);
      }

      querySnapshot.forEach(doc => {
        batch.delete(doc.ref);
      });

      await batch.commit();

      if (searchParams.get("planInstanceId") === planToDelete.planInstanceId) {
        setSearchParams({});
      }
    } catch (error) {
      console.error("Feil ved sletting av plan:", error);
      alert("En feil oppstod under sletting av planen.");
    } finally {
      setPlanToDelete(null); // Lukk popup uansett
    }
  };

  const currentPlan = PLAN_TEMPLATES[selectedPlan];

  return (
    <aside className="sidebar">
      <div className="sidebar-top" style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
        <label htmlFor="plan-selector" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Velg Plan</label>
        <select
          id="plan-selector"
          value={selectedPlan}
          onChange={(e) => {
            const planId = e.target.value;
            onSelectPlan(planId);
            setSearchParams({}); // Fjern instanceId fra URL ved mal-bytte
          }}
          style={{ width: '100%', padding: '8px', fontSize: '16px', borderRadius: '6px', border: '1px solid #ccc' }}
        >
          {Object.values(PLAN_TEMPLATES).map(({ key, title }) => (
            <option key={key} value={key}>
              {title}
            </option>
          ))}
        </select>
      </div>

      <div className="sidebar-section" style={{ padding: "12px" }}>
        <button onClick={handleNewPlan} style={{ width: '100%', padding: '10px', fontSize: '16px', background: '#28a745', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          + Ny Plan
        </button>
      </div>

      <div className="sidebar-section" style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
        <button 
          onClick={() => setIsMyPlansOpen(!isMyPlansOpen)}
          style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          Mine Planer
          <span style={{ transform: isMyPlansOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>
            ▶
          </span>
        </button>
      </div>

      {isMyPlansOpen && <div className="sidebar-bottom" style={{ padding: "0 12px 12px", display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0 }}>
        {!userId && (
          <div style={{ color: "#666", fontSize: 14, marginTop: 8 }}>
            Du er ikke logget inn ennå. (Vi logger inn anonymt automatisk.)
          </div>
        )}

        {userId && loadingList && <div style={{ marginTop: 8 }}>Laster …</div>}

        {userId && !loadingList && myForms.length === 0 && (
          <div style={{ color: "#666", fontSize: 14, marginTop: 8 }}>
            {`Ingen lagrede planer for “${currentPlan?.title ?? selectedPlan}”.`}
          </div>
        )}

        <div className="form-list-container" style={{ overflowY: 'auto', flex: 1 }}>
          <ul style={{ listStyle: "none", padding: 0, margin: "8px 0 0" }}>
            {myForms.map((plan) => (
              <li
                key={plan.planInstanceId}
                style={{ marginBottom: 8, display: "flex", gap: "4px" }}
              >
                <div style={{ flex: 1 }}>
                  <button
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "8px 10px",
                      border: "1px solid #ccc",
                      borderRadius: "6px 0 0 6px",
                      background: "#fff",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      const firstFormId = PLAN_TEMPLATES[plan.planTemplateKey]?.forms[0]?.key || 'planinitiativ';
                      setSearchParams({ 
                        planInstanceId: plan.planInstanceId, 
                        formId: firstFormId 
                      });
                    }}
                    title={`Åpne “${plan.name}”`}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {plan.name}
                    </div>
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => requestDeletePlan(plan)}
                    title={`Slett “${plan.name}”`}
                    style={{
                      height: "100%",
                      padding: "0 12px",
                      border: "1px solid #ccc",
                      borderLeft: "none",
                      borderRadius: "0 6px 6px 0",
                      background: "#f9f9f9",
                      cursor: "pointer",
                      color: "#c00",
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {planToDelete && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}>
            <div style={{
              background: 'white',
              padding: '24px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              textAlign: 'center',
              maxWidth: '400px',
              width: '90%',
            }}>
              <h4 style={{ marginTop: 0, marginBottom: '16px' }}>
                Er du sikker på at du vil slette dokumentet?
              </h4>
              <p style={{ marginBottom: '24px', wordBreak: 'break-word' }}>
                Du er i ferd med å slette "<strong>{planToDelete.name || 'Uten navn'}</strong>". Denne handlingen kan ikke angres.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                <button
                  onClick={cancelDelete}
                  style={{
                    padding: '10px 20px',
                    border: '1px solid #ccc'
                  }}
                >
                  Avbryt
                </button>
              </div>
            </div>
          </div>
        )}
      </div>}
    </aside>
  );
};

export default Sidebar;