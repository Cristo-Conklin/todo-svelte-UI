<script>
    export let toast;

    import { todos } from '../stores/todo';

    import _ from 'lodash';

    export let param;
    export let order;

    let showInput = false,
        editID = -1,
        showAddTagInput = false,
        tagToAdd = '';

    // crud methods
    const delTodos = (id) => {
        todos.delete(id);
        toast.showMessage('Todo eliminado', 'danger');
    };

    const updateTodoState = (item) => {
        item.done = !item.done;
        todos.updateState(item);
        toast.showMessage('Estado del Todo actualizado', 'warning');
    };
    // auto binded, updates values
    const updateTodoDescription = (item) => {
        showInput = false;
        editID = -1;
        todos.update(item.id, item);

        toast.showMessage('Todo actualizado', 'warning');
    };
    const showInputTodoDescription = (item) => {
        showInput = true;
        editID = item.id;
    };
    function showAddTag(id) {
        showAddTagInput = showAddTagInput? false: id;
    }

    function addTag(item, tag) {
        if (!tag.trim()) return;

        item.tags.push(tag);
        showAddTagInput = false;
        tagToAdd = '';

        todos.update(item);
        toast.showMessage(`Tag añadida: ${tag}`, 'success');
    }

    function removeTag(item, tag) {
        console.log('trigger rem tag');
        let newTags = item.tags.filter(function (value, index, arr) {
            return value !== tag;
        });
        // todos.removeTag(item.id, newTags)
        item.tags = newTags;
        todos.update(item);
        toast.showMessage(`Tag quitada: ${tag}`, 'danger');
    }

    function switchVisibility(item) {
        item.public = !item.public;
        console.log(item);
        todos.update(item);
    }

    // computed:
    $: classdone = (done) =>
        done
            ? 'btn btn-sm bg-black text-warning'
            : 'btn btn-sm font-weight-bold btn-outline-warning border-dark text-dark';
    $: classIcono = (done) => (done ? 'bi bi-arrow-clockwise' : 'bi bi-check2');
    $: classtitleTachado = (done) =>
        done ? 'text-decoration-line-through text-black-50 small' : '';

    // sort order
    // $: todos = $todos.sort((a, b) => b.sort_order > a.sort_order)
    function notifySort(item) {
        console.log('reorder', item.id);
        // setTimeout(() => {document.getElementById(item.id).focus()}, 100)
        document.getElementById(item.id).focus();

        toast.showMessage('Todo reordenado', 'warning');
    }
</script>

{#each _.orderBy($todos, [param], [order]) as item (item.id)}
    <div class="shadow my-3 p-3 lead bg-warning ">
        {#if showInput && item.id == editID}
            <form on:submit|preventDefault={updateTodoDescription(item)}>
                <!-- svelte-ignore a11y-autofocus -->
                <textarea
                    type="textarea"
                    style="width: 100%"
                    autofocus
                    on:blur={updateTodoDescription(item)}
                    placeholder={item.title}
                    bind:value={item.title}
                />
            </form>
        {:else}
            <p
                class={classtitleTachado(item.done)}
                on:click={showInputTodoDescription(item)}
            >
                <span id={item.id}>
                    {item.title}
                </span>
            </p>
        {/if}

        <!-- tags badges -->
        <div>
            {#each item.tags as tag}
                <span class="m-1 badge rounded-pill bg-secondary"
                    >{tag}&nbsp
                    <i class="bi bi-x-circle" on:click={removeTag(item, tag)} />
                </span>
            {/each}

            {#if showAddTagInput == item.id}
                <form on:submit|preventDefault={addTag(item, tagToAdd)} >
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

        <div class="row">
            <!-- actions buttons -->
            <button
                on:click={updateTodoState(item)}
                class="{classdone(item.done)} col-auto my-auto"
            >
                <i class={classIcono(item.done)} />
            </button>
            <button
                class="btn btn-sm btn-danger col-auto  my-auto"
                on:click={delTodos(item.id)}
            >
                <i class="bi bi-trash" />
            </button>
            <button
                on:click={showInputTodoDescription(item)}
                class="btn btn-sm btn-info border-dark col-auto  my-auto"
            >
                <i class="bi bi-pencil" />
            </button>

            <!-- tag btn -->
            <button
                on:click={showAddTag(item.id)}
                class="btn btn-sm btn-secondary border-dark col-auto  my-auto"
            >
                <i class="bi bi-tags" />
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
                <label class="form-check-label " for="{item.id}-public"
                    >Public</label
                >
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
