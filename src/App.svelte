<script>
	// crud methods and toast are in components
	import TaskList from "./components/TaskList.svelte";
	import TaskForm from "./components/TaskForm.svelte";
	import TodoToast from "./components/TodoToast.svelte";
	import todos from "./store";

	export let mostrarMensaje,
		toastEl = "",
		opc;
</script>

<main>
	<div class="container">
		<h1 class="my-3 display-6 text-warning text-center fst-italic">TODO</h1>

		<hr />

		<!-- TaskForm.svelteS -->
		<TaskForm bind:todos={$todos} {mostrarMensaje} />

		<hr />

		<!-- TaskList.svelte -->
		<TaskList bind:todos={$todos} {mostrarMensaje} />

		<!-- Toast notify -->
		<TodoToast bind:toastEl bind:mostrarMensaje bind:opc />
	</div>
</main>

<style>
</style>
