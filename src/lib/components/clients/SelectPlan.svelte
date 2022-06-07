

<script>
    import { onMount, onDestroy } from 'svelte';
    import Card from "../Card.svelte";
    import { goto } from "$app/navigation";
    let parsed_data = [];
    import { fade, slide } from 'svelte/transition';
    export let plans = [];
    let details = 0
    let alert = 0;
    export let clientmail = "";
    import { session } from '$app/stores';
    import { page } from '$lib/store/store.js';
    export let client;
    export let toggle;
    onMount(async ()=>{
        
        page.update(n => 
            n = `Associar Plano a ${client.firstName} ${client.lastName}`
        )
        console.log(" : session email")

        const res = await fetch('/user/plans', {
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
    let repeats = {};
    let sets = {};
    function select(plan){
        for (let index = 0; index < plans.length; index++) {
            if(plans[index].programID == plan.programID){
                return;
            }
            
        }
        
            
            plans = [...plans,plan ]
    }
    function deleteExercise(plan){
        for (let index = 0; index < plans.length; index++) {
            if(plans[index].programID == plan.programID )
            {
                plans.splice(index,1);
                plans = plans; 
            }
            
        }
    }
    async function confirm(){
        let error = undefined;
        try {
            const res = await fetch('/user/clients/planstoclient', {
                method: 'POST',
                body:JSON.stringify(                    
                    {plans,clientmail}
                ),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(res.ok){
                toggle = 0;
            }else{
                error= 'An error occurred'
            }
        } catch (err) {
            console.log(err)
            error = 'An error occurred'
        }
    }   
    function back(){
        page.update(n => 
            n = `Cliente ${client.firstName} ${client.lastName}`
        )
        toggle=0;
    }
    
</script>


<style>
    
    .exercises{
        /* display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px,300px)); */
        /* grid-templa
        te-rows: repeat(auto-fill, minmax(300px,300px)); */
        display: flex;
        flex-wrap: wrap;
        gap: 25px;
        padding: 20px;
        margin: 20px  auto;
        width: 100%;
        height: 100%;
        overflow: hidden;
        overflow-y: auto;
        box-shadow: 1px 1px 1rem rgba(0, 0, 0, 0.2);
    }
    .exercises::-webkit-scrollbar-track, .timeline::-webkit-scrollbar-track {
        
        border-radius: 10px;
       
    }
    
    .exercises::-webkit-scrollbar, .timeline::-webkit-scrollbar {
        width: 8px;
       
    }
    
    .exercises::-webkit-scrollbar-thumb, .timeline::-webkit-scrollbar-thumb {
        border-radius: 10px;
        
        background-color: #3d3d3d;
    }
    .timeline {
        display: flex;
        width: 300px;
        padding: 20px 10px;
        row-gap: 10px;
        margin: 20px  auto;
        margin-left: 10px;
        flex-direction: column;
        left: var(--sidebar-width);
        height: 100%;
        overflow-y: auto;
        transition: left var(--sidebar-animation-time) var(--sidebar-animation-curve);
        box-shadow: 1px 1px 1rem rgba(0, 0, 0, 0.2);
}
    .flex-container{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin: 20px  auto;
        
        height: 75vh;
        width: 90%;
    }
    .selected{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .selected img{
        height: 50px;
    }
    .delete{
        background-color: rgb(255, 51, 0);
        color: white;
        text-align: center;
        width: 35px;
        height: fit-content;
    }
   
</style>
<div class="flex-container">
    <div id="card" class="exercises bg-base-200" >
        {#each [...parsed_data] as plan }
        <Card path = "" >
            <div class="div-image"> 
                <img class="m-auto img-card" src="/planosdummy.jpg" alt="" >
            </div>
            <div class="font-bold text-xl mx-auto my-5">{plan.pName} </div>

            <button class="btn btn-info" on:click={() => select(plan)}> select</button>
        </Card>
        {:else}
        <p>Loading</p>
        {/each}
    </div>
    <div class="timeline bg-base-200">
        {clientmail}
        {#each plans as selected}

            <div class="selected">
                {JSON.stringify(selected.programID)}
                <img src="/planosdummy.jpg" alt="/planosdummy.jpg">
                <div class="delete" on:click={()=> deleteExercise(selected)}>X</div>
            </div>
        {/each}
    </div>
</div>
<div style="display:flex;align-items:center;">
    <button on:click={back} class="btn btn-error ml-auto mr-5" >Back </button>
    <button class="btn btn-success  ml-5 mr-auto" on:click={confirm} >Confirm</button>
</div>
