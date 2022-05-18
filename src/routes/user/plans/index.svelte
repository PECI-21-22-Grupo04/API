<script>
    import Card from "$lib/components/Card.svelte"
    import {onMount} from 'svelte';
    import { session } from '$app/stores';
    
    let parsed_data=[];
    onMount(async ()=>{

        const res = await fetch('/user/plans', {
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
        parsed_data = data.parsed_data
    })    




    let thumbnail = '../../static/planosdummy.jpg';
</script>

<style>
    h1{
        margin: 1px auto;
        /* top: 50px; */
    }


    .xpto {
  padding: 40px;
  text-align: center;
  background: #8EB5CD;
  color: white;
  font-size: 30px;
}

</style>
<div>

    <h1 class="xpto">Planos</h1>
</div>

<div style="margin-bottom:300px;">
 <p></p>
</div>

<div class="content">
    <Card path="/user/plans/createplan" starter= {1}/>
    {#each [...parsed_data] as plan }
        <Card path="/user/plans/{plan.programID}">
            <div class="div-image">
                <img class="m-auto img-card" src={thumbnail} alt="" >
            </div>
            
            <div style="text-align: center;font-size: 1.2em;">{plan.pName} </div>
            <div style="font-size: 0.8em;">{plan.pDescription} </div>
            <div style="font-size: 0.8em;">{plan.exercises} </div>
              
        </Card>

        
    {/each}
</div>


