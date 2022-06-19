<script context="module">
    export async function load({ params, session }) {
    const url = `/user/clients/${params.id}`;
    console.log(session.user)
    
    console.log(url)
    return {
        props: {
           
            url
        }
    }
  }
</script>
<script>

    import {onMount} from 'svelte';
    import {session } from '$app/stores';
    import Chat from '$lib/components/clients/Chat.svelte';
    import { goto } from "$app/navigation";
    import SelectPlan from "$lib/components/clients/SelectPlan.svelte";
    import { page } from '$lib/store/store.js';
    
    export let url;
    

    let toggle=0;
    let exer;
    let birthdate;
    let signday;
    let signhour;
    
    
    async function getClient(){
        
        console.log(url)
        const resIns = await fetch('/user/userinfo', {
                method: 'POST',
                body:JSON.stringify({                    
                    email: $session.user.email
                }),
                headers: {
                    'Content-Type': 'application/json',
                    "accept": "application/json"
                }
            })
        const res = await fetch(url, {
                method: 'POST',
                body:JSON.stringify({                    
                    email: $session.user.email
                }),
                headers: {
                    'Content-Type': 'application/json',
                    "accept": "application/json"
                }
            })
        const data = await res.json();
        let client = data.parsed_data[0];
        console.log(client)
        console.log(client.birthdate.substring(0,10))
        birthdate = client.birthdate.substring(0,10)
        signday = client.clientSince.substring(0,10)
        signhour = client.clientSince.substring(11,19)
        
        const dataIns = await resIns.json();
        const instrutor = [...dataIns.parsed_data][0];

        page.update(n => 
            n = `Cliente ${client.firstName} ${client.lastName}`
        )
        return {client,instrutor};
    }
    let promiseClient = getClient();
    
    function AddExerc(){
        toggle = 1;
    }
    function plandetails(){
        toggle = 0;
    }
</script>
<style>
    a{
        text-decoration: none;
        color:black;
        padding: 10px;
        width: fit-content;
        border: 1px solid black;
    }
    
    .detailedPlan {
        display: flex;
        flex-direction: column;
        position: absolute;
        padding: 6rem 3rem 6rem 6rem;
        background: #fff;
        max-width: 400px;
        border-radius: 10px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 1px 1px 2rem rgba(0, 0, 0, 0.3);
        margin: 0 auto;
    
        
    }

    .card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 400px;
  
  text-align: center;
}

.title {
  color: grey;
  font-size: 18px;
}



a {
  text-decoration: none;
  font-size: 22px;
  color: black;
}


</style>

 <!-- Add icon library -->
 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">





    {#await promiseClient}
        Loading 
    {:then user } 
 
        {#if toggle == 0}
            <div class="flex flex-row h-[92vh] ">

                <div class="card bg-base-100 h-[80vh] ml-20 mt-[50px] mb-20  px-10">
                    <img src="/Profileicon.png" alt="ProfilePic" style="width:100%">
                    <h1>{user.client.firstName} {user.client.lastName}</h1>
                    <p class="title">{user.client.mail}</p>
                    <h3>{user.client.sex}</h3>
                    <h1>Data de Nascimento: {birthdate}</h1>
                    <h1>Este utilizador associou se em: {signhour} {signday}</h1>
                    <p>
            
                    </p>
                    <div class="flex flex-row mx-auto">

                        <a href="#"><i class="fa fa-twitter"></i></a>
                        <a href="#"><i class="fa fa-linkedin"></i></a>
                        <a href="#"><i class="fa fa-facebook"></i></a>
                    </div>
                    <p></p>
                    <button class="btn btn-info my-5" on:click={AddExerc}> Partilhar planos</button>
                </div> 
                
            
                <Chat clientFire={user.client.firebaseID} instructor={user.instrutor} />
            </div>
        {:else}
            <SelectPlan bind:toggle client={user.client} clientmail={user.client.mail}/>
        {/if}
    {/await}

