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
    let pause
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
    function play(){
        pause = !pause;
    }
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
    width: 60%;
    height: 80%;
    display: flex;
    flex-direction: column;
    position: absolute;
    padding: 1rem 1rem 2rem 2rem;
    background: #fff;
    justify-content:center;
    text-align: center;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 1px 1px 2rem rgba(0, 0, 0, 0.3);
    margin: 0 auto;
    
    }
    .div-video{
        width: 100%;
        display: flex;
        align-items: center;
    }
    video{
        max-width: 400px ;
    }
</style>
<div   class="wrapper"> 
    {#each [...parsed_data] as exercise}
        <div  class="detailedPlan">
            <div class="div-video">
                <video src={exercise.videoPath} poster={exercise.thumbnailPath} bind:paused={pause}>
                    <track kind="captions">
                </video>
                <button on:click={play}>Play</button>

            </div>
            <!-- <div style="display:flex;justify-content:center;"class="div-image">
                <img class="m-auto img-card" style=" width:300px" src={ exercise.thumbnailPath } alt="" >
            </div> -->
            <p></p>
            <h1 class="col" style="text-align: center;"  >{exercise.eName}</h1>
            <h1 class="col"> targetMuscle: {exercise.targetMuscle} </h1>
            <h1 class="col"> Difficulty: {exercise.difficulty} </h1>
            <h1 class="col"> Description: {exercise.eDescription} </h1>
            <h1 class="col"> Pathologies: {exercise.forPathology} </h1>
            <h1 class="col">Exerc : {exercise.videoPath} </h1>
            <!-- <div class="bck-btt">  <button  onclick="window.location.href='/plans/single/edit/'" >Edit</button></div> -->
        </div>
        {/each}
        
    </div>
<a href="/user/exercises">Back</a>