<script>
    import { createEventDispatcher} from 'svelte'
    import { session } from '$app/stores';
    import { fade} from 'svelte/transition';
    const dispatch = createEventDispatcher();

    let email
    let password
    let firstName
    let lastName
    let birth = '2000-01-01'
    let sex = 'M'
    let street = 'mdfasystreet'
    let postcode = '3000-500'
    let city = 'citASDy'
    let country = 'poASDrtugal'
    let contact = 'contadSActNumber'
    let paypalAcc = 'paypalDSAAccount'

    let error
    export let current;
    function login(){
        current = 0;
    }
    async function register(){
        error = undefined
        try {
            const res = await fetch('/auth/register', {
                method: 'POST',
                body:JSON.stringify({                    
                    email,
                    firstName,
                    lastName,
                    birth,
                    sex,
                    street,
                    postcode,
                    city,
                    country,
                    contact,
                    paypalAcc,
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
                    email: email,
                }}
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

<form in:fade="{{delay:200,duration: 200}}" out:fade="{{duration: 200}}">
    <input type="email" bind:value={email} placeholder="Enter your email"><br>
    <input type="password" bind:value={password} placeholder="Enter your password"><br>
    <input type="firstName" bind:value={firstName} placeholder="Enter your First Name"><br>
    <input type="lastName" bind:value={lastName} placeholder="Enter your Last Name"><br><br><br>
    
    <button on:click={register}>Register</button><br>
    <button on:click|preventDefault={login}>Go to Login page</button><br>

</form>