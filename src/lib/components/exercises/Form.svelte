 <script>
import { onMount } from "svelte";


     export let current;
     export let exercise;
     export function next(){
        current = 1;


        //exercise.thumbnail='/exercicio.png';

       console.log(exercise)
    }

    onMount(()=>{
        current = 0;
    })
    exercise.difficulty="Fácil"

    async function  bF()
    {
        exercise.difficulty="Fácil"
    }

    async function  bM()
    {
        exercise.difficulty="Média"

    }

    async function  bA()
    {
        exercise.difficulty="Avançado"

    }
 </script>
<style>

    .form{
        margin: 20px auto ;
        margin-right: auto;
        display: flex;
        align-items: center;
        width: fit-content;
  
        /* border: 1px solid black; */
        padding: 1em;
        flex-direction: column;
        box-shadow: 1px 1px 1rem rgba(0, 0, 0, 0.2);
    }





</style>

<div  style="width:40%;padding:2% "class="form border-double bg-base-100 transform scale-90"   >

    
    <h1  class="text-2xl font-bold" style="margin-bottom:20px;  margin-top:20px;">Nome do Exercício</h1>

    <input type="text" placeholder="Escreve aqui" class="input input-bordered w-full max-w-s"  bind:value={exercise.name}  />
    
    <h1   class="text-2xl font-bold"   style="margin-bottom:20px; margin-top:20px;">Área Múscular</h1>
    
    <select class="select w-full max-w-s select-bordered" bind:value={exercise.targetmuscle}>
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
    <!-- <input type="text" placeholder="Escolhe a Área muscular" class="input input-bordered w-full max-w-s"  bind:value={exercise.targetmuscle}  /> -->

    <h1  class="text-2xl font-bold" style="margin-bottom:20px; margin-top:20px;"> Dificuldade do Exercício</h1>
    <div class="btn-group ">
        <input on:click={bF} type="radio" name="options" data-title="Fácil" class="btn" checked />
        <input on:click={bM} type="radio" name="options" data-title="Médio" class="btn"  />
        <input on:click={bA} type="radio" name="options" data-title="Avançado" class="btn" />

      </div>
    
    <h1  class="text-2xl font-bold" style="margin-bottom:20px; margin-top:60px;">Descrição do Exercício</h1>
    <textarea style="margin-bottom:50px" class=" w-full max-w-s textarea textarea-bordered"  required bind:value={exercise.description} placeholder="Escreva aqui a Descrição do Exercício..."></textarea>


    <button on:click|preventDefault={next} class="btn btn-info">Next</button>



</div>