
<script>
    export let starter = 0;
    export let path='/*';
    console.log(starter)
</script>
<style>
  a{
    text-decoration: none;
    color: black;
  }
.card{
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-clip: border-box;
    width: 300px;
    padding: 0%;
    cursor: pointer;
    width: 240px;
    background-color: #ffffff;
    border: none;
    box-shadow: 0 3px 5px rgba(0,0,0,0.1);
    border-radius: 0.25em;
}
.card:hover {
  top: -2px;
  box-shadow: 0 4px 5px rgba(0,0,0,0.2);
}
.card-footer{
  border-top: none;
  padding: 1rem 0rem 1rem 1rem;
  background-color: inherit;
  display: flex;
  align-items: center;
}
.vfi {
  line-height: 1;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font: normal normal normal 1rem "vdm";
  display: inline-block;
  color: #212529; 
}
.vfi-fleche-droite:before {
  content: ""; 
}


    

.button_plus {
  position: absolute;
  width: 100%;
  height: 250px;
  background: #fff;
  cursor: pointer;
  border: 2px solid #095776;

  /* Mittig */
  /* top: 50%;
  left: 50%; */
}

.button_plus:after {
  content: '';
  position: absolute;
  transform: translate(-50%, -50%);
  height: 4px;
  width: 50%;
  background: #095776;
  top: 50%;
  left: 50%;
}

.button_plus:before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #095776;
  height: 50%;
  width: 4px;
}

.button_plus:hover:before,
.button_plus:hover:after {
  background: #fff;
  transition: 0.2s;
}

.button_plus:hover {
  background-color: #095776;
  transition: 0.2s;
}

</style>
  <!-- svelte-ignore a11y-label-has-associated-control -->
<a href={path} >    
  {#if starter != 0}
    <label class="card card-body default">
      <div class="button_plus" >
        <div class="crux">
          <div class="bar_hor"></div>
          <div class="bar_ver"></div>
        </div>
      </div>
    </label>
    {:else}
    <label class="card card-body mb-3 ">
      <slot></slot>
      <div class="card-footer">
        Mais detalhes<span class="vfi vfi-fleche-droite" aria-hidden="true"></span>
        
      </div>
    </label>
  {/if}
</a>