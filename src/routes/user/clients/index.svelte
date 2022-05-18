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
        console.log("JASJSJSA" +parsed_data)
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
  background: #8EB5CD;
  color: white;
  font-size: 30px;
}
</style>

<div>

    <h1 class="xpto">Clientes</h1>
</div>
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


