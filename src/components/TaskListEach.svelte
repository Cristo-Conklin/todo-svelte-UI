<script>
  import TLEachTags from './TLEachTags.svelte'
  import TLEachNoteBottom from './TLEachNoteBottom.svelte'

  import { todos } from '../stores/todo'

  import _ from 'lodash'

  export let toast
  export let param, order

  let showInput = false,
    editID = -1,
    showAddTagInput = false

  // auto binded?, updates values
  const updateTodoDescription = (item, hide = true) => {
    if (hide) {
      showInput = false
      editID = -1
    }

    todos.update(item.id, item)
    toast.showMessage('Todo actualizado', 'warning')
  }
  const showInputTodoDescription = (item) => {
    showInput = !showInput
    editID = item.id

    var textarea = document.getElementById(`textarea-${item.id}`)
    textarea.scrollHeight = auto
  }

  // TAGS . extracted to TLEachTags
  const showAddTag = (id) => {
    showAddTagInput = showAddTagInput ? false : id
  }

  $: classtitleTachado = (done) =>
    done ? 'text-decoration-line-through text-black-50 small' : ''
</script>

{#each _.orderBy($todos, [param], [order]) as item (item.id)}
  <div class="shadow my-3 p-3 lead bg-warning " id={item.id}>
    <!-- title and description -->
    {#if showInput && item.id == editID}
      <form on:submit|preventDefault={updateTodoDescription(item)}>
        <!-- svelte-ignore a11y-autofocus -->
        <div class="input-group">
          <input
            type="text"
            style=""
            class="form-control"
            autofocus
            placeholder={item.title}
            bind:value={item.title}
            on:blur|preventDefault={updateTodoDescription(item, false)}
          />
          <div class="input-group-append">
            <button
              on:click={showInputTodoDescription(item)}
              class="btn btn-sm btn-info border-dark "
            >
              <i class="bi bi-pencil" />
            </button>
          </div>
          <hr />
          <textarea
            id="textarea-{item.id}"
            type="textarea"
            style="width: 100%; height: auto"
            autofocus
            placeholder={item.description}
            bind:value={item.description}
            on:blur|preventDefault={updateTodoDescription(item, false)}
          />
        </div>
      </form>
    {:else}
      <div
        on:click={showInputTodoDescription(item)}
        class={classtitleTachado(item.done)}
      >
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

    <!-- tags badges . Extracted to TLEachTags -->
    <TLEachTags {todos} {toast} bind:item bind:showAddTagInput />

    <!-- note bottom buttons. Extracted compo TLEachNoteBottom-->
    <TLEachNoteBottom
      {todos}
      {toast}
      bind:item
      {showAddTag}
      {showInputTodoDescription}
    />
  </div>
{/each}

<style>
</style>
