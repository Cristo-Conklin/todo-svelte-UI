<script>
	import {todos} from "./store";
	import TodoToast from "./components/TodoToast.svelte";
	import TaskList from "./components/TaskList.svelte";
	import TaskForm from "./components/TaskForm.svelte";

	let toast

	$: console.log(todos, $todos);
	$: localStorage.setItem("storeTodos", JSON.stringify($todos));

</script>

<main>
	<div class="container">
		<h1 class="my-3 display-6 text-warning text-center fst-italic">TODO</h1>

		<hr />

		<!-- TaskForm.svelteS -->
		<TaskForm {toast} /> 
		
		<hr />

		<!-- TaskList.svelte -->
		<TaskList {toast} />


		<!-- TodoToast notify -->
		<TodoToast bind:toast />
	</div>
</main>

<style>
</style>
