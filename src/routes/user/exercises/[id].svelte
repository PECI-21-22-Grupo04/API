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

    import VideoPlayer from 'svelte-video-player';

    import {onMount} from 'svelte';
    import { page, session } from '$app/stores';
import { goto } from "$app/navigation";
    let pause
    let parsed_data=[];
    export let url;
    let data = {
    labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
    datasets: [
      {
        values: [10, 12, 3, 9, 8, 15, 9]
      }
    ]
  };
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
    async function back(){
        goto("/user/exercises")
    }

</script>
<style>
    button{
        text-decoration: none;
        color:black;
        padding: 10px;
        width: fit-content;
        border: 1px solid black;
        
    }
    button:hover{
        color: white;
        background-color: black;
    }
    .col{
        margin-top: 30px;
    }
    .detailedPlan {
        min-width: 400px;
    width: 47%;
    height: 50%;
    margin: 20px auto 20px auto;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 1rem 1rem 2rem 2rem;
    background: #fff;
    color: black;
    
    
    border-radius: 10px;
    

    box-shadow: 1px 1px 2rem rgba(0, 0, 0, 0.3);
    }
    .exe-details{
        width: 90%;
        margin: 10px auto;
    }
    .div-video{
        min-width: 400px;
        
        width: 47%;
        margin: 20px auto 20px auto;
        display: flex;
        /* align-items: center; */
        border-radius: none;
        
    }
    .wrapper{
       height:100% ;
       margin-top: 0cm;
       display: flex ;
       align-items: inherit;
       flex-direction: column;
       /* flex-wrap:wrap; */
    }
   /*  h1{
        text-align: center;
    } */
</style>
<div   class="wrapper"> 
    {#each [...parsed_data] as exercise}
    
        <div class="div-video">
            <!-- <VideoPlayer height={700} poster={exercise.thumbnailPath} source={exercise.videoPath} /> -->

        </div>
         
    
            <!-- <div style="display:flex;justify-content:center;"class="div-image">
                <img class="m-auto img-card" style=" width:300px" src={ exercise.thumbnailPath } alt="" >
            </div> -->
            <div class="detailedPlan">
                <h1 class="text-5xl font-bold text-center ">{exercise.eName}</h1>
                <h1 class="col"> targetMuscle: {exercise.targetMuscle} </h1>
                <h1 class="col"> Difficulty: {exercise.difficulty} </h1>
                <h1 class="col"> Pathologies: {exercise.forPathology} </h1>
                <h1 class="col"> Description: {exercise.eDescription} </h1>
                
            </div>
            <!-- <div class="bck-btt">  <button  onclick="window.location.href='/plans/single/edit/'" >Edit</button></div> -->
        {:else}
            loading
        {/each}
        
        <button on:click={back} >Back</button>
    </div>