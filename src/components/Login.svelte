<script>
    import { user } from "../stores/user"
    import { navigate } from "svelte-routing"

    let email = "",
        password = ""

    const procesarFormulario = () => {
        if (!email.trim() || !password.trim()) {
            console.log("campos vacios")
            alert("campos vacios")
            return
        }

        user.set({
            displayName: email,
            uid: Date.now(),
        })

        email = ""
        password = ""

        console.log($user)
        navigate("/login", { replace: true })
    }

    const cerrarSesion = () => {
        user.set(null)
        navigate('/', { replace: true })
    }

</script>

<div>
    <h2>Login</h2>

    {#if $user}
        Logged as: {$user.displayName}
        <br />
        <button class="my-2 btn btn-primary" on:click={cerrarSesion}>Log out</button>
     {:else}
        <form on:submit|preventDefault={procesarFormulario}>
            <input type="text" placeholder="Email" bind:value={email} />
            <input type="text" placeholder="Password" bind:value={password} />
            <button type="submit" class="my-2 btn btn-primary">Login</button>
        </form>
    {/if}
</div>
