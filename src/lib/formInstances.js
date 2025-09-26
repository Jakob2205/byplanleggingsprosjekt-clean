// src/lib/formInstances.js
import { auth, db } from "../firebase-config";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";

/**
 * Opprett en ny skjemainstans for gjeldende bruker.
 * Returnerer { id, ...data }.
 */
export async function createFormInstance({ templateKey, name, answers = {}, includeInTotal = {}, totalScore = 0 }) {
  const user = auth.currentUser;
  if (!user) throw new Error("Ingen innlogget bruker.");

  const ref = collection(db, "users", user.uid, "formInstances");
  const docRef = await addDoc(ref, {
    templateKey,
    name,
    answers,
    includeInTotal,
    totalScore,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return { id: docRef.id, templateKey, name, answers, includeInTotal, totalScore };
}

/**
 * Lagre endringer i en eksisterende skjemainstans (merge).
 */
export async function saveFormInstance(instanceId, patch) {
  const user = auth.currentUser;
  if (!user) throw new Error("Ingen innlogget bruker.");
  const ref = doc(db, "users", user.uid, "formInstances", instanceId);

  await setDoc(
    ref,
    {
      ...patch,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/**
 * Last en instans
 */
export async function loadFormInstance(instanceId) {
  const user = auth.currentUser;
  if (!user) throw new Error("Ingen innlogget bruker.");
  const ref = doc(db, "users", user.uid, "formInstances", instanceId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

/**
 * Hent siste instans for en gitt template (valgfritt helper).
 */
export async function getLatestInstanceForTemplate(templateKey) {
  const user = auth.currentUser;
  if (!user) throw new Error("Ingen innlogget bruker.");

  const ref = collection(db, "users", user.uid, "formInstances");
  const q = query(
    ref,
    where("templateKey", "==", templateKey),
    orderBy("createdAt", "desc"),
    limit(1)
  );
  const snaps = await getDocs(q);
  if (snaps.empty) return null;
  const d = snaps.docs[0];
  return { id: d.id, ...d.data() };
}
