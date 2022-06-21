<script>
    import Card from "$lib/components/Card.svelte"
    import {onMount, onDestroy} from 'svelte';
    import { session } from '$app/stores';
    import { page , exerciseList } from '$lib/store/store.js';
    import { goto } from "$app/navigation";
    import { validate_each_argument } from "svelte/internal";
    import { storage } from "$lib/database/firebase.js"
    import { ref, deleteObject} from "firebase/storage"
    let allExercises=[];
    
    async function createExe()
    {
        goto('/user/exercises/createexe')
     
    }

    async function deleteExercise(exercise){
        const res = await fetch('/user/exercises', {
                method: 'DELETE',
                body:JSON.stringify({                    
                    exerciseID: exercise.exerciseID
                }),
                headers: {
                    'Content-Type': 'application/json',
                    "accept": "application/json"
                }
            })
        if(res.ok){
            const storageVideoRef = ref(storage, `videos/${exercise.firebaseRef}`);
            const storageImageRef = ref(storage, `images/${exercise.firebaseRef}`);
            deleteObject(storageVideoRef).then(()=>{
                console.log("video apagado com sucesso")
            }).catch((error) => {
                console.log("houve um erro com o delete do video uploaded")
            })
            deleteObject(storageImageRef).then(()=>{
                console.log("imagem apagada com sucesso")
            }).catch((error) => {
                console.log("houve um erro com o delete da imagem uploaded")
            })  
            $exerciseList = $exerciseList.filter( function(value){
                console.log(value)
                if(value.exerciseID != exercise.exerciseID){ return value;}
            } )
            allExercises = allExercises.filter( function(value){
                console.log(value)
                if(value.exerciseID != exercise.exerciseID){ return value;}
            } )
            
            console.log(JSON.stringify($exerciseList) + "ola")
                
        }
    }
    let selector= {
        targetMuscle: "",
        difficulty: ""

    }
    function difficultySet(difficulty){
        selector.difficulty = difficulty;
    }
    function targetMuscleSet(targetMuscle){
        selector.targetMuscle = targetMuscle;
    }
    function querySelector(){
        $exerciseList = allExercises.filter((value) => {
            if(selector.difficulty == "" && selector.targetMuscle == ""){
                return value;
            }else if(selector.difficulty == "" && selector.targetMuscle != ""){
                
                if(value.targetMuscle == selector.targetMuscle) return value;
            }else if( selector.difficulty != "" && selector.targetMuscle == ""){
                
                if(value.difficulty == selector.difficulty) return value;
            }else if( selector.difficulty != "" && selector.targetMuscle != ""){
                
                if(value.difficulty == selector.difficulty && value.targetMuscle == selector.targetMuscle) return value;
            }
        })    
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
        $exerciseList = allExercises = [...data.parsed_data]
        console.log($exerciseList)
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
            {#if selector.difficulty == ""}
            <label tabindex="0" class="btn m-1">Dificuldade</label>
            {:else}
            <label tabindex="0" class="btn btn-outline m-1">{selector.difficulty}</label>
            {/if}
            
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li on:click={() => { difficultySet("")} } ><a>( Nenhuma )</a></li>
              <li on:click={() => { difficultySet("Fácil")} } ><a>Fácil</a></li>
              <li on:click={() => { difficultySet("Média")} } ><a>Média</a></li>
              <li on:click={() => { difficultySet("Avançado")} } ><a>Avançado</a></li>

            </ul>
            
          </div>
        <div class="dropdown dropdown-down dropdown-end dropdown-hover" style="margin-right:20px;">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            {#if selector.targetMuscle == ""}
            <label tabindex="0" class="btn m-1">Área Muscular</label>
            {:else}
            <label tabindex="0" class="btn btn-outline m-1">{selector.targetMuscle}</label>
            {/if}
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              
                <li on:click={() => { targetMuscleSet("")} } ><a>( Nenhuma )</a></li>
                <li on:click={() => { targetMuscleSet("Geral")} } ><a>Geral</a></li>  
                <li on:click={() => { targetMuscleSet("Peito")} } ><a>Peito</a></li>
                <li on:click={() => { targetMuscleSet("Pernas")} } ><a>Pernas</a></li>
                <li on:click={() => { targetMuscleSet("Costas")} } ><a>Costas</a></li>
                <li on:click={() => { targetMuscleSet("Braços")} } ><a>Braços</a></li>
                <li on:click={() => { targetMuscleSet("Gluteos")} } ><a>Gluteos</a></li>
                <li on:click={() => { targetMuscleSet("Ombros")} } ><a>Ombros</a></li>
                <li on:click={() => { targetMuscleSet("Abdominais")} } ><a>Abdominais</a></li>
    
            </ul>
            
          </div>
          <div on:click={querySelector} class="btn btn-info mr-5 "> Filtar</div>



    </div>
    <div class="content" >


        <!-- <div  style="display:flex;flex-direction:row;"> -->

            {#each $exerciseList as exercise }

            <div style="margin-left:20px"  >
                <Card >
    
                    <a sveltekit:prefetch href="/user/exercises/{exercise.exerciseID}">
                    <figure><img   src={exercise.thumbnailPath } alt="" /></figure>
                    <div class="card-body">
                    <h2 class="card-title">
                        {exercise.eName}
                       <!--  <div class="badge badge-secondary">NEW</div> -->
                    </h2>
                    <div style="font-size:small;    height:60px;width:230px;overflow:hidden; overflow-wrap: break-word;">
                        {exercise.eDescription}
                    </div>
                    </a>
                        <div class="flex flex-row items-center mb-5 mx-5">
                            <button class="btn p-2 z-99 bg-base-300" style="width:fit-content; heigth:fit-content" on:click={() => deleteExercise(exercise)}>
    
                                <img src="/delete.svg" alt="" style="width:30px; height:30px" >
                            </button>
                            <div class="card-actions justify-end ml-auto">
                                
                                    {#if exercise.difficulty == "Fácil"}
                                        <h1 class="badge badge-outline badge-success ml-auto" >{exercise.difficulty }</h1>
                                    {:else if exercise.difficulty == "Média" }    
                                        <h1 class="badge badge-outline badge-warning ml-auto " >{exercise.difficulty }</h1>
                                    {:else}
                                        <h1 class="badge badge-outline badge-error ml-auto " >{exercise.difficulty }</h1>

                                    {/if }
        
                                <div class="badge badge-outline">{exercise.targetMuscle}</div>
                            </div>

                        </div>
            
    
                    
    
                </Card>
                
            </div>
    
     
            {/each}


        <!-- </div> -->
      
    </div>


