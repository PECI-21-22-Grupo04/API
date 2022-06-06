
<script>
    import { fade } from 'svelte/transition';
    export let starter = 0;
    export let path="";
 
    console.log(starter)
</script>
<style>
 

</style>
  <!-- svelte-ignore a11y-label-has-associated-control -->
{#if path!=""}
<a href={path}>
  <div in:fade style="height:fit-content" class="card w-80 bg-base-100 shadow-xl  hover:text-white hover:bg-base-100">
    <slot/>
  </div>
</a>




{:else}  

<div in:fade style="height:fit-content" class="card w-80 bg-base-100 shadow-xl  hover:text-white hover:bg-base-100">
  <slot/>
</div>

{/if}  
