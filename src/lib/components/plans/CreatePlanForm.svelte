<script>
    import { fade, slide } from 'svelte/transition';
    export let current;
    export let plan;
    function next(){
        current = 1;
    }
</script>
<style>
    form{
        background-color: white;
        margin: 20px auto;
        padding: 20px;
        width: 90%;
        /* border: 1px solid black; */
        box-shadow: 1px 1px 1rem rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
    }
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

<div  in:slide="{{delay: 300, duration: 300}}" out:fade="{{duration: 300}}" >
    name: <input type="text" bind:value={plan.pname} /><br><br>
    description: <textarea type="text" bind:value={plan.pdescription} /><br><br>
    <button on:click={next}> Next </button>
    
    
</div>