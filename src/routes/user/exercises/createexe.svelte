<script>
    import Card from "$lib/components/Card.svelte";
    import Form from "$lib/components/exercises/Form.svelte"
    import Finnish from "$lib/components/exercises/Finnish.svelte";
    import {Steps} from 'svelte-steps'
    import Upload from '$lib/components/exercises/upload.svelte'
    import { goto } from "$app/navigation";
    import { session } from '$app/stores';
    import { storage } from "$lib/database/firebase.js"
    import { page } from '$lib/store/store.js';
    import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage"
    import {  onDestroy, onMount } from "svelte";
    const components = [Form,Upload]
    let current=0;
    let closeButton=0;
    let exp
    let avatar
    let video
    let exercise = {
            email:$session.user.email,
            name:"",
            firebaseRef:"",
            targetmuscle:"",
            difficulty:"",
            description:"",
            pathologie:"",
            thumbnail:"", // this is the link for
            videopath:"", // later we will call a function generateVideoPAth - that creates a download link for a mp4, we store here and later give it to our player.
            expvideo:null,
            expthumbnail:null
       }
    let stepsTextOnly = [
    { text: 'Detalhes' },
    { text: 'Upload' },
    { text: 'Confirmação' },
  ]
  onMount(()=>{
    page.update(n => 
            n = "Criar Exercicío"
        )
  })
  onDestroy(()=>{
    page.update(n => 
            n = ""
        )
  })
  function back(){
    current=1;
  }
 
  async function confirm(){
        closeButton = 1;
        let error = undefined;
        const date = Date.now();
        const image = exercise.expthumbnail;
        const video = exercise.expvideo;
        exercise.firebaseRef = `${date}`;
        const storageVideoRef = ref(storage, `videos/${date}`);
        const storageImageRef = ref(storage, `images/${date}`);

        const uploadVideo = uploadBytesResumable(storageVideoRef, video);
        const resvideo =  await uploadVideo.on("state_changed",
          (snapshot) => {

          },
          (error) => {
            closeButton = 0;
            alert("Houve um erro com o upload do video");
          },
          () => {
            getDownloadURL(uploadVideo.snapshot.ref).then(async (downloadURL) => {
              console.log(downloadURL)
              exercise.videopath = downloadURL;
              const uploadImage = uploadBytesResumable(storageImageRef, image);
              uploadImage.on("state_changed",
                (snapshot) => {

                },
                (error) => {
                  deleteObject(storageVideoRef).then(()=>{
                    console.log("video apagado com sucesso")
                  }).catch((error) => {
                    console.log("houve um erro com o delete do video uploaded")
                  })
                  closeButton = 0;
                  alert("Houve um erro com o upload da imagem");
                },
                () => {
                  getDownloadURL(uploadImage.snapshot.ref).then(async (downloadURL) => {
                    exercise.thumbnail = downloadURL;
                    delete exercise.expthumbnail;
                    delete exercise.expvideo;


                    let nnn = JSON.stringify(                    
                                exercise,
                            )
                    console.log(exercise)
                    try {
                        const res = await fetch('/user/exercises/createexe', {
                            method: 'POST',
                            body:nnn,
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        console.log(res)
                        if(res.redirected == true){
                            goto('/user/exercises')
                            console.log(res.status)
                            closeButton = 0;
                        }else{
                          
                          deleteObject(storageVideoRef).then(()=>{
                              console.log("video apagado com sucesso")
                            }).catch((error) => {
                              console.log("houve um erro com o delete do video uploaded")
                            })
                          deleteObject(storageImageRef).then(()=>{
                              console.log("imagem apagada com sucesso")
                            }).catch((error) => {
                              console.log("houve um erro com o delete da imagem uploaded")
                            })  
                          console.log("ahahah que smart")
                            error= 'An error occurred'
                        }
                        closeButton = 0;
                    } catch (err) {
                        console.log(err)
                        error = 'An error occurred'
                        closeButton = 0;
                    }
                  })
                }
              )
              



            })
          }
        )
          
        
    }
</script>
<style>
  .card-center{
    display: block;
    position: relative;
    margin: 20px auto;
  }

  button:hover{
    background-color: #222;
    color: #fff
  }

</style>
<p>
  
</p>
<!-- <svelte:component this={components[current]} {parsed_data}/> -->
<div style="margin-top:20px;margin-right:auto">
  <Steps  size={"2em"} bind:current steps={stepsTextOnly} />

</div>
<div class="flex flex-row " style="align-items:center;" >



  
  {#if current == 0 }
    <Form bind:current bind:exercise />
    {:else if current == 1}
    <Upload bind:current bind:exercise bind:avatar bind:video />

    {:else}
    <div class="flex flex-col mx-auto">

      <Finnish bind:avatar bind:exercise bind:current/>
      <div class="flex flex-row mt-10">
        <button on:click={back} class="btn btn-error" >Retroceder </button>

        {#if closeButton==1}
          <button class="btn btn-success loading ml-auto">Confirmar </button>
        {:else}
          <button on:click={confirm} class="btn btn-success  ml-auto">Confirmar </button>
        
        {/if}

      </div>
    </div>
    {/if}
  

</div>
