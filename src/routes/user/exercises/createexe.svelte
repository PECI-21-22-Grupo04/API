<script>
    import Card from "$lib/components/Card.svelte";
    import Form from "$lib/components/exercises/Form.svelte"
    import {Steps} from 'svelte-steps'
    import Upload from '$lib/components/exercises/upload.svelte'
    import { goto } from "$app/navigation";
    import { session } from '$app/stores';
    import { storage } from "$lib/database/firebase.js"
    import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
    const components = [Form,Upload]
    let current=0;
    let exp
    let avatar
    let exercise = {
            email:$session.user.email,
            name:"",
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
  function back(){
    current=1;
  }
  async function confirm(){
        let error = undefined;
        const date = Date.now();
        const image = exercise.expthumbnail;
        const video = exercise.expvideo;
        const storageVideoRef = ref(storage, `videos/${date}`);
        const storageImageRef = ref(storage, `images/${date}`);

        const uploadVideo = uploadBytesResumable(storageVideoRef, video);
        const resvideo =  await uploadVideo.on("state_changed",
          (snapshot) => {

          },
          (error) => {
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
                        if(res.ok){
                            goto('/user/exercises')
                        }else{
                            error= 'An error occurred'
                        }
                    } catch (err) {
                        console.log(err)
                        error = 'An error occurred'
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

  .line{
    width: 112px;
    height: 47px;
    border-bottom: 1px solid black;
    position: absolute;
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
    <Upload bind:current bind:exercise bind:avatar />

    {:else}
    <div class="card-center">
      
      <Card >


        <figure><img   src={avatar } alt="" /></figure>
        <div class="card-body">
        <h2 class="card-title">
            {exercise.name}

        </h2>
        <div>
            {exercise.description}
        </div>
        <div class="card-actions justify-end">
            <div class="badge badge-outline">{exercise.difficulty}</div> 
            <div class="badge badge-outline">{exercise.targetmuscle}</div>
        </div>
</div>


      </Card>
      
      <p>
        
      </p>
      <p>
  
      </p>
      <button on:click={confirm} >Confirm </button>
      <button on:click={back} >Back </button>
    </div>
    {/if}
  

</div>
