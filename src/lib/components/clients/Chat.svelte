<script>
    import { app, firestore } from "$lib/database/firebase"
    import { addDoc, setDoc, getDocs, doc, collection, getFirestore,onSnapshot, query, orderBy, limit } from "firebase/firestore"
    import { onMount } from "svelte";
    import { session } from "$app/stores";
    export let clientFire;
    export let instructor;
    let inputField
    let message = "";
    let groupchatID = `${clientFire}-${instructor.fireBaseID}`
    
    let chatMessages = []
    let qAuto = query(collection(firestore, 'messages', groupchatID, groupchatID),orderBy("timestamp","desc"))
    const qOnce = query(collection(firestore, 'messages', groupchatID, groupchatID),orderBy("timestamp"))

    
    onSnapshot(qAuto, (querySnapshot) => {
        chatMessages = []
        querySnapshot.forEach((doc) => {
            chatMessages.push(doc.data())
        });
        chatMessages = [...chatMessages]
        console.log(chatMessages)
    });
    const zero = 0
    async function sendMessage(message){
        let document = {
            idFrom: instructor.fireBaseID,
            idTo: clientFire,
            content: message,
            type: zero,
            timestamp: Date.now().toString()
        }
        inputField.value = ""
        console.log(message + " ooooooooooo")
        const ref = doc(firestore,'messages', groupchatID, groupchatID, document.timestamp.toString() )
        
        try {
            await setDoc(ref,document)
        } catch (error) {
            console.log("error on sending message" + error)
        }
    }

    

</script>
<style>
    .chat{
        box-shadow: 1px 1px 2rem rgba(0, 0, 0, 0.3);
    }
    .chat > :first-child {
        margin-bottom: 80px;
    }
    .chat::-webkit-scrollbar-track {
        
        border-radius: 10px;
       
    }
    
    .chat::-webkit-scrollbar{
        width: 8px;
       
    }
    
    .chat::-webkit-scrollbar-thumb {
        border-radius: 10px;
        
        background-color: #3d3d3d;
    }
</style>

<div class="chat right-20 bottom-20 top-20 card mx-auto fixed mt-10 px-5 flex flex-col-reverse bg-base-200 h-[80%] w-[600px] overflow-auto">
   
    {#each chatMessages as message}
        {#if message.idTo == clientFire }
            {#if message.type == 0}
                <div class="ml-auto p-3 my-1 bg-base-100 rounded-lg ">{message.content}</div>    
            {:else}
                <div class="ml-auto p-3 my-1 bg-base-100 rounded-lg ">
                    <img src={message.content} alt="">
                </div>
            {/if}
        {:else}
            {#if message.type == 0}
                <div class="p-3 my-1 w-[fit-content] bg-green-300 rounded-lg text-black">{message.content}</div>    
            {:else}
                <div class="p-3 my-1 w-[fit-content] bg-green-300 rounded-lg text-black">
                    <img src={message.content} alt="">
                </div>
            {/if}
        {/if}
    
    {/each}
    <form class="flex flex-row fixed w-full my-5 fixed mx-auto " on:submit|preventDefault={() => sendMessage(message)}>
        <input type="text"  bind:this={inputField} bind:value={message} class="input input-borderline w-[475px] ">
        <button class="btn btn-confirm" >Send</button>

    </form>
</div>