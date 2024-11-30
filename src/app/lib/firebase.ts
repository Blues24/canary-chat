import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, deleteDoc, doc, query, orderBy, getDocs } from "firebase/firestore";


const firebaseConfig = {

    apiKey: "AIzaSyA-nseyctDIwzbgssk5e8VzzZQj5rbXjtU",
  
    authDomain: "blues24-awesome-chat.firebaseapp.com",
  
    projectId: "blues24-awesome-chat",
  
    storageBucket: "blues24-awesome-chat.firebasestorage.app",
  
    messagingSenderId: "598383332125",
  
    appId: "1:598383332125:web:f8cc7d216b39f775cf6ff4",
  
    measurementId: "G-Y2Y30HFXSM"
  
  };
  const app = initializeApp(firebaseConfig);

  // Firebase Authentication
  export const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  
  export const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };
  
  export const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  
  // Firebase Firestore
  export const db = getFirestore(app);
  
  // Firestore CRUD Functions
  export const addMessage = async (sender: string, text: string) => {
    try {
      await addDoc(collection(db, "messages"), {
        sender,
        text,
        timestamp: new Date(),
        expiresAt: new Date(Date.now() + 3600 * 1000), // Pesan kedaluwarsa dalam 1 jam
      });
    } catch (error) {
      console.error("Error adding message: ", error);
    }
  };
  
  export const getMessages = async () => {
    try {
      const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error getting documents: ", error);
      return []; // Kembalikan array kosong jika terjadi error
    }
  };
  
  
  export const deleteMessage = async (id: string) => {
    try {
      await deleteDoc(doc(db, "messages", id));
    } catch (error) {
      console.error("Error deleting message: ", error);
    }
  };