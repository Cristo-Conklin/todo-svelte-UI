<script>
  import { todos } from '../stores/todo'

  export let toast, item, showAddTagInput

  let tagToAdd = ''

  // TAGS . (extracted to TLEach)
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
</script>

<div class="my-3">
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

<style>
</style>
