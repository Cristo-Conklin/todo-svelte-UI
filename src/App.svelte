<script>
	import Todos from "./components/Todos.svelte"
	import Login from "./components/Login.svelte"
	import { Router, Link, Route } from "svelte-routing"
	import { user } from "./stores/user"
	import TodoToast from "./components/TodoToast.svelte"
	import NotFound from "./components/__error.svelte"

	let toast
</script>

<main>
	<div class="container">
		<h1 class="my-3 display-6 text-warning text-center fst-italic">TODO</h1>

		<!-- TodoToast notify -->
		<TodoToast bind:toast />

		<Router>
			<nav class="navbar">
				<div class="container-fluid">
					<Link to="/">Home</Link>
					{#if $user}
						<Link class="ms-auto mx-2" to="/todos">Dashboard</Link>
					{/if}
					<Link class="" to="/login">
						{$user ? "Logout" : "Login"}
					</Link
					>
				</div>
			</nav>

			<hr />

			<Route path="/">
				Welcome <hr />
				<Login {toast} />
			</Route>
			<Route path="/login">
				<Login {toast} />
			</Route>
			<Route path="/todos">
				<Todos {toast} />
			</Route>
			<Route component={NotFound} />
		</Router>
	</div>
</main>

<style>
</style>
