<script>
    import Card from "$lib/components/Card.svelte"
    import {fade} from 'svelte/transition'
    export let parsed_data;
    console.log([...parsed_data]);
</script>
         
<style>
    h1{
        margin: 1px auto;

        /* top: 50px; */
    }
</style>


    <h1>Exercicios</h1>
    <div class="content">
        <Card path="/user/exercises/createexe" starter= {1}/>
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


