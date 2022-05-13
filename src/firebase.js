// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import 'firebase/auth'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIXfdHrAYpYS7FOiOFMRPO4z3Loss0LiY",
  authDomain: "svelte-todo-route.firebaseapp.com",
  projectId: "svelte-todo-route",
  storageBucket: "svelte-todo-route.appspot.com",
  messagingSenderId: "611614751527",
  appId: "1:611614751527:web:ffb069803750f60426c702"
};

// Initialize Firebase
const authProject = initializeApp(firebaseConfig);

console.log(authProject);  // "[DEFAULT]"

