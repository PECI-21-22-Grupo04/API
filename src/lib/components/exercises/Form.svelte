 <script>
     export let current;
     export let exercise;
     export function next(){
        current = 1;

        
        exercise.thumbnail='/exercicio.png';

       console.log(exercise)
    }
 </script>
<style>

    div{
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
    }

    textarea{
        height: 100px;
    }
    input ,textarea, button{
        width: 300px;
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

<div >
    <!-- bind:value={exercise.name} -->
    Nome do Exercício  {exercise.name}
    <input type="text" bind:value={exercise.name}/><br>
    Músculo  {exercise.targetmuscle}
    <input type="text" bind:value={exercise.targetmuscle} /><br>
    Dificuldade  : {exercise.difficulty}
    <input type="text" bind:value={exercise.difficulty} /><br>
    Description: <textarea type="text" bind:value={exercise.description}  /><br><br>
   <button on:click|preventDefault={next}> Next </button><br>

</div>
