<script>
    import Card from "$lib/components/Card.svelte";
    import {onDestroy, onMount} from "svelte"
    export let avatar;
    export let exercise;
    export let current;

    onMount( () => {
        if(exercise.name == "" || exercise.description == "" || exercise.difficulty == "" || exercise.targetmuscle == ""){
            current = 0;
            alert("Faltam detalhes");
        }else if(exercise.expthumbnail == null || exercise.expvideo == null){
            current = 1;
            alert("Faltam imagens ou video");

        }
    } )

</script>

<div class="card-center">
      
    <Card >


      <figure><img   src={avatar } alt="" /></figure>
      <div class="card-body">
        <h2 class="card-title">
            {exercise.name}

        </h2>
        <div>
            {exercise.description}
        </div>
        <div class="card-actions justify-end">
            <div class="badge badge-outline">{exercise.difficulty}</div> 
            <div class="badge badge-outline">{exercise.targetmuscle}</div>
        </div>
      </div>


    </Card>
    

  </div>