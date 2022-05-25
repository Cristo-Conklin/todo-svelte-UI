<script>
  import TaskListOrders from './TaskListOrders.svelte'
  import TaskListEach from './TaskListEach.svelte'

	export let toast
	$: param = 'sort_order'
	$: order = 'asc'
	// export let param, order

</script>

<TaskListOrders bind:param bind:order />

<hr>

<TaskListEach {toast} bind:param bind:order />

<style>
</style>
