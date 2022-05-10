<script>
	let todos = [];
	let todo = { id: "", texto: "", estado: false };

	const addTodos = () => {
		if (!todo.texto.trim()) {
			console.log("texto vacio");
			todo.texto = "";
			return;
		}
		todo.id = Date.now();
		todos = [...todos, todo];
		todo = { id: "", texto: "", estado: false };
	};

	const delTodos = (id) => {
		todos = todos.filter((item) => item.id !== id);
	};

	const updateTodos = (id) => {
		todos = todos.map((item) =>
			item.id === id ? { ...item, estado: !item.estado } : item
		);
	};

	$: classEstado = (valor) =>
		valor
			? "btn btn-sm bg-black text-warning"
			: "btn btn-sm font-weight-bold btn-outline-warning border-dark text-dark";
	$: classIcono = (valor) =>
		valor ? "bi bi-arrow-clockwise" : "bi bi-check2";
	$: classTextoTachado = (valor) =>
		valor ? "text-decoration-line-through text-black-50 small" : "";

	if (localStorage.getItem("todos")) {
		todos = JSON.parse(localStorage.getItem("todos"));
	}

	$: localStorage.setItem("todos", JSON.stringify(todos));
</script>

<main>
	<div class="container">
		<h1 class="my-3 display-6 text-warning text-center fst-italic">TODO</h1>

		<!-- TaskForm.svelte -->
		<form on:submit|preventDefault={addTodos}>
			<input
				type="text"
				class="form-control shadow border-0"
				bind:value={todo.texto}
				placeholder="Enter para agregar tarea"
			/>
		</form>

		<hr />

		<!-- TaskList.svelte -->
		{#each todos as item}
		<div class="shadow my-3 p-3 lead bg-warning">
			<p class={classTextoTachado(item.estado)}>
				{item.texto}
			</p>
			<button
				class={classEstado(item.estado)}
				on:click={updateTodos(item.id)}
			>
				<i class={classIcono(item.estado)} />
			</button>
			<button
				class="btn btn-sm btn-danger"
				on:click={delTodos(item.id)}
			>
				<i class="bi bi-trash" />
			</button>
		</div>
	{/each}
	</div>
</main>

<style>
</style>
