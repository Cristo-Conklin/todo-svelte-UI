import {
    writable
} from "svelte/store"


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
            todo.id = Date.now()
            update(todos => todos = [...todos, todo])

            // recent todos first
            update(todos => todos = todos.sort(function (a, b) {
                // return new Date(b.id) - new Date(a.id)
                return b.sort_order > a.sort_order

            }))
        },

        delete: id => {
            update(todos =>
                todos = todos.filter((item) => item.id !== id)
            )
        },
        update: () => {
            update(todos => todos )

            // update(todos =>
            //     todos = todos.map((item) => {
            //         item.id === id ?
            //             item = {todo}
            //             :
            //             item
            //     }))
        },
        updateState: id => { // THIS UPDATES done NOT THE TODO
            update(todos =>
                todos = todos.map((item) =>
                    item.id === id ? {
                        ...item,
                        done: !item.done
                    } :
                    item
                ))
        },
        removeTag: (id, newTags) => { 
            update(todos =>
                todos = todos.map((item) =>
                    item.id === id ? {
                        ...item,
                        tags: newTags
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