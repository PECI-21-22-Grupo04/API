

<script>
    import { onMount } from 'svelte';
    import Card from "../Card.svelte";
    import { goto } from "$app/navigation";
    let parsed_data = [];
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
    let durations = {};
    function select(exercise){
        for (let index = 0; index < plan.exercises.length; index++) {
            if(plan.exercises[index].exercise.exerciseID == exercise.exerciseID 
            || repeats[exercise.exerciseID] == null 
            || sets[exercise.exerciseID] == null 
            ){
                return;
            }
            
        }
        if (repeats != {} && sets!={} && durations != {}) {
        /*     plan.exercises = plan.exercises.filter( (value) => {
                if( value.exercise.exerciseID == exercise.exerciseID) 
            }) */
            plan.exercises = [...plan.exercises, {exercise ,reps: repeats[exercise.exerciseID], sets: sets[exercise.exerciseID], durations:durations[exercise.exerciseID]}]
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
    .flex-container{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin: 20px  auto;
        
        height: 75vh;
        width: 90%;
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
    <div id="card" class="exercises bg-base-200"  >
        {#each [...parsed_data] as exercise }
        <Card >
            <div class="div-image ">
                <img class="m-auto img-card h-[200px] w-[325px]"  src={exercise.thumbnailPath} alt="" >
            </div>
            <div class="flex flex-col px-5">
                <div style="text-align: center;font-size: 1.2em;">{exercise.eName} </div>
                <div class="card-actions">
                    <div class="badge badge-outline" style="font-size: 0.8em;">{exercise.targetMuscle} </div>
                    <div class="badge badge-outline" style="font-size: 0.8em;">{exercise.difficulty} </div>

                </div>
                <label class="input-group mt-2">
                    <span>Sets</span> 
                    <input type="number" min="1" max="10" class=" input input-bordered w-full" bind:value={sets[exercise.exerciseID]}>
                </label>
                <label class="input-group my-2">
                    <span> Repeats </span>
                    <input type="number"  class=" input input-bordered w-full" min="1" max="20" bind:value={repeats[exercise.exerciseID]}>
                </label>
            </div>
            
            <button class="btn btn-info " on:click={() => select(exercise)}> select</button>
     <!--        Duration:
            <input type="number" bind:value={durations[exercise.exerciseID]}>
             -->
        </Card>
        {:else}
        <p>Não existem Exercicios</p>
        {/each}
    </div>
    <div class="timeline bg-base-200">
        
        {#each plan.exercises as selected}
        <div class="selected" style="border:1px solid;">
            
            <img style="margin:10px;" src={'/exercises/' + selected.exercise.thumbnailPath} alt="">
            <div style="margin:1px" >
                <p>  {selected.reps} rep </p>

            </div>
            <div style="margin:1px">

                <p style="margin:1px">  {selected.sets} steps </p>
            </div>
            <div style="margin:1px">

                <p>  {selected.durations} dur </p>
            </div>
            <div class="delete" on:click={()=> deleteExercise(selected.exercise)}>X</div>
        </div>
        {/each}

    </div>
</div>
