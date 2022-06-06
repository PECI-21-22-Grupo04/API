<script context="module">
    export async function load({ params }) {
    const url = `/user/clients/${params.id}`;
    console.log(url)
    return {
        props: {
            url: url,
        }
    }
  }
</script>
<script>

    import {onMount} from 'svelte';
    import {session } from '$app/stores';
    import { goto } from "$app/navigation";
    import SelectPlan from "$lib/components/clients/SelectPlan.svelte";
    import { page } from '$lib/store/store.js';
    let client = {}
    export let url;
    let toggle=0;
    let exer;
    let birthdate;
    let signday;
    let signhour;

    onMount(async ()=>{
        
        console.log(url)
        const res = await fetch(url, {
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
        client = data.parsed_data[0];
        console.log(client.birthdate.substring(0,10))
        birthdate = client.birthdate.substring(0,10)
        signday = client.clientSince.substring(0,10)
        signhour = client.clientSince.substring(11,19)
        page.update(n => 
            n = `Cliente ${client.firstName} ${client.lastName}`
        )
    })
    function AddExerc(){
        toggle = 1;
    }
    function plandetails(){
        toggle = 0;
    }
</script>
<style>
    a{
        text-decoration: none;
        color:black;
        padding: 10px;
        width: fit-content;
        border: 1px solid black;
    }
    
    .detailedPlan {
        display: flex;
        flex-direction: column;
        position: absolute;
        padding: 6rem 3rem 6rem 6rem;
        background: #fff;
        max-width: 400px;
        border-radius: 10px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 1px 1px 2rem rgba(0, 0, 0, 0.3);
        margin: 0 auto;
    
        
    }

    .card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 400px;
  
  text-align: center;
}

.title {
  color: grey;
  font-size: 18px;
}



a {
  text-decoration: none;
  font-size: 22px;
  color: black;
}


</style>

 <!-- Add icon library -->
 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">




{#if toggle == 0}
<div class="card bg-base-100 mx-auto mt-[50px] px-10">
    <img src="/Profileicon.png" alt="ProfilePic" style="width:100%">
    <h1>{client.firstName} {client.lastName}</h1>
    <p class="title">{client.mail}</p>
    <h3>{client.sex}</h3>
    <h1>Data de Nascimento: {birthdate}</h1>
    <h1>Este utilizador associou se em: {signhour} {signday}</h1>
    <p>

    </p>
    <a href="#"><i class="fa fa-twitter"></i></a>
    <a href="#"><i class="fa fa-linkedin"></i></a>
    <a href="#"><i class="fa fa-facebook"></i></a>
    <p></p>
    <button class="btn btn-info my-5" on:click={AddExerc}> Partilhar planos</button>
  </div> 
    <!-- <div   class="wrapper">
            <div  class="detailedPlan">
                <h1 class="col" style="text-align: center;"  >{client.firstName} {client.lastName}</h1>
                <h1 class="col"> </h1>
                <h1 class="col">Data de Nascimento: {client.birthdate} </h1>
                <h1 class="col"> Este utilizador associou se em:{client.clientSince} </h1>

                <a href="/user/clients">Back</a>

            </div>
        
        
    </div> -->
{:else}
    <SelectPlan bind:toggle client={client} clientmail={client.mail}/>
{/if}
<div>

</div>
