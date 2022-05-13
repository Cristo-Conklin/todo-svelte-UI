<script>
	import { todos } from "../stores/todo";

	export let toast;
	let todo = { id: "", texto: "", estado: false };

	const addTodos = () => {
		if (!todo.texto.trim()) {
			toast.mostrarMensaje("Texto vacio", "danger");
			todo.texto = "";
			return;
		}

		todos.addTodo(todo);

		todo = { id: "", texto: "", estado: false };

		toast.mostrarMensaje("Todo añadido", "success");
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
