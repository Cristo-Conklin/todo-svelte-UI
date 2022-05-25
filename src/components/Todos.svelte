<script>
	import { user } from "../stores/user"
	import { navigate } from "svelte-routing"
	import { onMount } from "svelte"

	import { todos } from "../stores/todo"

	import TaskList from "../components/TaskList.svelte"
	import TaskForm from "../components/TaskForm.svelte"

	export let toast

	onMount(() => {
		if (!$user) {
			navigate("/", { replace: true })
		}

	})

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

	{:else}
		Protected route. Login to access.
	{/if}
</div>

<style>
</style>
