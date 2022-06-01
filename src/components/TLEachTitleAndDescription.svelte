<script>
  import { todos } from '../stores/todo'
  export let toast, item, showInputTodo

  export let showInput, editID

  // UPDATE TITLE AND DESCRIPTION
  const updateTodo = (item, hide = true) => {
    if (hide) {
      showInput = false
      editID = -1
    }

    todos.update(item.id, item)
    toast.showMessage('Todo actualizado', 'warning')
  }

  $: classtitleTachado = (done) =>
    done ? 'text-decoration-line-through text-black-50 small' : ''
</script>

{#if showInput && item.id == editID}
  <form on:submit|preventDefault={updateTodo(item)}>
    <!-- svelte-ignore a11y-autofocus -->
    <div class="input-group">
      <input
        type="text"
        style=""
        class="form-control"
        autofocus
        placeholder={item.title}
        bind:value={item.title}
        on:blur|preventDefault={updateTodo(item, false)}
      />

      <button
        on:click={showInputTodo(item)}
        class="btn btn-sm btn-info border-dark ms-auto"
      >
        <i class="bi bi-pencil" />
      </button>

      <textarea
        id="textarea-{item.id}"
        type="textarea"
        style="width: 100%; height: auto"
        class="form-control"
        autofocus
        placeholder={item.description}
        bind:value={item.description}
        on:blur|preventDefault={updateTodo(item, false)}
      />
    </div>
  </form>
{:else}
  <div on:click={showInputTodo(item)} class={classtitleTachado(item.done)}>
    <p>
      <span id={item.id}>
        {item.title}
      </span>
    </p>
    <hr />
    <p>
      <span id="description-{item.id}">
        {item.description.length > 73
          ? item.description.substring(0, 73) + ' ...'
          : item.description}
      </span>
    </p>
  </div>
{/if}

<style>
</style>
