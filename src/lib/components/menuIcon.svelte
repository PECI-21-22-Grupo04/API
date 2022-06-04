<script>
    import {getContext} from 'svelte';
    let changeState = getContext('changeState');
    export let active;   
</script>
<style>
.menu-icon {
  width: 55px;
  height: 50px;
  padding-left: 10px;  
  padding-top: 10px;
  cursor: pointer;
}

.bar1, .bar2, .bar3 {
  width: 35px;
  height: 5px;
  background-color: #aaa;
  margin: 6px 0;
  transition: var(--sidebar-animation-time);
}
.menu-icon:hover .bar1, .menu-icon:hover .bar2, .menu-icon:hover .bar3{
  background-color: #666;
}

.change .bar1 {
  -webkit-transform: rotate(-45deg) translate(-9px, 6px);
  transform: rotate(-45deg) translate(-9px, 6px);
}

.change .bar2 {opacity: 0;}

.change .bar3 {
  -webkit-transform: rotate(45deg) translate(-8px, -8px);
  transform: rotate(45deg) translate(-8px, -8px);
}

</style>

<!-- <div class:change={active} on:click={changeState} class="menu-icon" data-menu-icon>
    <div class="bar1"></div>
    <div class="bar2"></div>
    <div class="bar3"></div>
</div> -->

<label class="btn btn-circle swap swap-rotate" class:change={active}  >
  
  <!-- this hidden checkbox controls the state -->
  <input type="checkbox" on:click={changeState}/>
  
  <!-- hamburger icon -->
  <svg class="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg>
  
  <!-- close icon -->
  <svg class="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/></svg>
  
</label>