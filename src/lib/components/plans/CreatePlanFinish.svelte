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
    background-color: white;
    width: 90%;
    box-shadow: 1px 1px 1rem rgba(0, 0, 0, 0.2);
}
.container{
    width: 90%;
    background-color: white;
    display: flex;
    flex-direction: row;
    height: fit-content;
    padding:10px;
    overflow-x: auto;
    margin: 20px auto; 
    
    }
    .container::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background-color: #f5f5f5;
    }
    
    .container::-webkit-scrollbar {
        width: 8px;
        background-color: #f5f5f5;
    }
    
    .container::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #3d3d3d;
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
<div class="details">
    <p>Name : {plan.pname}</p>
    <p>Description : {plan.pdescription}</p>
    <div class="container">
        {#each [...plan.exercises] as selected}
            <Card path = "/user/exercises/{selected.exercise.exerciseID}" details={0} >
                <div class="div-image">
                    <img class="m-auto img-card" src={ '/exercises/' + selected.exercise.thumbnailPath} alt="" >
                </div>
                <div style="text-align: center;font-size: 1.2em;">{selected.exercise.eName} </div>
                <div style="font-size: 0.8em;">Sets : {selected.sets} </div>
                <div style="font-size: 0.8em;">Reps : {selected.reps} </div>
            </Card>
    
        {/each}
    </div>
    <div style="display:flex;align-items:justify-content">
        <button on:click={back} >Back</button>
        <button on:click={createProgram} >Confirm</button>
    </div>
   
</div>