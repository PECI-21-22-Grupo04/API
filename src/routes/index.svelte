<script>
    import { fade} from 'svelte/transition';
    import Login from '$lib/components/auth/Login.svelte'
    import Register from '$lib/components/auth/Register.svelte'
    import {goto} from '$app/navigation'


    // Import the functions you need from the SDKs you need

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
<main >
    <img src="/logo.png" alt="">
    
    {#if current == 0}
        <Login on:success={redirectToUser} bind:current/>
    {:else}
        <Register on:success={redirectToUser} bind:current/>    
    {/if}
</main>