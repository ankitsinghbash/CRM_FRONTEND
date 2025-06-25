import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyBz3ZtY1PLyNI2HXjszfxVzBpL5PnTxwoY",
  authDomain: "fir-testing-8f588.firebaseapp.com",
  projectId: "fir-testing-8f588",
  storageBucket: "fir-testing-8f588.firebasestorage.app",
  messagingSenderId: "855154647805",
  appId: "1:855154647805:web:c69aed0e9a1aeffa3cd494",
  measurementId: "G-3SCSWH3Y7B",
  databaseURL : "https://fir-testing-8f588-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const db = getDatabase(app);    



 export default db;