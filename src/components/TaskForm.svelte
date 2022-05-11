<script>
	  import { todos } from "../store";

	export let toast
	let todo = { id: "", texto: "", estado: false };

	// crud methods
	const addTodos = () => {
		if (!todo.texto.trim()) {
			console.log("texto vacio");
			toast.mostrarMensaje("Texto vacio", "danger");
			todo.texto = "";
			return;
		}

		console.log("todos from taskform");
		todos.addTodo(todo)

		todo = { id: "", texto: "", estado: false };

		toast.mostrarMensaje("Todo añadido", "success");

		console.log($todos);
	};
</script>

<form on:submit|preventDefault={addTodos}>
	<div class="input-group">
		<input
			type="text"
			class="form-control shadow border-0 bg-light"
			bind:value={todo.texto}
			placeholder="Enter para agregar tarea"
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
</form>

<style>
</style>
