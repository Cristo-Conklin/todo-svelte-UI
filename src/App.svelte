<script>
	// crud methods and toast are in components
	import TaskList from "./components/TaskList.svelte";
	import TaskForm from "./components/TaskForm.svelte";
	import TodoToast from "./components/TodoToast.svelte";

	let todos = [], mostrarMensaje;

	// localStorage:
	if (localStorage.getItem("todos")) {
		todos = JSON.parse(localStorage.getItem("todos"));
	}

	$: localStorage.setItem("todos", JSON.stringify(todos));
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
		<TodoToast bind:mostrarMensaje />
	</div>
</main>

<style>
</style>
