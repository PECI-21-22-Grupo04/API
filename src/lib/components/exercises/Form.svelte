 <script>
     export let current;
     export let exercise;
     let name = '';
     let  targetmuscle='';
     let  difficulty='';
     let  description='';
     let  thumbnail='/exercicio.png';
     let  videopath='';
     export function next(){
        current = 1;
        exercise = {
            name: name,
            targetmuscle:targetmuscle,
            difficulty:difficulty,
            description:description,
            thumbnail:thumbnail,
            videopath:videopath
       }
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
    }

    button:hover{
        background-color: #222;
        color: #fff
    }
</style>

<div >
    <!-- bind:value={exercise.name} -->
    Nome do Exercício  
    <input type="text" bind:value={name}/><br>
    Músculo  
    <input type="text" bind:value={targetmuscle} /><br>
    Dificuldade  
    <input type="text" bind:value={difficulty} /><br>
    Description: <textarea type="text" bind:value={description}  /><br><br>
   <button on:click={next}> Next </button><br>

</div>
