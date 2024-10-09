


// firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgJvugbHC7SSZJP3Rl8hfFb1g9U97KLrY",
  authDomain: "gdswellness-9a936.firebaseapp.com",
  projectId: "gdswellness-9a936",
  storageBucket: "gdswellness-9a936.appspot.com",
  messagingSenderId: "565117545863",
  appId: "1:565117545863:web:30d39c8445dfc26820f722",
  measurementId: "G-8BS96LTMR1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
