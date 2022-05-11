<script>
    import Card from "$lib/components/Card.svelte"
    import {fade} from 'svelte/transition'
    import {onMount} from 'svelte';
    import { session } from '$app/stores';
    
    let parsed_data=[];
    onMount(async ()=>{

        const res = await fetch('/user/clients', {
                method: 'POST',
                body:JSON.stringify({                    
                    email: $session.user.email
                }),
                headers: {
                    'Content-Type': 'application/json',
                    "accept": "application/json"
                }
            })
        const data = await res.json();
        parsed_data = data.parsed_data
        console.log(parsed_data)
    })

</script>
         
<style>
    h1{
        margin: 1px auto;

        /* top: 50px; */
    }
</style>

    <h1>Clientes</h1>
    <div class="content">
        {#each [...parsed_data] as exercise }
            <Card >
                <div class="div-image">
                    <img class="m-auto img-card" src="/Profileicon.png" alt="" >
                </div>
                <div style="text-align: center;font-size: 1.2em;">{exercise.firstName} </div>
            </Card>
        {:else}
            <p>Loading</p>
        {/each}
    </div>


