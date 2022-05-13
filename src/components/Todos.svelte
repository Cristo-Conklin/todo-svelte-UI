<script>
	import { user } from "../stores/user"
	import { navigate } from "svelte-routing"
	import { onMount } from "svelte"

	import { todos } from "../stores/todo"
	import TodoToast from "../components/TodoToast.svelte"
	import TaskList from "../components/TaskList.svelte"
	import TaskForm from "../components/TaskForm.svelte"

	onMount(() => {
		if (!$user) {
			navigate("/", { replace: true })
		}
	})

	let toast

	// console.log(todos, $todos)
	$: localStorage.setItem("storeTodos", JSON.stringify($todos))
	$: localStorage.setItem("userTodos", JSON.stringify($user))
</script>

<div>
	{#if $user}
		<!-- TaskForm.svelte -->
		<TaskForm {toast} />

		<hr />

		<!-- TaskList.svelte -->
		<TaskList {toast} />

		<!-- TodoToast notify -->
		<TodoToast bind:toast />
	{:else}
		Protected route. Login to access.
	{/if}
</div>

<style>
</style>
