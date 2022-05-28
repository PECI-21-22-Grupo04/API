
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
        background-color: white;
        /* border: 1px solid black; */
        padding: 1em;
        flex-direction: column;
        box-shadow: 1px 1px 1rem rgba(0, 0, 0, 0.2);
        border-radius: 6px;
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
    button{
        cursor: pointer;
        width: 100%;
        height: 36px;   
        background-color: white;
        border-radius: .4rem;
        border: 2px solid rgb(107, 107, 107);
        transition: .33s ease color, .33s ease background;
    }

    button:hover{
        background-color: rgb(107, 107, 107);
        color: #fff
    }
</style>
<form on:submit|preventDefault={login} in:fade="{{delay:200,duration: 200}}" out:fade="{{duration: 200}}" >
    <input required type="email" bind:value={email} placeholder="Enter your email">
    <input required style="margin-bottom: 25px" type="password" bind:value={password} placeholder="Enter your password">
    

    <button >Login</button>
    <button  on:click|preventDefault={register}>Register</button>
    
</form>