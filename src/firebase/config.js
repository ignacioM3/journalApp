import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {GoogleAuthProvider} from 'firebase/auth'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWDzelZPcq7pNuLeSrLaBA5O2BWFRbIoc",
  authDomain: "proyecto-react-2022-ignac.firebaseapp.com",
  projectId: "proyecto-react-2022-ignac",
  storageBucket: "proyecto-react-2022-ignac.appspot.com",
  messagingSenderId: "173980909663",
  appId: "1:173980909663:web:f80c9758af21e113eb5bea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//configuracion de firestore

const db = getFirestore(app)

//configuracion de la autenticacion de google

const googleAuthProvider = new GoogleAuthProvider()

export {
    db,
    googleAuthProvider
}