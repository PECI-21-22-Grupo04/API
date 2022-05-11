<script>
import Chat from "$lib/components/chat.svelte";

    export let parsed_data;
    console.log(parsed_data);

</script>
<style>
    a{
        text-decoration: none;
        color:black;
        padding: 10px;
        width: fit-content;
        border: 1px solid black;
    }
    
    .detailedPlan {

/* 
    width: 130px;
    height: 130px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background-color: gray;
    border-radius: 100%; 
      top: 50%;
    left: 50%;
     transform: translate(-50%, -50%);
    */
    display: flex;
    flex-direction: column;
    position: absolute;
    padding: 6rem 3rem 6rem 6rem;
    background: #fff;
    max-width: 400px;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 1px 1px 2rem rgba(0, 0, 0, 0.3);
    margin: 0 auto;
    
    }
</style>
<div   class="wrapper"> 
    {#each [...parsed_data] as plan}
        <div  class="detailedPlan">
            <h1 class="col" style="text-align: center;"  >{plan.p_name}</h1>
            <h1 class="col"> Description: {plan.p_description} </h1>
            <h1 class="col">Exerc : {plan.thumbnailPath} </h1>
            <a href="/user/plans">Back</a>
            <!-- <div class="bck-btt">  <button  onclick="window.location.href='/plans/single/edit/'" >Edit</button></div> -->
        </div>
    {/each}
        
  </div>