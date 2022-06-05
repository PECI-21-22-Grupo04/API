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
    let postcode1;
    let postcode2;
    let city;
    let country;
    let contact;
    let paypalAcc;
    $ : postcode = postcode1 + "-" + postcode2
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

<form on:submit|preventDefault={register}  class="border-double bg-base-100" in:fade={{ delay: 200, duration: 200 }} out:fade={{ duration: 200 }}>

    <input   style="margin-bottom: 15px" required type="email" placeholder="Introduza o email"  bind:value={email}  class="input input-bordered w-full " />
    <input   style="margin-bottom: 15px" required type="password" placeholder="Introduza a password"  bind:value={password} class="input input-bordered w-full " />



    <div class="flex flex-row gap-4 ">
        <input   style="margin-bottom: 15px"  class="input input-bordered w-full " required
            type="firstName"
            bind:value={firstName}
            placeholder="Introduza o Primeiro Nome"
        />
        <input   style="margin-bottom: 15px" class="input input-bordered w-full " required
            type="lastName"
            bind:value={lastName}
            placeholder="Introduza o Último Nome"
        />
    </div>

    <input style="margin-bottom: 15px" class="input input-bordered w-full " required
        type="contact"
        bind:value={contact}
        placeholder="Enter your Contact"
    />
    <input style="margin-bottom: 15px" class="input input-bordered w-full " required
        type="paypal"
        bind:value={paypalAcc}
        placeholder="Enter your paypal email address"
    />
    <input style="margin-bottom: 15px" class="input input-bordered w-full "required
        type="date"
        data-date=""
        data-date-format="DD MMMM YYYY"
        bind:value={birth}
        placeholder="DD-MM-YYYY"
    />
    <input required style="margin-bottom: 15px" class="input input-bordered w-full " type="sex" bind:value={sex} placeholder="Enter your gender" />
    <input required style="margin-bottom: 15px" class="input input-bordered w-full " type="city" bind:value={city} placeholder="Enter your home city" />
    <input required style="margin-bottom: 15px" class="input input-bordered w-full " type="street" bind:value={street} placeholder="Enter your address" />
    <input required
    style="margin-bottom: 15px" class="input input-bordered w-full "
        type="country"
        bind:value={country}
        placeholder="Enter your country"
    />
    <div class="flex flex-row gap-5">
        <input style="margin-bottom: 15px" class="input input-bordered w-full " required
            type="postcode"
            bind:value={postcode1}
            placeholder="Enter your postcode"
        />
        -
        <input  required
        style="margin-bottom: 15px" class="input input-bordered w-full "
            type="postcode"
            bind:value={postcode2}
            placeholder="Enter your postcode"
        />
    </div>

    <button  class="btn btn-primary" >Register</button>
    <button  class="btn btn-accent" on:click|preventDefault={login}>Go to Login page</button>
</form>

<style>
    form {
        margin-bottom:  auto;
        margin-right: auto;
        margin-left: auto;

        display: flex;
        width: fit-content;
        /* border: 1px solid black; */
        padding: 2em;
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

 

</style>
