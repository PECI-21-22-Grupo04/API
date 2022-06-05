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
    import Navbar from '$lib/components/Navbar.svelte'
    import Settings from '$lib/components/Settings.svelte'
    import {setContext} from 'svelte';
    setContext('changeState', changeState);
    export let email
    let activeSidebar = false;    
    function changeState(){
        activeSidebar = !activeSidebar;
    }
</script>

<style>

main
{

    height:fit-content;

}

</style>

<Navbar active={activeSidebar} email={email} />
<Settings/>



<main >
    
     <slot></slot>
</main>
