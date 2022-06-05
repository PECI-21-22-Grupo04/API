<script>
        import {onMount, onDestroy} from 'svelte';
    import { page } from '$lib/store/store.js';
    onMount(async ()=>{
        page.update(n => 
            n = "Página Inicial"
        )
 
    }),    

    onDestroy(async ()=>{
        page.update(n => 
            n = ""
        )


    })
</script>
<style>

    .xpto {
  padding: 40px;
  text-align: center;

  font-size: 30px;
}

</style>



<div style="padding:100px;">
    <div>

    </div>
    
    <h1 style="font-size:x-large; padding:25px">2 Novos Clientes esta semana!</h1>
    
    <h1 style="font-size:large;text-align:center;">Notificações do instrutor ... </h1>
    <h1 style="text-align:center;font-size:medium;">PLACEHOLDER </h1>
    <h1 style="text-align:center;font-size:medium;">PLACEHOLDER </h1>
    <h1 style="text-align:center;font-size:medium;">PLACEHOLDER </h1>
    <h1 style="text-align:center;font-size:medium;">PLACEHOLDER </h1>
    <h1 style="text-align:center;font-size:medium;">PLACEHOLDER </h1>
    <h1 style="text-align:center;font-size:medium;">PLACEHOLDER </h1>
    <h1 style="text-align:center;font-size:medium;">PLACEHOLDER </h1>
    <h1 style="text-align:center;font-size:medium;">PLACEHOLDER </h1>
    <h1 style="text-align:center;font-size:medium;">PLACEHOLDER </h1>


   <p>

   </p>

    <div>
    
    </div>
    
</div>
   
   
    
   
