import { writable } from "svelte/store";

export let todos = writable(JSON.parse(localStorage.getItem("storeTodos")) || []);
$: localStorage.setItem("storeTodos", JSON.stringify(todos));
