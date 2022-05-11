<script>
    export let parsed_data;
    import Card from "$lib/components/Card.svelte"
    import CreatePlanFinish from "$lib/components/plans/CreatePlanFinish.svelte";
    import CreatePlanForm from "$lib/components/plans/CreatePlanForm.svelte";
    import CreatePlanSelectExe from "$lib/components/plans/CreatePlanSelectExe.svelte";
    
    import {Steps} from 'svelte-steps'
    
    
    let current = 0;
    const components = [CreatePlanForm,CreatePlanSelectExe,CreatePlanFinish]
    const stepsTextOnly = [
    { text: 'Nomear o plano' },
    { text: 'Escolher exercicios' },
    { text: 'Confirmação' },
  ]
</script>

<br><br/>
<Steps bind:current steps={stepsTextOnly} borderRadius="0" primary="#000000" secondary="#ffaaaa"/>
{#if current == 1}
    <svelte:component this={components[current]} {parsed_data}/>
{:else}
    <svelte:component this={components[current]}/>
{/if}


