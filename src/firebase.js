// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBt_touWTPF0_619a7a_dRs2-qKym80Ai4",
    authDomain: "svelte-todos2.firebaseapp.com",
    projectId: "svelte-todos2",
    storageBucket: "svelte-todos2.appspot.com",
    messagingSenderId: "562074332867",
    appId: "1:562074332867:web:f792bbd340dbb40739fc76"
};

// Initialize Firebase
const authProject = initializeApp(firebaseConfig);

console.log(authProject);  // "[DEFAULT]"

