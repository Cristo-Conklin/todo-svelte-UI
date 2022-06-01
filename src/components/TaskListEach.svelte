<script>
  export let toast
  export let param
  export let order

  import { todos } from '../stores/todo'

  import _ from 'lodash'

  let showInput = false,
    editID = -1,
    showAddTagInput = false,
    tagToAdd = ''

  // TODO: extract js? and compos. ?also common w taskform
  // crud TITLE DESCRIPTION
  const delTodos = (id) => {
    todos.delete(id)
    toast.showMessage('Todo eliminado', 'danger')
  }

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

  // TODO: Extract noteBottom js to compo
  // DONE STATE SWITCH
  const updateTodoState = (item) => {
    item.done = !item.done
    todos.updateState(item)
    toast.showMessage('Estado del Todo actualizado', 'warning')
  }
  // TAGS
  function showAddTag(id) {
    showAddTagInput = showAddTagInput ? false : id
  }
  function addTag(item, tag) {
    if (!tag.trim()) return

    item.tags.push(tag)
    showAddTagInput = false
    tagToAdd = ''

    todos.update(item)
    toast.showMessage(`Tag añadida: ${tag}`, 'success')
  }

  function removeTag(item, tag) {
    console.log('trigger rem tag')
    item.tags = item.tags.filter(function (value, index, arr) {
      return value !== tag
    })

    todos.update(item)
    toast.showMessage(`Tag quitada: ${tag}`, 'danger')
  }
  // VISIBILITY
  function switchVisibility(item) {
    item.public = !item.public
    console.log(item)
    todos.update(item)
  }

  // computed:
  $: classdone = (done) =>
    done
      ? 'btn btn-sm bg-black text-warning'
      : 'btn btn-sm font-weight-bold btn-outline-warning border-dark text-dark'
  $: classIcono = (done) => (done ? 'bi bi-arrow-clockwise' : 'bi bi-check2')
  $: classtitleTachado = (done) =>
    done ? 'text-decoration-line-through text-black-50 small' : ''

  // SORT ORDER
  // $: todos = $todos.sort((a, b) => b.sort_order > a.sort_order)
  function notifySort(item) {
    console.log('reorder', item.id)
    // setTimeout(() => {document.getElementById(item.id).focus()}, 100)
    document.getElementById(item.id).focus()

    toast.showMessage('Todo reordenado', 'warning')
  }
</script>

{#each _.orderBy($todos, [param], [order]) as item (item.id)}
  <div class="shadow my-3 p-3 lead bg-warning ">
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

    <!-- tags badges -->
    <div>
      {#each item.tags as tag}
        <span class="m-1 badge rounded-pill bg-secondary"
          >#{tag}&nbsp
          <i class="bi bi-x-circle" on:click={removeTag(item, tag)} />
        </span>
      {/each}

      {#if showAddTagInput == item.id}
        <form on:submit|preventDefault={addTag(item, tagToAdd)}>
          <div class="input-group">
            <!-- svelte-ignore a11y-autofocus -->
            <input
              type="text"
              autofocus
              class="form-control "
              placeholder="new tag"
              bind:value={tagToAdd}
            />
            <div class="input-group-append">
              <button
                class="btn btn btn-success"
                on:click|preventDefault={addTag(item, tagToAdd)}
              >
                <i class="bi bi-tag" />
              </button>
            </div>
          </div>
        </form>
      {/if}
    </div>

    <!-- note bottom buttons . TODO: Extract compo TLEachNoteBottom-->
    <div class="row">
      <!-- actions buttons -->
      <button
        on:click={updateTodoState(item)}
        class="{classdone(item.done)} col-auto my-auto"
        title="mark as done"
      >
        <i class={classIcono(item.done)} />
      </button>

      <!-- tag btn -->
      <button
        on:click={showAddTag(item.id)}
        class="btn btn-sm btn-secondary border-dark col-auto  my-auto"
        title="add tag for the note"
      >
        <i class="bi bi-tags" />
      </button>
      <button
        on:click={showInputTodoDescription(item)}
        class="btn btn-sm btn-info border-dark col-auto  my-auto"
        title="edit description and title"
      >
        <i class="bi bi-pencil" />
      </button>

      <!-- TODO: move delete button at right top like a close btn -->
      <button
        class="btn btn-sm btn-danger col-auto mx-3 my-auto"
        on:click={delTodos(item.id)}
        title="delete this note"
      >
        <i class="bi bi-trash" />
      </button>
      <!-- links btn -->
      <button
        class="btn btn-sm btn-primary border-dark col-auto  my-auto"
        title="links for this note"
        on:click={showLinks(item)}
      >
        <i class="bi bi-link-45deg" />
      </button>
      <!-- media btn -->
      <button
        class="btn btn-sm btn-success border-dark col-auto  my-auto"
        title="media for this note"
        on:click={showMedia(item)}
      >
        <i class="bi bi-film" />
      </button>

      <!-- public switch checkbox -->
      <div class="col-auto form-check form-switch ms-auto">
        <input
          class="form-check-input"
          type="checkbox"
          id="{item.id}-public"
          bind:checked={item.public}
          on:click={switchVisibility(item)}
        />
        <label class="form-check-label " for="{item.id}-public">Public</label>
      </div>

      <!-- sort order -->
      <div class="col-auto ">
        <input
          type="number"
          id={'sort_order-' + item.id}
          class=" my-auto"
          bind:value={item.sort_order}
          on:change={notifySort(item)}
        />
        <label for={'sort_order-' + item.id} class="">Sort Order</label>
      </div>
    </div>
  </div>
{/each}

<style>
</style>
