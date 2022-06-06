<script>
    import Card from "$lib/components/Card.svelte"
    import {onMount, onDestroy} from 'svelte';
    import { session } from '$app/stores';
    import { page } from '$lib/store/store.js';
import { goto } from "$app/navigation";
import { validate_each_argument } from "svelte/internal";
    let parsed_data=[];

    async function createExe()
    {
        goto('/user/exercises/createexe')
     
    }

    async function deleteExercise(id){
        const res = await fetch('/user/exercises', {
                method: 'DELETE',
                body:JSON.stringify({                    
                    exerciseID: id
                }),
                headers: {
                    'Content-Type': 'application/json',
                    "accept": "application/json"
                }
            })
        if(res.ok){
            parsed_data = parsed_data.filter( function(value){
                console.log(value)
                if(value.exerciseID != id){ return value;}
            } )
                
            console.log(JSON.stringify(parsed_data) + "ola")
                
        }
    }
    

    
    onMount(async ()=>{
        page.update(n => 
            n = "Exercicíos"
        )
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
        parsed_data = [...data.parsed_data]
        console.log(parsed_data)
    })

    onDestroy(async ()=>{
        page.update(n => 
            n = ""
        )


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


  font-size: 30px;
}


img {
    flex-shrink: 0;
    width: 325px; 
    height: 200px;
}




</style>


    <div style="margin-left:20px;margin-top:50px;display:flex;flex-direction:row" >
        
        <button on:click={createExe} style="padding:5px;height:fit-content;font-size:large" class="btn btn-secondary">
            <img  style="height:50px;width:50px;"src="/add.svg" alt=""> 
            <h1 style="margin-left:30px;margin-right:30px;"> Criar Exercício </h1>
        </button>
        
        <div class="dropdown dropdown-down dropdown-end dropdown-hover " style="margin-left:auto;margin-right:20px;">
            <label tabindex="0" class="btn m-1">Dificuldade</label>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Fácil</a></li>
              <li><a>Média</a></li>
              <li><a>Avançada</a></li>

            </ul>
            
          </div>
        <div class="dropdown dropdown-down dropdown-end dropdown-hover" style="margin-right:20px;">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label tabindex="0" class="btn m-1">Área Múscular</label>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Geral</a></li>
              
              <li><a>Peito</a></li>
              <li><a>Pernas</a></li>
              <li><a>Costas</a></li>
              <li><a>Braços</a></li>
              <li><a>Gluteos</a></li>
              <li><a>Ombros</a></li>
              <li><a>Abdominais</a></li>
    
            </ul>
            
          </div>




    </div>
    <div class="content" >


        <!-- <div  style="display:flex;flex-direction:row;"> -->

            {#each parsed_data as exercise }

            <div style="margin-left:20px"  >
                <Card >
    
                    <a href="/user/exercises/{exercise.exerciseID}">
                    <figure><img   src={exercise.thumbnailPath } alt="" /></figure>
                    <div class="card-body">
                    <h2 class="card-title">
                        {exercise.eName}
                        <div class="badge badge-secondary">NEW</div>
                    </h2>
                    <div style="font-size:small;    height:60px;width:230px;overflow:hidden; overflow-wrap: break-word;">
                        {exercise.eDescription}
                    </div>
                    </a>
                        <div class="flex flex-row items-center mb-5 mx-5">
                            <button class="btn p-2 z-99 bg-base-300" style="width:fit-content; heigth:fit-content" on:click={() => deleteExercise(exercise.exerciseID)}>
    
                                <img src="/delete.svg" alt="" style="width:30px; height:30px" >
                            </button>
                            <div class="card-actions justify-end ml-auto">
                                <div class="badge badge-outline">{exercise.difficulty}</div> 
                                <div class="badge badge-outline">{exercise.targetMuscle}</div>
                            </div>

                        </div>
            
    
                    
    
                </Card>
                
            </div>
    
     
            {/each}


        <!-- </div> -->
      
    </div>


