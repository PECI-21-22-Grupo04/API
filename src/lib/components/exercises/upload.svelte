<script>
  import { onMount, onDestroy } from 'svelte'
  import DashboardPlugin from '@uppy/dashboard'
  import Uppy from '@uppy/core'
  import XHRUpload from '@uppy/xhr-upload'
  export let current=1;

  function next(){
    current=2;
  }
  function back(){
    current=0;
  }

  let container;
  let plugin;

  let uppy = new Uppy();
  let plugins = [];

  const installPlugin = () => {
    const options = {
      id: 'svelte:Dashboard',
      inline: true,
      plugins,
      target: container,
      height: 280,
    }

    uppy.use(XHRUpload, {
        endpoint: '/upload'
    })
    uppy.use(DashboardPlugin, options);
    plugin = uppy.getPlugin(options.id);
  }

  const uninstallPlugin = (uppyInstance= uppy) => {
    uppyInstance.removePlugin(plugin);
  }

  onMount(() => installPlugin())

  $: {
    const options = {
      id: 'svelte:Dashboard',
      inline: true,
      plugins,
      target: container
    }
    uppy.setOptions(options)
  }
</script>

<style>
@import '@uppy/core/dist/style.css';
@import '@uppy/dashboard/dist/style.css';
.conteiner{
        margin: 20px auto ;
        margin-right: auto;
        display: flex;
        width: fit-content;
        background-color: white;
        /* border: 1px solid black; */
        padding: 1em;
        flex-direction: column;
        box-shadow: 1px 1px 1rem rgba(0, 0, 0, 0.2);
    }
button{
  margin: auto;
  width: 300px;
    height: 36px;
    background-color: #eee;
}

button:hover{
    background-color: #222;
    color: #fff
}
</style>
<div class="conteiner">

  <div bind:this={container} /><br><br><br>
  <button on:click={next}>Next</button><br>
  <button on:click={back} >Back</button>
</div>