
<script>
    export let starter = 0;
    export let path="";
 
    console.log(starter)
</script>
<style>
 

</style>
  <!-- svelte-ignore a11y-label-has-associated-control -->
{#if path!=""}
<a href={path}>
  <div class="card w-80 bg-base-100 shadow-xl  hover:text-white hover:bg-base-100">
    <slot/>
  </div>
</a>




{:else}  

<div class="card w-96 bg-base-100 shadow-xl">
  <slot/>
</div>

{/if}  
