<script>
    export let parsed_data;
    import Card from "$lib/components/Card.svelte"
    import CreatePlanFinish from "$lib/components/plans/CreatePlanFinish.svelte";
    import CreatePlanForm from "$lib/components/plans/CreatePlanForm.svelte";
    import CreatePlanSelectExe from "$lib/components/plans/CreatePlanSelectExe.svelte";
    import { session } from '$app/stores';
    import {Steps} from 'svelte-steps'
    
    let plan = {
        email : $session.user.email,
        pname: "",
        pdescription: "",
        pathology: "",
        pthumbnailPath: "",
        pvideoPath: "",
        showcase: 0,
        exercises: [],
        planid:null
    }
    let current = 0;
    const stepsTextOnly = [
    { text: 'Nomear o plano' },
    { text: 'Escolher exercicios' },
    { text: 'Confirmação' },
  ]
</script>


  <div style="margin-top:20px;margin-right:auto">
    
    <Steps  size={"2em"}  bind:current steps={stepsTextOnly} borderRadius="0" primary="#000000" secondary="#ffaaaa"/>
  
  </div>

{#if current == 0 }
  <CreatePlanForm bind:current bind:plan />
{:else if current == 1}
  <CreatePlanSelectExe bind:plan/>
{:else}
  <CreatePlanFinish bind:current bind:plan/>
{/if}

