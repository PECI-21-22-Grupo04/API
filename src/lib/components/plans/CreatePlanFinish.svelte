<script>
import { goto } from "$app/navigation";

import Card from "$lib/components/Card.svelte";
import { onMount } from "svelte";
export let plan;
export let current;
onMount(()=>{
    console.log( "SIAOSAOSOAOSA " +  plan.exercises)

})
async function createProgram(){
    let error = undefined
        console.log(plan)
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
function back(){
    current = 1;
}
</script>

<style>
    .details{
    margin: 20px auto;
    height: 90%;
    display:flex;
    flex-direction: column;
    width: 90%;
    box-shadow: 1px 1px 1rem rgba(0, 0, 0, 0.2);
}
.container{
    width: 90%;
    display: flex;
    flex-direction: row;
    height: fit-content;
    gap:20px;
    padding:10px;
    overflow-x: auto;
    margin: 20px auto; 
    
    
    }
    .description
    .container::-webkit-scrollbar-track, .description::-webkit-scrollbar-track {
        /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
        border-radius: 10px;
       
    }
    
    .container::-webkit-scrollbar, .description::-webkit-scrollbar {
        width: 8px;
        
    }
    
    .container::-webkit-scrollbar-thumb, .description::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #3d3d3d;
    }
    .description{
        width: 300px;
        
        word-wrap: break-word;

    }
</style>
<div class="details bg-base-200">
    
    <p class="text-3xl font-bold mt-5 mx-auto">{plan.pname}</p>
    <div class="flex flex-row gap-10 mx-10 items-center">
        <div class="container">
            {#each [...plan.exercises] as selected}
    
            <!-- <div class="bg-base-100"> -->
                <Card path = "/user/exercises/{selected.exercise.exerciseID}" details={0} >
                    <div class="div-image">
                        <img class="m-auto h-[200px] w-[325px]" src={  selected.exercise.thumbnailPath} alt="" >
                    </div>
                    <div style="text-align: center;font-size: 1.2em;">{selected.exercise.eName} </div>
                    
                    <div class="card-actions">
                        <div class="badge badge-primary  " >Sets</div>
                        <div> {selected.sets} </div>
                    </div>
                    <div class="card-actions">
                        <div class="badge badge-secondary " >Reps</div>
                        <div> {selected.reps} </div>
                    </div>
                </Card>
    
           <!--  </div>  -->
        
            {/each}
        </div>
        <div class=" text-wrap h-[325px] flex flex-col " >
            <p class="text-3xl font-bold mt-5 mx-auto " >Description </p>
            <div class="description" style="overflow:auto" >{plan.pdescription}</div>

        </div>
    </div>
    
    <div style="display:flex; overflow:auto">
        <button class="btn btn-error ml-10 my-10" on:click={back} >Retroceder</button>
        <button class="btn btn-success ml-auto mr-10 my-10" on:click={createProgram} >Confirmar</button>
    </div>
   
</div>