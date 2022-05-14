<script context="module">
    export async function load({session}){
        if(!session.user.authenticated) {
            return{
                status: 302,
                redirect: '/'
            }
        }else{
            return{
                props: {
                    email: session.user.email
                }
            }
        }
        return {}
    }
</script>
<script>
    import "../../styles/global.css"
    import Navbar from '$lib/components/navbar.svelte'
    import Sidebar from '$lib/components/sidebar.svelte'
    import Chat from '$lib/components/chat.svelte'
    import {setContext} from 'svelte';
    setContext('changeState', changeState);
    export let email
    let activeSidebar = true;    
    function changeState(){
        activeSidebar = !activeSidebar;
    }
</script>



<Navbar active={activeSidebar} email={email} />
<Sidebar active={activeSidebar} />

<!-- <Chat /> -->
<main class:open={activeSidebar}>
    
     <slot></slot>
</main>

