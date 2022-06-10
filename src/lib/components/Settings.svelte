<script>
    import { storage } from "$lib/database/firebase.js"
    import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage"

	export let email; 
	let avatar;
	let upload = "";
	let imageinput;
	const onImageSelected =(e)=>{
		const date = Date.now();
    	const image = e.target.files[0];
		const storageImageRef = ref(storage, `userImages/${date}`);
		const uploadImage = uploadBytesResumable(storageImageRef, image);
              uploadImage.on("state_changed",
                (snapshot) => {

                },
                (error) => {
                },
                () => {
                  getDownloadURL(uploadImage.snapshot.ref).then(async (downloadURL) => {
                    const imageURL = downloadURL;
                    try {
                        const res = await fetch('/user/updateimage', {
                            method: 'PATCH',
                            body:JSON.stringify(
								{
									email:email,
									imageURL
								}
							),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        console.log(res)
                        if(res.ok){
                            upload = "Sucesso"
                        }else{
							upload = "algo falhou"
                          
                          console.log("ahahah que smart")
                        }
                        
                    } catch (err) {
                        console.log(err)
                        
                    }
                  })
                }
              )

    	console.log(image)
    	let reader = new FileReader();
		reader.readAsDataURL( image);
		
		reader.onload = e => {
			avatar = e.target.result
			
    };
  }

</script>


<input type="checkbox" id="my-modal" class="modal-toggle" />
	<div class="modal">
		<div class="modal-box">
			<div id="app"style="margin-right:auto; margin-left:40px; " >
    
				{#if avatar}
				<img style="height:250px;width:250px;" class="avatar" src="{avatar}"  alt="" on:click={()=>{imageinput.click();}} />
				{:else}
				<img style="height:250px;width:250px;" class="upload" src="/imageUpl.svg" alt="" on:click={()=>{imageinput.click();}} />
				{/if}
				<div class="chan" on:click={()=>{imageinput.click();}}>Choose Image</div>
				<input style="display: none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onImageSelected(e)} bind:this={imageinput} >
		
			</div>

			<h3 class="font-bold text-lg">THIS WILL BE FOR CHANING USER SETTINGS</h3>
			<p class="py-4">{upload}</p>
			<p class="py-4">CHANGE ...</p>
			<p class="py-4">CHANGE ...</p>
			<p class="py-4">CHANGE ....</p>
			<p class="py-4">CHANGE .....</p>

			<div class="modal-action">
				<label for="my-modal" class="btn">Yay!</label>
			</div>
		</div>
	</div>