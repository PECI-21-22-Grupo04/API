<script>
    export let parsed_data;
    import Card from "$lib/components/Card.svelte";
    import Form from "$lib/components/exercises/Form.svelte"
    import {Steps} from 'svelte-steps'
    import Upload from '$lib/components/exercises/upload.svelte'
    import { goto } from "$app/navigation";
    import { session } from '$app/stores';
    const components = [Form,Upload]
    let current=0;
    let exercise = {
            email:$session.user.email,
            name:"",
            targetmuscle:"",
            difficulty:"",
            description:"",
            pathologie:"",
            thumbnail:"",
            videopath:""
       }
    let stepsTextOnly = [
    { text: 'Step one' },
    { text: 'Step two' },
    { text: 'Step three' },
  ]
  function back(){
    current=1;
  }
  async function confirm(){
        let error = undefined
        console.log(exercise)
        try {
            const res = await fetch('/user/exercises/createexe', {
                method: 'POST',
                body:JSON.stringify(                    
                    exercise,
                ),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(res.ok){
                goto('/user/exercises')
            }else{
                error= 'An error occurred'
            }
        } catch (err) {
            console.log(err)
            error = 'An error occurred'
        }
    }
</script>
<style>
  .card-center{
    display: block;
    position: relative;
    margin: 20px auto;
  }
  button{
    width: 100%;
    height: 36px;
    background-color: #fff;
  }

  button:hover{
    background-color: #222;
    color: #fff
  }
</style>
<br>
<Steps bind:current steps={stepsTextOnly} />
<!-- <svelte:component this={components[current]} {parsed_data}/> -->

{#if current == 0 }
  <Form bind:current bind:exercise />
{:else if current == 1}
  <Upload bind:current />
{:else}
  <div class="card-center">
    
    <Card>
      <div class="div-image">
        <img class="m-auto img-card" src="{exercise.thumbnail}" alt="" >
      </div>
      <div style="text-align: center;font-size: 1.2em;">{exercise.name} </div>
      <div style="font-size: 0.8em;">{exercise.targetmuscle} </div>
      <div style="font-size: 0.8em;">{exercise.difficulty} </div>
    </Card>
    
    <br>
    <br>
    <button on:click={confirm} >Confirm </button>
    <button on:click={back} >Back </button>
  </div>
{/if}
