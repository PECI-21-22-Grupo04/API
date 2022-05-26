

<script>
    import { onMount } from 'svelte';
    import Card from "../Card.svelte";
    import { goto } from "$app/navigation";
    let parsed_data = [];
    import { fade, slide } from 'svelte/transition';
    export let plans = [];
    let details = 0
    let alert = 0;
    export let clientmail = "";
    import { session } from '$app/stores';


    onMount(async ()=>{
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
                goto('/user/clients')
            }else{
                error= 'An error occurred'
            }
        } catch (err) {
            console.log(err)
            error = 'An error occurred'
        }
    }   
</script>


<style>
    
    .exercises{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(235px,235px));
        gap:50px;
        grid-auto-flow: row; 
        background-color: white;
        padding: 20px;
        margin: 20px  auto;
        width: 100%;
        height: 90%;
        overflow-y: auto;
        box-shadow: 1px 1px 1rem rgba(0, 0, 0, 0.2);
    }
    .exercises::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background-color: #f5f5f5;
    }
    
    .exercises::-webkit-scrollbar {
        width: 8px;
        background-color: #f5f5f5;
    }
    
    .exercises::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #3d3d3d;
    }
    .flex-container{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 20px  auto;
        height: 75%;
        width: 90%;
    }
    

    .timeline {
        display: flex;
        width: 300px;
        margin-top: 20px;
        margin-left: 30px;
        margin-right: 30px;
        flex-direction: column;
        left: var(--sidebar-width);
        height: 100%;
        overflow-y: auto;
        background-color: #fff;
        transition: left var(--sidebar-animation-time) var(--sidebar-animation-curve);
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
    button{
        height: 36px;
        background-color: #eee;
        width: fit-content;
        margin: auto;
        border: 1px solid black;
        cursor: pointer;
    }

    button:hover{
        background-color: #222;
        color: #fff
    }
    
</style>
<button on:click={confirm} >Confirm</button>
<div class="flex-container">
    <div id="card" class="exercises" in:slide="{{delay: 300, duration: 300}}" out:fade="{{duration: 300}}" >
        {#each [...parsed_data] as plan }
        <Card path = "" details={details} >
            <div class="div-image">
                <img class="m-auto img-card" src="/planosdummy.jpg" alt="" >
            </div>
            <div style="text-align: center;font-size: 1.2em;">{plan.pName} </div>

            <button on:click={() => select(plan)}> select</button>
        </Card>
        {:else}
        <p>Loading</p>
        {/each}
    </div>
    <div class="timeline">
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

    <button on:click={confirm} >Confirm</button>
</div>
