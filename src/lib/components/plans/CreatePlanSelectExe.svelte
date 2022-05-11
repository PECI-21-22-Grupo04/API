

<script>
    import { onMount } from 'svelte';
    import Card from "../Card.svelte";
    export let parsed_data;
    import { fade, slide } from 'svelte/transition';


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
        width: 90%;
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
    
</style>



<div id="card" class="exercises" in:slide="{{delay: 300, duration: 300}}" out:fade="{{duration: 300}}" >
    {#each [...parsed_data] as exercise }
    
    <Card path = "/user/exercises/{exercise.eName}">
        <div class="div-image">
            <img class="m-auto img-card" src={exercise.thumbnailPath} alt="" >
        </div>
        <div style="text-align: center;font-size: 1.2em;">{exercise.eName} </div>
        <div style="font-size: 0.8em;">{exercise.targetMuscle} </div>
        <div style="font-size: 0.8em;">{exercise.difficulty} </div>
    </Card>
    {/each}
</div>
