<script>
    import { user, auth } from "../stores/user"
    import {
        getAuth,
        signOut,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
    } from "firebase/auth"
    import { navigate } from "svelte-routing"

    export let toast

    let email = "",
        password = ""

    const createUser = () => {
        // TODO extract validation as func
        if (!email.trim() || !password.trim()) {
            console.log("campos vacios")
            //alert("campos vacios")
            toast.showMessage("input email and password", "danger")
            return
        }

        console.log($user)

        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in // TODO: extract this part as func common w login
                const authUser = userCredential.user
                console.log("create user:", authUser)

                user.set({
                    displayName: email,
                    uid: authUser.uid, //Date.now(),
                })

                email = ""
                password = ""
                toast.showMessage("User created", "success")
                navigate("/todos", { replace: true })
            })
            .catch((error) => {
                // const errorCode = error.code
                const errorMessage = error.message
                // let opt = {text: errorMessage, color: 'danger'}
                //  console.log('toast', toast, error)
                toast.showMessage(errorMessage, "danger")
                // alert (error)
            })
    }

    const procesarFormulario = () => {
        if (!email.trim() || !password.trim()) {
            console.log("campos vacios")
            //alert("campos vacios")
            toast.showMessage("input email and password", "danger")
            return
        }

        console.log($user)

        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const authUser = userCredential.user
                console.log("auth user:", authUser)

                user.set({
                    displayName: email,
                    uid: authUser.uid, //Date.now(),
                })

                email = ""
                password = ""

                navigate("/todos", { replace: true })
            })
            .catch((error) => {
                // const errorCode = error.code
                const errorMessage = error.message
                // let opt = {text: errorMessage, color: 'danger'}
                //  console.log('toast', toast, error)
                toast.showMessage(errorMessage, "danger")
                // alert (error)
            })
    }

    const cerrarSesion = () => {
        // user.set(null)
        // navigate("/", { replace: true })
        try {
            const auth = getAuth()
            signOut(auth)
                .then(() => {
                    console.log("Sign-out successful.")
                })
                .catch((error) => {
                    // An error happened.
                    console.log("error while logging out", error)
                })
        } catch (error) {
            console.log(error)
        } finally {
            user.set(null)
            localStorage.setItem("userTodos", JSON.stringify(null))
            //navigate("/login", { replace: true })
        }
    }
</script>

<div>
    <h2>Login</h2>

    {#if $user}
        Logged as: {$user.displayName}
        <br />
        <button class="my-2 btn btn-primary" on:click={cerrarSesion}
            >Log out</button
        >
    {:else}
        <form on:submit|preventDefault={procesarFormulario}>
            <input type="text" placeholder="Email" bind:value={email} />
            <input type="text" placeholder="Password" bind:value={password} />
            <button type="submit" class="my-2 btn btn-primary">Login</button>
        </form>
        <hr />
        <h3>Or register as new user</h3>
        <form on:submit|preventDefault={createUser}>
            <input type="text" placeholder="Email" bind:value={email} />
            <input type="text" placeholder="Password" bind:value={password} />
            <button type="submit" class="my-2 btn btn-danger">Register</button>
        </form>
    {/if}
</div>
