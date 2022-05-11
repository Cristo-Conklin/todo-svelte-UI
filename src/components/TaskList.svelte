<script>
	export let todos, mostrarMensaje;

	// crud methods
	const delTodos = (id) => {
		let tempTodos = $todos.filter((item) => item.id !== id);
		$todos = tempTodos;
		// $todos = $todos.filter((item) => item.id !== id);
		mostrarMensaje("Todo eliminado", "danger");
	};

	const updateTodos = (id) => {
		// $todos = $todos.map((item) =>
		// 	item.id === id ? { ...item, estado: !item.estado } : item
		// );
		$todos = $todos.map((item) =>
			item.id === id ? { ...item, estado: !item.estado } : item
		);

		mostrarMensaje("Todo actualizado", "warning");
	};

	// computed:
	$: classEstado = (valor) =>
		valor
			? "btn btn-sm bg-black text-warning"
			: "btn btn-sm font-weight-bold btn-outline-warning border-dark text-dark";
	$: classIcono = (valor) =>
		valor ? "bi bi-arrow-clockwise" : "bi bi-check2";
	$: classTextoTachado = (valor) =>
		valor ? "text-decoration-line-through text-black-50 small" : "";
</script>

{#each $todos as item}
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
		<button class="btn btn-sm btn-danger" on:click={delTodos(item.id)}>
			<i class="bi bi-trash" />
		</button>
	</div>
{/each}

<style>
</style>
