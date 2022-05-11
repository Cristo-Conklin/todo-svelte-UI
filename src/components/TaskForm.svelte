<script>
	export let todos,
		mostrarMensaje;
	let todo = { id: "", texto: "", estado: false };

	// crud methods
	const addTodos = () => {
		if (!todo.texto.trim()) {
			console.log("texto vacio");
			todo.texto = "";
			return;
		}
		todo.id = Date.now();
		$todos = [...$todos, todo];
		//todos.update(t => [...t, todo]);

		todo = { id: "", texto: "", estado: false };

		// recent todos first
		$todos.sort(function (a, b) {
			// Turn your strings into dates, and then subtract them
			// to get a value that is either negative, positive, or zero.
			return new Date(b.id) - new Date(a.id);
		});

		mostrarMensaje("Todo añadido", "success");

		console.log($todos);
		// todos = todos
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
