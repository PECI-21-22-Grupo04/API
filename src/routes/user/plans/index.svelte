<script>
    import Card from "$lib/components/Card.svelte"
    import {onMount, onDestroy} from 'svelte';
    import { session } from '$app/stores';
    import { page } from '$lib/store/store.js';
import { goto } from "$app/navigation";
    
    let parsed_data=[];
    onMount(async ()=>{
        page.update(n => 
            n = "Planos"
        )
        const res = await fetch('/user/plans', {
                method: 'POST',
                body:JSON.stringify({                    
                    // @ts-ignore
                    email: $session.user.email
                }),
                headers: {
                    'Content-Type': 'application/json',
                    "accept": "application/json"
                }
            })
        const data = await res.json();
        parsed_data = data.parsed_data
        console.log(parsed_data)
    })

    async function createPlan()
    {
        goto('/user/plans/createplan')
     
    }

    onDestroy(async ()=>{
        page.update(n => 
            n = ""
        )


    })


    let thumbnail = '/planosdummy.jpg';
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

</style>


<div style="margin-left:20px;margin-top:50px;display:flex;flex-direction:row" >



<button on:click={createPlan} style="padding:5px;height:fit-content;font-size:large" class="btn btn-secondary">
    <img  style="height:50px;width:50px;"src="/add.svg" alt=""> 
    <h1 style="margin-left:30px;margin-right:30px;"> Criar Plano </h1>
</button>

<div class="dropdown dropdown-down dropdown-end dropdown-hover " style="margin-left:auto;margin-right:20px;">
    <label tabindex="0" class="btn m-1">Patologias</label>
    <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
      <li><a>Grávidas</a></li>
      <li><a>....</a></li>
    </ul>
</div>

</div>
<div class="content">
    {#each [...parsed_data] as plan }
    <Card  path="/user/plans/{plan.programID}">
          
            <figure><img   src={thumbnail} alt="" /></figure>
            <div class="card-body">
            <h2 class="card-title">
                {plan.pName}

            </h2>
            <div style="font-size:small;    height:80px;width:230px;overflow:hidden; overflow-wrap: break-word;">
                {plan.pDescription}
            </div>
            <div class="card-actions justify-end">
                <div class="badge badge-outline">{plan.forPathology}</div> 
  
            </div>
    </div>

        </Card>

        

        
    {/each}
</div>


