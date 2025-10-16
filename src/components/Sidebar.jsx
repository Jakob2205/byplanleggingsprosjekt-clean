// src/components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { db } from "../firebase-config";
import {
  collection,
  query,
  where,
  onSnapshot,
  limit,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { TEMPLATES } from "../templates";

const Sidebar = ({ selectedForm, onSelectForm, userId }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [myForms, setMyForms] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [showAll, setShowAll] = useState(false); // 👈 new toggle
  const [isMyFormsOpen, setIsMyFormsOpen] = useState(true);
  const [formToDelete, setFormToDelete] = useState(null); // For custom delete confirmation

  useEffect(() => {
    if (!userId) {
      setMyForms([]);
      return;
    }

    setLoadingList(true);

    // Build query
    const base = collection(db, "forms");
    let q;
    if (showAll) {
      // All my forms (no template filter)
      q = query(
        base,
        where("userId", "==", userId),
        limit(50)
      );
    } else {
      // Only my forms for the selected template
      q = query(
        base,
        where("userId", "==", userId),
        where("formId", "==", selectedForm),
        limit(50)
      );
    }

    const unsub = onSnapshot(
      q,
      (snap) => {
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setMyForms(items);
        setLoadingList(false);
      },
      (err) => {
        console.error("Kunne ikke hente skjema:", err);
        setLoadingList(false);
      }
    );

    return () => unsub();
  }, [userId, selectedForm, showAll]);

  const handleOpenForm = (docItem) => {
    if (docItem.formId && docItem.formId !== selectedForm) {
      onSelectForm(docItem.formId); // switch template to match
    }
    setSearchParams({ instanceId: docItem.id }); // load in MainContent
  };

  const requestDeleteForm = (form) => {
    setFormToDelete(form);
  };

  const cancelDelete = () => {
    setFormToDelete(null);
  };

  const confirmDeleteForm = async () => {
    if (!formToDelete) return;

    try {
      await deleteDoc(doc(db, "forms", formToDelete.id));
      if (searchParams.get("instanceId") === formToDelete.id) {
        setSearchParams({});
      }
    } catch (error) {
      console.error("Feil ved sletting av skjema:", error);
      alert("En feil oppstod under sletting av skjemaet.");
    } finally {
      setFormToDelete(null); // Lukk popup uansett
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-top" style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
        <label htmlFor="form-selector" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Velg mal</label>
        <select
          id="form-selector"
          value={selectedForm}
          onChange={(e) => {
            const formId = e.target.value;
            onSelectForm(formId);
            setSearchParams({}); // Fjern instanceId fra URL ved mal-bytte
          }}
          style={{ width: '100%', padding: '8px', fontSize: '16px', borderRadius: '6px', border: '1px solid #ccc' }}
        >
          {Object.values(TEMPLATES).map(({ key, title }) => (
            <option key={key} value={key}>
              {title}
            </option>
          ))}
        </select>
      </div>

      <div className="sidebar-section" style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
        <button 
          onClick={() => setIsMyFormsOpen(!isMyFormsOpen)}
          style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          Mine Skjema
          <span style={{ transform: isMyFormsOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>
            ▶
          </span>
        </button>
      </div>

      {isMyFormsOpen && <div className="sidebar-bottom" style={{ padding: "0 12px 12px", display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <label style={{ fontSize: 12, color: "#444" }}>
            <input
              type="checkbox"
              checked={showAll}
              onChange={(e) => setShowAll(e.target.checked)}
              style={{ marginRight: 6 }}
            />
            Vis alle mine skjema
          </label>
        </div>

        {!userId && (
          <div style={{ color: "#666", fontSize: 14, marginTop: 8 }}>
            Du er ikke logget inn ennå. (Vi logger inn anonymt automatisk.)
          </div>
        )}

        {userId && loadingList && <div style={{ marginTop: 8 }}>Laster …</div>}

        {userId && !loadingList && myForms.length === 0 && (
          <div style={{ color: "#666", fontSize: 14, marginTop: 8 }}>
            {showAll
              ? "Ingen lagrede skjema."
              : `Ingen lagrede skjema for “${TEMPLATES[selectedForm]?.title ?? selectedForm}”.`}
          </div>
        )}

        <div className="form-list-container" style={{ overflowY: 'auto', flex: 1 }}>
          <ul style={{ listStyle: "none", padding: 0, margin: "8px 0 0" }}>
            {myForms.map((f) => (
              <li
                key={f.id}
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
                    onClick={() => handleOpenForm(f)}
                    title={`Åpne “${f.name || "Uten navn"}”`}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {f.name || "Uten navn"}
                      {showAll && f.formId ? (
                        <span
                          style={{
                            fontWeight: 400,
                            fontSize: 12,
                            color: "#666",
                          }}
                        >
                          {" "}— {TEMPLATES[f.formId]?.title ?? f.formId}
                        </span>
                      ) : null}
                    </div>
                    <div style={{ fontSize: 12, color: "#666" }}>
                      Sist endret:{" "}
                      {f.updatedAt?.toDate
                        ? f.updatedAt.toDate().toLocaleString()
                        : "—"}
                    </div>
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => requestDeleteForm(f)}
                    title={`Slett “${f.name || "Uten navn"}”`}
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

        {formToDelete && (
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
                Du er i ferd med å slette "<strong>{formToDelete.name || 'Uten navn'}</strong>". Denne handlingen kan ikke angres.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                <button
                  onClick={cancelDelete}
                  style={{
                    padding: '10px 20px',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                    background: '#f0f0f0',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    minWidth: '80px',
                  }}
                >
                  Nei
                </button>
                <button
                  onClick={confirmDeleteForm}
                  style={{
                    padding: '10px 20px',
                    border: '1px solid #c00',
                    borderRadius: '6px',
                    background: '#dc3545',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    minWidth: '80px',
                  }}
                >
                  Ja
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
