

<script>
    import { onMount } from 'svelte';
    import Card from "../Card.svelte";
    import { goto } from "$app/navigation";
    let parsed_data = [];
    import { fade, slide } from 'svelte/transition';
    export let plan;
    let details = 0
    let alert = 0;


    onMount(async ()=>{
        console.log(" : session email")

        const res = await fetch('/user/exercises', {
        method: 'POST',
        body:JSON.stringify({                    
            email: plan.email
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
    function select(exercise){
        for (let index = 0; index < plan.exercises.length; index++) {
            if(plan.exercises[index].exercise.exerciseID == exercise.exerciseID 
            || repeats[exercise.exerciseID] === undefined 
            || sets[exercise.exerciseID] === undefined 
            ){
                return;
            }
            
        }
        if (repeats != {} && sets!={}) {
            
            plan.exercises = [...plan.exercises, {exercise ,reps: repeats[exercise.exerciseID], sets: sets[exercise.exerciseID]}]
        }
    }
    function deleteExercise(exercise){
        for (let index = 0; index < plan.exercises.length; index++) {
            if(plan.exercises[index].exercise.exerciseID == exercise.exerciseID 
            ){
                plan.exercises.splice(index,1);
                plan.exercises = plan.exercises; 
            }
            
        }
    }
    async function confirm(){
        let error = undefined;
        try {
            const res = await fetch('/user/plans/exercisestoplan', {
                method: 'POST',
                body:JSON.stringify(                    
                    plan,
                ),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(res.ok){
                goto('/user/plans')
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
        {#each [...parsed_data] as exercise }
        <Card path = "" details={details} >
            <div class="div-image">
                <img class="m-auto img-card" src={exercise.thumbnailPath} alt="" >
            </div>
            <div style="text-align: center;font-size: 1.2em;">{exercise.eName} </div>
            <div style="font-size: 0.8em;">{exercise.targetMuscle} </div>
            <div style="font-size: 0.8em;">{exercise.difficulty} </div>
            Sets:
            <input type="number" bind:value={sets[exercise.exerciseID]}>
            Repeats:
            <input type="number" bind:value={repeats[exercise.exerciseID]}>

            <button on:click={() => select(exercise)}> select</button>
        </Card>
        {:else}
        <p>Loading</p>
        {/each}
    </div>
    <div class="timeline">
        
        {#each plan.exercises as selected}
            <div class="selected">
                <img src={selected.exercise.thumbnailPath} alt="">
                <p>reps:  {selected.reps}  </p>
                <p>steps:  {selected.sets}  </p>
                <div class="delete" on:click={()=> deleteExercise(selected.exercise)}>X</div>
            </div>
        {/each}
    </div>
</div>
<div class="flex-container">
</div>
