<script>
    import { fade} from 'svelte/transition';
    import Login from '$lib/components/auth/Login.svelte'
    import Register from '$lib/components/auth/Register.svelte'
    import {goto} from '$app/navigation'
    let current = 0;
    const components = [Login,Register]
    async function redirectToUser(){
        goto('/user')
    }
</script>
<style>
    main{
        display:flex;
        align-items: center;
        flex-direction: column;
        
        
    }
    img{
        width: 300px;
    }
</style>
<main>
    <img src="/logo.png" alt=""><br><br>
    <svelte:component on:success={redirectToUser} bind:current this={components[current]}/>
</main>