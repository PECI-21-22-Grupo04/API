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

<div class:change={active} on:click={changeState} class="menu-icon" data-menu-icon>
    <div class="bar1"></div>
    <div class="bar2"></div>
    <div class="bar3"></div>
</div>