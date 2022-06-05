<script>

    export let path ='';

    import { session } from '$app/stores';    
    import { page } from '$lib/store/store.js';
import { goto } from '$app/navigation';
    export let active;
    export let email;
    async function logout ()
    {
        try {
            const res = await fetch('/auth/logout', {
                method: 'POST'
            })
            if(res.status==200){
                // clean session? 
                $session = {
                    user: {
                    authenticated: false,
                    email: ""
                    }
                }

                goto('/')
                
            }else{
               
                console.log("resstatus - " + res.status)
                alert("Problem logging out")
            }
        } catch (err) {
            console.log(err)
           
        }


    }
    let pageName="" ;
    page.subscribe( value => {
      pageName = value;
    })
</script>


<div class="navbar bg-neutral text-neutral-content">
    <div class="flex-1">
      <div class="dropdown ">
        <label tabindex="0"  class="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
        </label>
        <ul tabindex="0" class="menu menu-compact  dropdown-content mt-3 p-2 shadow  bg-neutral rounded-box w-52">
    


     
            <!-- Sidebar content here -->
            <li class="nav-item">
              <a href="/" >
                <span class="bi bi-house" ></span>
                Página Incial
              </a>
            </li>
            <li>
              <a href="/user/exercises">
                <span class='bi bi-bicycle'  ></span>              
                Exercícios
              </a>
            </li>
            <li>
              <a href="/user/plans">
                <span class='bi bi-collection-play' ></span>
                Planos
              </a>
            </li>
            <li>
              <a href="/user/clients">
                <span class='bi bi-people-fill'></span>
                Clientes
              </a>
            </li>
         
       
        </ul>
      </div>
     
     {#if pageName!=""} 
        <div style="padding:20px;font-size:20px;" class=" xpto badge badge-primary"> {pageName} </div>
    {:else}

    {/if}
    </div>
    <div class="flex-none">
      <div class="dropdown dropdown-end">

        

      </div>
      <div class=" dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="https://api.lorem.space/image/face?hash=33791" />
          </div>
        </label>
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-neutral rounded-box w-52">
          <li>
            <label for="my-modal" class=" modal-button">Perfil</label>
          </li>
          <li><a on:click={logout}>Terminar Sessão</a></li>
        </ul>
      </div>
    </div>
  </div>