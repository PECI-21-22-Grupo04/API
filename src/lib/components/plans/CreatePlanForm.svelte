<script>
    import { fade, slide } from 'svelte/transition';
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
    .button{
        width: fit-content;
        margin: auto;
        background-color: white;
        border: 1px solid black;
        padding: 10px;
        cursor: pointer;
    }
    .button:hover{
        color: white;
        background-color: black;
        
    }
</style>

<form method="post" in:slide="{{delay: 300, duration: 300}}" out:fade="{{duration: 300}}" >
    name: <input type="text" name="name" value="" /><br><br>
    description: <input type="text" name="description" value="" /><br><br>
    <input class="button" type="submit" name="accept"/><br><br>
    
</form>