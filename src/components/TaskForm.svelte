<script>
	import { todos } from "../stores/todo"
	import { user } from "../stores/user"

	export let toast

	let todo = {}
	const blank_todo = { id: "", title: "", description: '', done: false, 
						user_id: "", public: false, sort_order: 1, 
						media: [], rels: [], links: [], tags: [] }
	todo = {...blank_todo}

	const addTodos = () => {
		if (!todo.title.trim()) {
			toast.showMessage("Título vacio", "danger")
			todo.title = ""
			return
		}

		todo.user_id = $user.uid
		todos.addTodo(todo)
		console.log("uid for new task ", $user.uid, $user, todo, blank_todo)

		todo = {...blank_todo}

		toast.showMessage("Todo añadido", "success")
	}
	function switchVisibility(todo) {
		todo.public = !todo.public
		console.log(todo.public)
	}
</script>

<form on:submit|preventDefault={addTodos}>
	<div class="input-group">
		<input
			type="text"
			class="form-control shadow border-0 bg-light"
			bind:value={todo.title}
			placeholder="Nueva tarea (Enter para agregar)"
		/>
		<div class="input-group-append">
			<button
				class="btn btn btn-success"
				on:click|preventDefault={addTodos}
			>
				<i class="bi bi-file-earmark-plus" />
			</button>
		</div>
	</div>

	<div class="form-group row my-2">
		<div class="form-check form-switch col-sm-3">
			<input
				class="form-check-input m-2"
				type="checkbox"
				id="public"
				bind:checked={todo.public}
				on:click={switchVisibility(todo)}
			/>
			<label class="col-form-label col-sm-2 " for="public">Public </label>
		</div>
		<div class="col-sm-3">
			<input
				type="number"
				id="sort_order"
				class="mx-3 col-sm-3"
				bind:value={todo.sort_order}
			/>
			<label for="sort_order">Sort Order</label>
		</div>		
	</div>

</form>
