<script>
    export let current;
    export let plan;
    async function next(){


        try {
            const res = await fetch('/user/plans/createplan', {
                method: 'POST',
                body:JSON.stringify(                    
                    plan,
                ),
                headers: {
                    'Content-Type': 'application/json',
                    "accept": "application/json"
                }
            })
            const data = await res.json();
            console.log("this is body " + JSON.stringify(data))
            if(res.status == 200){
                console.log("we receiving")
                plan.planid=data.pid

            }else{
                console.log('An error occurred')
            }
        } catch (err) {
            console.log(err)
            console.log("problems")
           
        }

        current = 1;
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

    
    <h1  class="text-2xl font-bold" style="margin-bottom:20px;  margin-top:20px;">Nome do Plano</h1>

    <input type="text" placeholder="Escreve aqui" class="input input-bordered w-full max-w-s"  bind:value={plan.pname}  />
    

    <h1  class="text-2xl font-bold" style="margin-bottom:20px; margin-top:20px;"> Patologias</h1>

    <div class="btn-group ">
        <input type="radio" name="options" data-title="Gravidas" class="btn" checked />
        <input  type="radio" name="options" data-title=" ... " class="btn"  />
       
      </div>

    
    <h1  class="text-2xl font-bold" style="margin-bottom:20px; margin-top:60px;">Descrição do Plano</h1>
    <textarea style="margin-bottom:50px" class=" w-full max-w-s textarea textarea-bordered"  required bind:value={plan.pdescription} placeholder="Escreva aqui a Descrição do Exercício..."></textarea>


    <button on:click|preventDefault={next} class="btn btn-info">Next</button>



</div>