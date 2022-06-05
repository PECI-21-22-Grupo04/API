<script>
    import Card from "$lib/components/Card.svelte"
    import {fade } from 'svelte/transition'
    import {onMount,onDestroy} from 'svelte';
    import { session } from '$app/stores';
    import { page } from '$lib/store/store.js';
    
    let parsed_data=[];
    
    onMount(async ()=>{
     
        page.update(n => 
            n = "Clientes"
        )
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
        console.log("JASJSJSA" +parsed_data)
    })

    onDestroy(async ()=>{
        page.update(n => 
            n = ""
        )


    })
</script>
         
<style>
    h1{
        margin: 1px auto;

        /* top: 50px; */
    }

    .xpto {
  padding: 40px;
  text-align: center;

  font-size: 30px;
}
</style>

    <div class="content">
        {#each [...parsed_data] as client }
            <Card path="/user/clients/{client.clientID}">
                <div class="div-image">
                    <img class="m-auto img-card" src="/Profileicon.png" alt="ProfilePic" >
                </div>
                <div style="text-align: center;font-size: 1.2em;">{client.firstName} </div>
            </Card>

        {/each}
    </div>


