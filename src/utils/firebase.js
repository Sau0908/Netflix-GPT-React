import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBOk9LcAS8JyExk40J1JDWsJMloSti2Gk4",
  authDomain: "netflix-gpt-94836.firebaseapp.com",
  projectId: "netflix-gpt-94836",
  storageBucket: "netflix-gpt-94836.appspot.com",
  messagingSenderId: "394252751405",
  appId: "1:394252751405:web:83572ad2eac8911d231ea4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
export { app, auth };
