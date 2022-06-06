<script context="module">
    export async function load({session}){
        if(session.user.authenticated) {
            return{
                status: 302,
                redirect: '/user'
            }
        }else{
            return{}
        }

     
    }
</script>

<script>
    import "../styles/global.css"
    import { navigating } from '$app/stores'
    import { loading } from '$lib/loading'
    console.log(navigating)
    $: $loading = !!$navigating


</script>


<!-- <Chat /> -->
<!-- {$loading} -->
<main class="bg-base-300" >
    
    

     <slot></slot>
</main>

