<script>
  export let toast, item
  export let showAddTag, showInputTodo

  import { todos } from '../stores/todo'

  // crud TITLE DESCRIPTION
  const delTodos = (id) => {
    todos.delete(id)
    toast.showMessage('Todo eliminado', 'danger')
  }

  // DONE STATE SWITCH
  const updateTodoState = (item) => {
    item.done = !item.done
    todos.updateState(item)
    toast.showMessage('Estado del Todo actualizado', 'warning')
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

  // SORT ORDER
  // $: todos = $todos.sort((a, b) => b.sort_order > a.sort_order)
  function notifySort(item) {
    console.log('reorder', item.id)
    setTimeout(() => {
      document.getElementById(item.id).scrollIntoView()
      // the next line is required to work around a bug in WebKit (Chrome / Safari)
      //   location.href = '#'
      //   // for mobile
      //   location.href = '#' + item.id
      document.getElementById(item.id).focus()
    }, 33)

    todos.update(item)
    toast.showMessage('Todo reordenado', 'warning')
  }
</script>

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
    on:click={showInputTodo(item)}
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

<style>
</style>
