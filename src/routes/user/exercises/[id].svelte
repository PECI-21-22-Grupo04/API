<script context="module">
    export async function load({ params }) {
    const url = `/user/exercises/${params.id}`;
    console.log(url)
    return {
        props: {
            url: url,
        }
    }
  }
</script>
<script>
    import Chat from "$lib/components/chat.svelte";
    import {onMount} from 'svelte';
    import { page, session } from '$app/stores';
    
    let parsed_data=[];
    export let url;

    onMount(async ()=>{
        console.log(url)
        const res = await fetch(url, {
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
    })
    console.log(parsed_data);

</script>
<style>
    a{
        text-decoration: none;
        color:black;
        padding: 10px;
        width: fit-content;
        border: 1px solid black;
    }
    a:hover{
        color: white;
        background-color: black;
    }
    
    .detailedPlan {

/* 
    width: 130px;
    height: 130px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background-color: gray;
    border-radius: 100%; 
      top: 50%;
    left: 50%;
     transform: translate(-50%, -50%);
    */
    display: flex;
    flex-direction: column;
    position: absolute;
    padding: 1rem 1rem 2rem 2rem;
    background: #fff;
    max-width: 400px;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 1px 1px 2rem rgba(0, 0, 0, 0.3);
    margin: 0 auto;
    
    }
</style>
<div   class="wrapper"> 
    {#each [...parsed_data] as exercise}
        <div  class="detailedPlan">
            <div class="div-image">
                <img class="m-auto img-card" src={'/exercises/' + exercise.thumbnailPath } alt="" >
            </div>
            <h1 class="col" style="text-align: center;"  >{exercise.eName}</h1>
            <h1 class="col"> targetMuscle: {exercise.targetMuscle} </h1>
            <h1 class="col"> Difficulty: {exercise.difficulty} </h1>
            <h1 class="col"> Description: {exercise.eDescription} </h1>
            <h1 class="col"> Pathologies: {exercise.forPathology} </h1>
            <h1 class="col">Exerc : {exercise.thumbnailPath} </h1>
            <a href="/user/exercises">Back</a>
            <!-- <div class="bck-btt">  <button  onclick="window.location.href='/plans/single/edit/'" >Edit</button></div> -->
        </div>
    {/each}
        
  </div>