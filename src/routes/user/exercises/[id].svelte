<script context="module">

    export async function load({ params, session }) {
        const url = `/user/exercises/${params.id}`;
        // console.log(url)
        // const res = await fetch(url, {
        //             method: 'POST',
        //             body:JSON.stringify({                    
        //                 email: session.user.email
        //             }),
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 "accept": "application/json"
        //             }
        //         })
        // const data = await res.json();
        // const parsed_data = data.parsed_data
    return {
        props: {
            url: url/* ,
            parsed_data:parsed_data */
        }
    }
  }
</script>
<script>


    import {onMount} from 'svelte';
    import { session } from '$app/stores';
    import { goto } from "$app/navigation";
    let pause
    let edit = false;
    export let parsed_data=[];
    export let url;
    let data = {
    labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
    datasets: [
      {
        values: [10, 12, 3, 9, 8, 15, 9]
      }
    ]
  };
  function toggleEdit(){
    edit = !edit
  }
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
    async function confirmEdit(exercise){
        const res = await fetch(url, {
                method: 'PATCH',
                body:JSON.stringify(exercise
                ),
                headers: {
                    'Content-Type': 'application/json',
                    "accept": "application/json"
                }
            })
        if(res.ok){
            edit=false;
        }
    }
</script>
<style>
    
    .col{
        margin-top: 30px;
    }
    .detailedPlan {
        min-width: 400px;
    width: 90%;
    height: 50%;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 1rem 1rem 2rem 2rem;
    
    
    
    border-radius: 10px;
    

    box-shadow: 1px 1px 2rem rgba(0, 0, 0, 0.3);
    }
    input{
        width: 100%;
    }
    .exe-details{
        width: 90%;
        margin: 10px auto;
    }
    .div-video{
        min-width: 400px;
        
        width: 100%;
        margin: 20px auto ;
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
    
       
         

        <!-- <div style="display:flex;justify-content:center;"class="div-image">
            <img class="m-auto img-card" style=" width:300px" src={ exercise.thumbnailPath } alt="" >
        </div> -->
        <div class="detailedPlan bg-base-200 w-full ">
            <div class="div-video flex-wrap ">
        
                <video style="width: 60% ;" class="mx-auto" autoplay controls>
                    <source src={exercise.videoPath} type="video/mp4">
                        
                    <track kind="captions">
                </video>
                {#if edit}
                    <div class="flex flex-col mx-auto">
                
                        <label class="input-group my-5">
                            <span>Name</span>
                            <input type="text-xl  " bind:value={exercise.eName} class="input input-bordered "  />
                        </label>

                        <label class="input-group my-5">
                            <span>Área Muscular</span>
                            <select class="select  select-bordered" bind:value={exercise.targetMuscle} >
                                <option disabled selected>Escolhe a Área Muscular</option>
                                <option>Geral</option>  
                                <option>Peito</option>
                                <option>Pernas</option>
                                <option>Costas</option>
                                <option>Braços</option>
                                <option>Gluteos</option>
                                <option>Ombros</option>
                                <option>Abdominais</option>
                            </select>
                        </label>
                        <label class="input-group my-5">
                            <span>Difficuldade</span>
                            <select class="select  select-bordered" bind:value={exercise.difficulty} >
                                <option disabled selected>Escolhe a Dificuldade</option>
                                <option>Fácil</option>  
                                <option>Média</option>
                                <option>Avançado</option>
                            </select>
                        </label>
                        <label class="input-group my-5">
                            <span>Patologias</span>
                            <input type="text-xl  " bind:value={exercise.forPathology} class="input input-bordered "  />
                        </label>
                        <div class="flex flex-row">

                            <div on:click={toggleEdit} class="btn btn-error w-20 ml-auto mr-10 ">Go Back</div>
                            <div on:click={() =>{ confirmEdit(exercise) }} class="btn btn-success w-20 ml-auto mr-10 ">Confirm</div>
                        </div>
                    </div>
                    <label class="input-group input-group-vertical mt-10">
                        <span class="py-5 w-full text-center " >Descrição</span>
                        <textarea type="text" bind:value={exercise.eDescription} placeholder="info@site.com" class="input input-bordered"  />
                    </label>
                {:else}
                    <div class="flex flex-col mx-auto">
                
                        <label class="input-group my-5">
                            <span>Name</span>
                            <input type="text-xl  " bind:value={exercise.eName} class="input input-bordered " disabled />
                        </label>

                        <label class="input-group my-5">
                            <span>Área Muscular</span>
                            <select class="select  select-bordered" bind:value={exercise.targetMuscle} disabled>
                                <option disabled selected>Escolhe a Área Muscular</option>
                                <option>Geral</option>  
                                <option>Peito</option>
                                <option>Pernas</option>
                                <option>Costas</option>
                                <option>Braços</option>
                                <option>Gluteos</option>
                                <option>Ombros</option>
                                <option>Abdominais</option>
                            </select>
                        </label>
                        <label class="input-group my-5">
                            <span>Difficuldade</span>
                            <select class="select  select-bordered" bind:value={exercise.difficulty} disabled>
                                <option disabled selected>Escolhe a Dificuldade</option>
                                <option>Fácil</option>  
                                <option>Média</option>
                                <option>Avançado</option>
                            </select>
                        </label>
                        <label class="input-group my-5">
                            <span>Patologias</span>
                            <input type="text-xl  " bind:value={exercise.forPathology} class="input input-bordered " disabled />
                        </label>
                        <div on:click={toggleEdit} class="btn btn-info w-20 ml-auto mr-10 ">Edit</div>
                    </div>   
                    <label class="input-group input-group-vertical mt-10">
                        <span class="py-5 w-full text-center " >Descrição</span>
                        <textarea type="text" bind:value={exercise.eDescription} placeholder="info@site.com" class="input input-bordered"  disabled/>
                    </label> 
                {/if}
                
            
            
        </div>
    </div>
            <!-- <div class="bck-btt">  <button  onclick="window.location.href='/plans/single/edit/'" >Edit</button></div> -->
    {/each}
        <div class="flex w-full">

            <button class="btn btn-error w-20 ml-10 " on:click={back} >Back</button>
        </div>
    </div>