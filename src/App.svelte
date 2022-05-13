<script>
	import Todos from "./components/Todos.svelte";
	import Login from "./components/Login.svelte";
	import { Router, Link, Route } from "svelte-routing";
    import { user } from "./stores/user";
</script>

<main>
	<div class="container">
		<h1 class="my-3 display-6 text-warning text-center fst-italic">TODO</h1>

		<Router>
			<nav>
				<Link to="/">Home</Link>
				<Link to="/login">{ $user ? 'Logout' : 'Login'}</Link>
				{#if $user}<Link to="/todos">Dashboard</Link>{/if}
			</nav>

			<hr />

			<Route path="/">
				Welcome <hr>
				<Login />
			</Route>
			<Route path="/login">
				<Login />
			</Route>
			<Route path="/todos">
				<Todos />
			</Route>
		</Router>
	</div>
</main>

<style>
</style>
