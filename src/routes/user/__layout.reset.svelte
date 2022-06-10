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
// @ts-nocheck

    import {fade} from 'svelte/transition'
    import "../../styles/global.css"
    import Navbar from '$lib/components/Navbar.svelte'
    import Settings from '$lib/components/Settings.svelte'
    import {onMount, setContext} from 'svelte';
    import {instrutorStore} from "$lib/store/store.js"
    setContext('changeState', changeState);
    export let email
    let activeSidebar = false;    
    function changeState(){
        activeSidebar = !activeSidebar;
    }

    onMount(async() => {
        const res = await fetch('/user/userinfo', {
                method: 'POST',
                body:JSON.stringify({                    
                    email
                }),
                headers: {
                    'Content-Type': 'application/json',
                    "accept": "application/json"
                }
            })
        const data = await res.json();

        /* instrutorStore.update( (n) => {
            n = [...data.parsed_data][0];
            console.log(JSON.stringify(n))
        }) */
        $instrutorStore = [...data.parsed_data][0];
    })
     
    
</script>

<style>



</style>

<Navbar active={activeSidebar} email={email} />
<Settings email={email}/>



<main class="bg-base-300" >
        
        <slot></slot>

    
</main>
