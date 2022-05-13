import { writable } from 'svelte/store'

const createUser = () => {
    const { subscribe, set } = writable(null)

    return {
        subscribe,
        set: (user) => {
            set(user)
        },

        getLocalStorage: () => {
            return (JSON.parse(localStorage.getItem("userTodos")))
        },
    }
}

export const user = createUser()

if (localStorage.getItem("userTodos")) {
    user.set(user.getLocalStorage())
}