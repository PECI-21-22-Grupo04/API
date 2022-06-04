 <script>
     export let current;
     export let exercise;
     export function next(){
        current = 1;


        //exercise.thumbnail='/exercicio.png';

       console.log(exercise)
    }
 </script>
<style>

    .form{
        margin: 20px auto ;
        margin-right: auto;
        display: flex;
        width: fit-content;
        background-color: white;
        /* border: 1px solid black; */
        padding: 1em;
        flex-direction: column;
        box-shadow: 1px 1px 1rem rgba(0, 0, 0, 0.2);
    }
   
    input{
        height: 36px;
        margin-bottom:15px;
    }

    textarea{
        height: 100px;
    }
  
    button{
        height: 36px;
        background-color: #eee;
        width: fit-content;
        margin: auto;
        border: 1px solid black;
        cursor: pointer;
    }

    button:hover{
        background-color: #222;
        color: #fff
    }
</style>

<div class="form">

    
    Nome do Exercício: 
    <input required type="text"  bind:value={exercise.name}/>
    Área Múscular: 
    <input required type="text"  bind:value={exercise.targetmuscle} />
    
    <h1 style="margin-bottom:20px;"> Dificuldade do Exercício:</h1>
    <div class="btn-group ">
        <input type="radio" name="options" data-title="Fácil" class="btn" />
        <input type="radio" name="options" data-title="Médio" class="btn"  />
        <input type="radio" name="options" data-title="Avançado" class="btn" />

      </div>
    
    <!-- <input required type="text"  bind:value={exercise.difficulty} /> -->
    Descrição: <textarea style="margin-bottom:15px;"type="text" required bind:value={exercise.description}  />
   <button on:click|preventDefault={next}> Next </button>


</div>