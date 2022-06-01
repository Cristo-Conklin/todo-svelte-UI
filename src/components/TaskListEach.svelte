<script>
  import TLEachTitleAndDescription from './TLEachTitleAndDescription.svelte'

  import TLEachTags from './TLEachTags.svelte'
  import TLEachNoteBottom from './TLEachNoteBottom.svelte'

  import { todos } from '../stores/todo'

  import _ from 'lodash'

  export let toast
  export let param, order

  let showInput = false,
    editID = -1,
    showAddTagInput = false

  // UPDATE TITLE AND DESCRIPTION
  const showInputTodo = (item) => {
    showInput = !showInput
    editID = item.id

    var textarea = document.getElementById(`textarea-${item.id}`)
    textarea.scrollHeight = auto
  }

  // TAGS . extracted to TLEachTags
  const showAddTag = (id) => {
    showAddTagInput = showAddTagInput ? false : id
  }
</script>

{#each _.orderBy($todos, [param], [order]) as item (item.id)}
  <div class="shadow my-3 p-3 lead bg-warning " id={item.id}>
    <!-- title and description -->
    <TLEachTitleAndDescription
      bind:item
      {toast}
      {showInputTodo}
      bind:showInput
      bind:editID
    />

    <!-- tags badges . Extracted to TLEachTags -->
    <TLEachTags {todos} {toast} bind:item bind:showAddTagInput />

    <!-- note bottom buttons. Extracted compo TLEachNoteBottom-->
    <TLEachNoteBottom {todos} {toast} bind:item {showAddTag} {showInputTodo} />
  </div>
{/each}

<style>
</style>
