

<script>
import { session } from '$app/stores';    
    import SearchBar from '$lib/components/searchBar.svelte'
    import MenuIcon from '$lib/components/menuIcon.svelte'
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

</script>
<style>


    h1:hover {
  background-color: #8EB5CD;;
  color: black;
  border-radius: 25px;

;
}
    .header{
        display:flex;
        flex-direction: row;
        position: fixed;
        min-width: auto;
        box-shadow: var(--bs-sm);
        top: 0;
        left: 0;
        width: 100%;
        z-index: 5050;
        background-color:#095776;
        height: var(--header-height);
        justify-content: space-between;
    }
    h1{
        color: white;
        padding: 6px;
        cursor:pointer;
    }

    .avatar {
        cursor: pointer;
        position: relative;
        vertical-align: middle;
        top: 5px;
        right: 1%;
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
</style>


<header class="header navbar">
      
    <MenuIcon {active}/>
    <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost rounded-btn">{email}</label>
        <ul tabindex="0" class="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
            <li>
                <div class="flex flex-row align-center">
                  <img class="h-5" src="/settings.svg" alt="">
                  <label for="my-modal" class=" modal-button">Settings</label>

                </div>

                <!-- Put this part before </body> tag -->
                
            </li> 
            <li>
                <div class="flex flex-row align-center">
                  <img class="h-5" src="/logout.svg" alt="">
                  <a on:click={logout} >Logout</a>

                </div>
            </li>
        </ul>
      </div>
    <!-- <h1   style="margin-right:5px;">{email}</h1> -->
    <!-- <SearchBar/> -->
    <!-- <div   style="margin:2px;" class="messageicon" event-message-click>   
        <img src="../../static/messageicon.png"  alt="Avatar" class="avatar-img" >
    </div> -->
    <!-- <div class="avatar" event-avatar-click>   
        <img src="../../static/Profileicon.png"  alt="Avatar" class="avatar-img" >
    </div> -->
    <!-- <div class="avatar" event-logout-click>   
        <img on:click={logout} src="../../static/logout.png"  alt="Avatar" class="avatar-img" >
    </div> -->
    <div class="avatar-dropdown" data-avatar-dropdown>
        <ul>
        </ul>
    </div>
</header>




