<script>
    import { createEventDispatcher } from "svelte";
    import { session } from "$app/stores";
    import { fade } from "svelte/transition";
    const dispatch = createEventDispatcher();
    // Import the functions you need from the SDKs you need
    // Import the functions you need from the SDKs you need

    let email;
    let password;
    let firstName;
    let lastName;
    let birth;
    let sex;
    let street;
    let postcode;
    let city;
    let country;
    let contact;
    let paypalAcc;

    let error;
    export let current;
    function login() {
        current = 0;
    }
    async function register() {
        console.log("we registering");
        error = undefined;
        event.preventDefault();
        try {
            const res = await fetch("/auth/register", {
                method: "POST",
                body: JSON.stringify({
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
                    password,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (res.ok) {
                $session = {
                    user: {
                        authenticated: true,
                        email: email,
                    },
                };
                dispatch("success");
            } else {
                error = "An error occurred";
            }
        } catch (err) {
            console.log(err);
            error = "An error occurred";
        }
    }
</script>

<form on:submit|preventDefault={register} in:fade={{ delay: 200, duration: 200 }} out:fade={{ duration: 200 }}>
    <input required type="email" bind:value={email} placeholder="Enter your email" />
    <input required
        type="password"
        bind:value={password}
        placeholder="Enter your password"
    />
    <input required
        type="firstName"
        bind:value={firstName}
        placeholder="Enter your First Name"
    />
    <input required
        type="lastName"
        bind:value={lastName}
        placeholder="Enter your Last Name"
    />
    <input required
        type="contact"
        bind:value={contact}
        placeholder="Enter your Contact"
    />
    <input required
        type="paypal"
        bind:value={paypalAcc}
        placeholder="Enter your paypal email address"
    />
    <input required
        type="birth-date"
        bind:value={birth}
        placeholder="Enter your birth"
    />
    <input required type="sex" bind:value={sex} placeholder="Enter your gender" />
    <input required type="city" bind:value={city} placeholder="Enter your home city" />
    <input required type="street" bind:value={street} placeholder="Enter your address" />
    <input required
        type="country"
        bind:value={country}
        placeholder="Enter your country"
    />
    <input style="margin-bottom: 25px"  required
        type="postcode"
        bind:value={postcode}
        placeholder="Enter your postcode"
    />

    <button >Register</button>
    <button on:click|preventDefault={login}>Go to Login page</button>
</form>

<style>
    form {
        margin: 20px auto;
        margin-right: auto;
        display: flex;
        width: fit-content;
        background-color: white;
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

    input,
    button {
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
