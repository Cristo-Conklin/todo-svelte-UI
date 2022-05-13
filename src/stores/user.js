import {
    writable
} from 'svelte/store'

const createUser = () => {
    const {
        subscribe,
        set
    } = writable(null)

    return {
        subscribe,
        set: (user) => {
            set(user)
        },

        getLocalStorage: () => {
            return (JSON.parse(localStorage.getItem("userTodos")))
        },
        current: async () => {
            const user = await firebase.getCurrentUser()
            set(user)
        }
    }
}

export const user = createUser()

if (localStorage.getItem("userTodos")) {
    user.set(user.getLocalStorage())
}


// TODO: move all related auth to firebase
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
onAuthStateChanged(auth, (currentUser) => {
  if (currentUser) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    if (currentUser.displayName == null) currentUser.displayName = currentUser.email
    user.set(currentUser)
    console.log("user js ", currentUser, user);

    // ...
  } else {
    console.log("User is signed out")
    // ...
  }
});


export {
    auth
}