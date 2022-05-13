<script>
	export let toast;

	import { todos } from "../stores/todo";

	let showInput = false,
		editID = -1;
	
	// crud methods
	const delTodos = (id) => {
		todos.delete(id);
		toast.mostrarMensaje("Todo eliminado", "danger");
	};
	
	const updateTodoState = (item) => {
		item.estado = !item.estado;
		todos.update(item);
		toast.mostrarMensaje("Estado del Todo actualizado", "warning");
	};
	// auto binded, updates values
	const updateTodoDescription = () => {
		showInput = false;
		editID = -1;

		toast.mostrarMensaje("Todo actualizado", "warning");
	};	
	const showInputTodoDescription = (item) => {
		showInput = true;
		editID = item.id;
	};

	// computed:
	$: classEstado = (done) =>
		done
			? "btn btn-sm bg-black text-warning"
			: "btn btn-sm font-weight-bold btn-outline-warning border-dark text-dark";
	$: classIcono = (done) =>
		done ? "bi bi-arrow-clockwise" : "bi bi-check2";
	$: classTextoTachado = (done) =>
		done ? "text-decoration-line-through text-black-50 small" : "";
</script>

{#each $todos as item}
	<div class="shadow my-3 p-3 lead bg-warning">
		{#if showInput && item.id == editID}
			<form on:submit|preventDefault={updateTodoDescription(item)}>
				<input
					type="text"
					autofocus
					on:blur={updateTodoDescription(item)}
					placeholder={item.texto}
					bind:value={item.texto}
				/>
			</form>
		{:else}
			<p class={classTextoTachado(item.estado)}>
				<span id={item.id} on:click={showInputTodoDescription(item)}>
					{item.texto}
				</span>
			</p>
		{/if}
		<button
			class={classEstado(item.estado)}
			on:click={updateTodoState(item)}
		>
			<i class={classIcono(item.estado)} />
		</button>
		<button class="btn btn-sm btn-danger" on:click={delTodos(item.id)}>
			<i class="bi bi-trash" />
		</button>
		<button
			class="btn btn-sm btn-secondary border-dark "
			on:click={showInputTodoDescription(item)}
		>
			<i class="bi bi-pencil" />
		</button>
	</div>
{/each}

<style>
</style>
