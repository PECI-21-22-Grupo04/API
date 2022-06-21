

<script>
    import { onMount } from 'svelte';
    import Card from "../Card.svelte";
    import {exerciseList} from "$lib/store/store.js"
    import { goto } from "$app/navigation";
    export let plan;
    export let toggle;
    let parsed_data = [];
    let details = 0
    let alert = 0;

    onMount(async ()=>{

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
    
    /* const resExes = await fetch('/user/plans/selectexercises', {
        method: 'POST',
        body:JSON.stringify({                    
            programID: plan.programID
        }),
        headers: {
            'Content-Type': 'application/json',
            accept: "application/json"
        }
    })


    const dataExes = await resExes.json();
    plan["exercises"] = [...dataExes.arr]
    console.log(plan.exercises) */
    })


    let repeats = {};
    let sets = {};
    let durations = {};
    function select(exercise){
        for (let index = 0; index < plan.exercises.length; index++) {
            if(plan.exercises[index].exerciseID == exercise.exerciseID 
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
            exercise["numSets"]=sets[exercise.exerciseID];
            exercise["numReps"]=repeats[exercise.exerciseID];
                       
            plan.exercises = [...plan.exercises, exercise]
            console.log(plan)
            console.log($exerciseList)
        }
    }



    function deleteExercise(exercise){
        for (let index = 0; index < plan.exercises.length; index++) {
            if(plan.exercises[index].exerciseID == exercise.exerciseID 
            ){
                plan.exercises.splice(index,1);
                plan.exercises = plan.exercises; 
            }
            
        }
    }
    async function confirm(){
        let error = undefined;
        try {
            const res = await fetch('/user/plans/editexercisestoplan', {
                method: 'POST',
                body:JSON.stringify({
                    plan,
                    exercisesToDelete: $exerciseList
                }                    
                ),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(res.ok){
                $exerciseList= [...plan.exercises]
                toggle=false;
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
            
                <img class="m-auto img-card h-[200px] w-[325px]"  src={exercise.thumbnailPath} alt="" >
            
            <div class="flex flex-col px-5">
                <div style="text-align: center;font-size: 1.2em;">{exercise.eName} </div>
                
                    <div class="card-actions my-1 mx-auto gap-2">
                        {#if exercise.difficulty == "Fácil"}
                            <h1 class="badge badge-outline badge-success badge ml-auto" >{exercise.difficulty }</h1>
                        {:else if exercise.difficulty == "Média" }    
                            <h1 class="badge badge-outline badge-warning badge ml-auto " >{exercise.difficulty }</h1>
                        {:else}
                            <h1 class="badge badge-outline badge-error badge ml-auto " >{exercise.difficulty }</h1>
    
                        {/if }
                            <h1 class="badge badge-outline badge mr-auto "  > {exercise.targetMuscle }</h1>
    
                    </div>
                
                <div class="flex flex-row my-4 ">
                    <label class="input-group ">
                        <span>Sets</span> 
                        <input  type="number" min="1" max="10" class=" input input-bordered w-[75px]" bind:value={sets[exercise.exerciseID]}>
                    </label>
                    <label class="input-group ">
                        <span> Reps </span>
                        <input type="number"  class=" input input-bordered w-[75px]" min="1" max="20" bind:value={repeats[exercise.exerciseID]}>
                    </label>

                </div>
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
    <div style=" box-shadow: 1px 1px 2rem rgba(0, 0, 0, 0.3);" class="flex flex-col justify-center bg-base-200 h-full transition ease-in-out ml-10">

        <div class="snap-x timeline overflow-x-hidden my-auto p-5 gap-5 h-full" >
        
        {#each plan.exercises as selected}
        
        <div class = "bg-base-100 flex flex-row w-[400px] " style=" height: 160px ; border-radius: 25px; margin-top:20px;  box-shadow: 1px 1px 2rem rgba(0, 0, 0, 0.3);">
            <div class="w-[200px]" >

                <img src={selected.thumbnailPath} alt="" class="w-full h-full" style="border-radius: 25px;">
            </div>
            <div class="w-[250px] overflow-hidden mx-auto py-5" >
                <h1 class="mx-auto w-full text-center h-[30px] overflow-hidden" style="font-size:x-large;font-weight:700;">{selected.eName }</h1>
                <div class="flex flex-row my-5 gap-2">
                    {#if selected.difficulty == "Fácil"}
                        <h1 class="badge badge-outline badge-success badge-lg ml-auto" >{selected.difficulty }</h1>
                    {:else if selected.difficulty == "Média" }    
                        <h1 class="badge badge-outline badge-warning badge-lg ml-auto " >{selected.difficulty }</h1>
                    {:else}
                        <h1 class="badge badge-outline badge-error badge-lg ml-auto " >{selected.difficulty }</h1>

                    {/if }
                        <h1 class="badge badge-outline badge-lg mr-auto "  > {selected.targetMuscle }</h1>

                </div>
                
                <div class="flex flex-row">

                        <div class="badge badge-primary ml-auto " >Sets</div>
                        <div class="ml-3"> {selected.numSets} </div>
                    
                    
                        <div class="badge badge-secondary ml-3" >Reps</div>
                        <div class="ml-3 mr-auto" > {selected.numReps} </div>
                    
                </div>
            </div>
            <button class="btn p-2 z-99 bg-base-300 my-auto mx-1" style="width:fit-content; heigth:fit-content" on:click={() => deleteExercise(selected)}>

                <img src="/delete.svg" alt="" style="width:30px; height:30px" >
            </button>
        </div>
        {/each}

        </div>
    <div class="btn btn-success" on:click={confirm} > Confirmar</div>
</div>
</div>