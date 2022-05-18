<script>
    import Card from "$lib/components/Card.svelte"
    import {fade} from 'svelte/transition'
    import {onMount} from 'svelte';
    import { session } from '$app/stores';
    
    let parsed_data=[];
    onMount(async ()=>{

        const res = await fetch('/user/exercises', {
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

</script>
         
<style>
    h1{
        margin: 1px auto;

        /* top: 50px; */
    }


    .xpto {
  padding: 40px;
  text-align: center;
  background: #8EB5CD;
  color: white;
  font-size: 30px;
}
</style>

    <!-- <h1>Exercicios</h1> -->
    <div>

        <h1 class="xpto">Exercícios</h1>
    </div>
    <div class="content">
        <Card path="/user/exercises/createexe" starter={1}/>
        {#each [...parsed_data] as exercise }
            <Card path = "/user/exercises/{exercise.exerciseID}">
                <div class="div-image">
                    <img class="m-auto img-card" src={'/exercises/' + exercise.thumbnailPath } alt="" >
                </div>
                <div style="text-align: center;font-size: 1.2em;">{exercise.eName} </div>
                <div style="font-size: 0.8em;">{exercise.targetMuscle} </div>
                <div style="font-size: 0.8em;">{exercise.difficulty} </div>
                <div style="font-size: 0.8em;border:1px solid;">{exercise.eDescription} </div>

            </Card>
 
        {/each}
    </div>


