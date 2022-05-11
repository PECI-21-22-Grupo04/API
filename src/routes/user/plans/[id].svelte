<script context="module">
    export async function load({ params }) {
    const url = `/user/plans/${params.id}`;
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
import CreatePlanSelectExe from "$lib/components/plans/CreatePlanSelectExe.svelte";
    let plan = {}
    let parsed_data={};
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
        parsed_data = data.parsed_data
        
        plan = parsed_data[0];
        
        plan["email"] = $session.user.email
        console.log(plan)
        
        const res2 = await fetch('/user/plans/selectexercises', {
                method: 'POST',
                body:JSON.stringify({                    
                    programID:plan.programID
                }),
                headers: {
                    'Content-Type': 'application/json',
                    "accept": "application/json"
                }
            })
        const data2 = await res2.json();
        
        exer = data2.parsed_data;
        plan["exercises"] = []

        
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

/* 
    width: 130px;
    height: 130px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background-color: gray;
    border-radius: 100%; 
      top: 50%;
    left: 50%;
     transform: translate(-50%, -50%);
    */
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
    {JSON.stringify(exer)}
    <div   class="wrapper">
            <div  class="detailedPlan">
                <h1 class="col" style="text-align: center;"  >{plan.pName}</h1>
                <h1 class="col"> Description: {plan.pDescription} </h1>
                <h1 class="col">Exerc : {plan.thumbnailPath} </h1>
                <a href="/user/plans">Back</a>
                <!-- <div class="bck-btt">  <button  onclick="window.location.href='/plans/single/edit/'" >Edit</button></div> -->
            </div>
        
        
    </div>
{:else}
    <CreatePlanSelectExe bind:plan/>
{/if}
  <button on:click={AddExerc}> Add Exercises to Plan</button>
  <button on:click={plandetails}> Plan</button>