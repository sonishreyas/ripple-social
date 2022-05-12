import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import "firebase/compat/auth";
import "firebase/compat/firestore";

import { firebaseConfig } from "./firebaseConfig";

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp); // For Authentication
const db = getFirestore(firebaseApp); // For Using Database
const storage = getStorage(firebaseApp);
export { auth, db, storage };
