<script>
	// crud methods and toast are in components
	import TaskList from "./components/TaskList.svelte";
	import TaskForm from "./components/TaskForm.svelte";
	import TodoToast from "./components/TodoToast.svelte";
	import { writable } from "svelte/store";
	// localStorage:
	// if (localStorage.getItem("todos")) {
	// 	todos = JSON.parse(localStorage.getItem("todos"));
	// }

	// $: localStorage.setItem("todos", JSON.stringify(todos));

	$: todos = writable([]);

	export let mostrarMensaje, toastEl = '', opc;

</script>

<main>
	<div class="container">
		<h1 class="my-3 display-6 text-warning text-center fst-italic">TODO</h1>

		<hr />

		<!-- TaskForm.svelte -->
		<TaskForm bind:todos {mostrarMensaje} />

		<hr />

		<!-- TaskList.svelte -->
		<TaskList bind:todos {mostrarMensaje} />

		<!-- Toast notify -->
		<TodoToast bind:toastEl bind:mostrarMensaje bind:opc />
	</div>
</main>

<style>
</style>
