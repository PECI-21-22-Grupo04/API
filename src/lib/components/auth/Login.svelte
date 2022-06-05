
<script>
    import { createEventDispatcher} from 'svelte'
    import { session } from '$app/stores';
    import { fade} from 'svelte/transition';
    const dispatch = createEventDispatcher();

    let email
    let password
    let error
    export let current;
    function register(){
        current = 1;
    }
    async function login(){
        error = undefined
        //event.preventDefault();
        try {
            const res = await fetch('/auth/login', {
                method: 'POST',
                body:JSON.stringify({                    
                    email,
                    password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(res.ok){
                $session = {
                    user: {
                    authenticated: true,
                    email: email
                }}
                dispatch('success')
                
            }else{
                error= 'An error occurred'
                alert("Wrong Credentials")
            }
        } catch (err) {
            console.log(err)
            error = 'An error occurred'
        }
    }
</script>
<style>

form{
        margin: 20px auto ;
   
        margin-right: auto;
        display: flex;
        width: fit-content;

        /* border: 1px solid black; */
        padding: 1em;
        flex-direction: column;
        box-shadow: 1px 1px 1rem rgba(0, 0, 0, 0.2);

    }

form > *:not(:last-child) {
    margin-bottom: 10px;
}
   
    input{
        height: 36px;
        padding: 2.5px 10px;
    }


    input ,button{
        width: 300px;
    }

</style>
<form style="padding:40px;" class="border-double bg-base-100" on:submit|preventDefault={login} in:fade="{{delay:200,duration: 200}}" out:fade="{{duration: 200}}" >
    <input required type="email" placeholder="Introduza o email"  bind:value={email}  class="input input-bordered w-full max-w-xs" />


    <input   style="margin-bottom: 35px" required type="password" placeholder="Introduza a password"  bind:value={password} class="input input-bordered w-full max-w-xs" />



    

    <button class="btn btn-primary" >Login</button>
    <button class="btn btn-accent" on:click|preventDefault={register}>Register</button>
    
</form>