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
    import Chat from "$lib/components/chat.svelte";
    import {onMount} from 'svelte';
    import { page, session } from '$app/stores';
    import { goto } from "$app/navigation";
    import SelectPlan from "$lib/components/clients/SelectPlan.svelte";
    let client = {}
    export let url;
    let toggle=0;
    let exer;
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
</style>
{#if toggle == 0}
    <div   class="wrapper">
            <div  class="detailedPlan">
                <h1 class="col" style="text-align: center;"  >{client.firstName}</h1>
                <h1 class="col">{client.lastName} </h1>
                <h1 class="col">{client.birthdate} </h1>
                <a href="/user/clients">Back</a>
                <!-- <div class="bck-btt">  <button  onclick="window.location.href='/plans/single/edit/'" >Edit</button></div> -->
            </div>
        
        
    </div>
{:else}
    <SelectPlan/>
{/if}
  <button on:click={AddExerc}> Add Exercises to Plan</button>
  <button on:click={plandetails}> Plan</button>