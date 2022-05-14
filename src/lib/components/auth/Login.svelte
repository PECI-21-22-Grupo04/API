
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
                dispatch('success')
            }else{
                error= 'An error occurred'
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
        background-color: white;
        /* border: 1px solid black; */
        padding: 1em;
        flex-direction: column;
        box-shadow: 1px 1px 1rem rgba(0, 0, 0, 0.2);
    }
   
    input{
        height: 36px;
    }


    input ,button{
        width: 300px;
    }
    button{
        height: 36px;
        background-color: #eee;
    }

    button:hover{
        background-color: #222;
        color: #fff
    }
</style>
<form in:fade="{{delay:200,duration: 200}}" out:fade="{{duration: 200}}" >
    <input type="email" bind:value={email} placeholder="Enter your email"><br>
    <input type="password" bind:value={password} placeholder="Enter your password"><br><br><br>
    
    <button on:click|preventDefault={login}>Login</button><br>
    <button on:click|preventDefault={register}>Register</button>
    
</form>