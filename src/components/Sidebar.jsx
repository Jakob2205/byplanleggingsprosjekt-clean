// src/components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FormSelector from "./FormSelector";
import { db } from "../firebase-config";
import {
  collection,
  query,
  where,
  onSnapshot,
  limit,
} from "firebase/firestore";

const FORM_LABELS = {
  default: "Standard skjema",
  planIn1: "Boligbebyggelse planinitiativ",
  form2: "Råstoffutvinning førstegangsbehandling",
  planIn2: "Råstoff planinitiativ",
};

const Sidebar = ({ selectedForm, onSelectForm, userId }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [myForms, setMyForms] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [showAll, setShowAll] = useState(false); // 👈 new toggle

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

  return (
    <aside className="sidebar">
      <div className="sidebar-top" style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
        <FormSelector
          selectedForm={selectedForm}
          onSelectForm={(formId) => {
            onSelectForm(formId);
            setSearchParams({}); // Fjern instanceId fra URL ved mal-bytte
          }}
        />
      </div>

      <div className="sidebar-bottom" style={{ padding: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <h3 style={{ margin: 0, flex: 1 }}>Mine skjema</h3>
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
              : `Ingen lagrede skjema for “${FORM_LABELS[selectedForm] ?? selectedForm}”.`}
          </div>
        )}

        {userId && !loadingList && myForms.length > 0 && (
          <ul style={{ listStyle: "none", padding: 0, margin: "8px 0 0" }}>
            {myForms.map((f) => (
              <li key={f.id} style={{ marginBottom: 8 }}>
                <button
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "8px 10px",
                    border: "1px solid #ccc",
                    borderRadius: 6,
                    background: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => handleOpenForm(f)}
                  title={`Åpne “${f.name || "Uten navn"}”`}
                >
                  <div style={{ fontWeight: 600 }}>
                    {f.name || "Uten navn"}
                    {showAll && f.formId ? (
                      <span style={{ fontWeight: 400, fontSize: 12, color: "#666" }}>
                        {" "}
                        — {FORM_LABELS[f.formId] ?? f.formId}
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
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
