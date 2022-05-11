import {
    writable
} from "svelte/store";

const createTodos = () => {
    const {
        subscribe,
        set,
        update,


    } = writable([])

    return {
        subscribe,
        set: (todos) => {
            set(todos)
        },
        addTodo: (todo) => {
            todo.id = Date.now();
            update(todos => todos = [...todos, todo])

            // recent todos first
            update(todos => todos = todos.sort(function (a, b) {
                return new Date(b.id) - new Date(a.id)
            }))
        },

        delete: id => {
            update(todos => todos = todos.filter((item) => item.id !== id))
        },
        update: id => {
            update(todos =>
                todos = todos.map((item) =>
                    item.id === id ? {
                        ...item,
                        estado: !item.estado
                    } :
                    item
                ))
        },
        getLocalStorage: () => {
            return (JSON.parse(localStorage.getItem("storeTodos")))
        },

    }
}

export const todos = createTodos()

if (localStorage.getItem("storeTodos")) {
    todos.set(todos.getLocalStorage())
}

