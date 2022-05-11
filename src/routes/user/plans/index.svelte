<script>
    import Card from "$lib/components/Card.svelte"
    export let parsed_data;
    let thumbnail = '../../static/planosdummy.jpg';
</script>

<style>
    h1{
        margin: 1px auto;
        /* top: 50px; */
    }
</style>
<h1>Planos</h1>
<div class="content">
    <Card path="/user/plans/createplan" starter= {1}/>
    {#each [...parsed_data] as plan }
        <Card path="/user/plans/{plan.pName}">
            <div class="div-image">
                <img class="m-auto img-card" src={thumbnail} alt="" >
            </div>
            
            <div style="text-align: center;font-size: 1.2em;">{plan.pName} </div>
            <div style="font-size: 0.8em;">{plan.pDescription} </div>
            <div style="font-size: 0.8em;">{plan.exercises} </div>
              
        </Card>
    {/each}
</div>


