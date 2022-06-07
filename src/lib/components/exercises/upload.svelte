
<script>
  export let current=1;
  export let exercise;

  function next(){
    current=2;
  }
  function back(){
    current=0;
  }
	export let  avatar;
  let  imageinput;
  let  videoinput;
  export let  video;



	const onImageSelected =(e)=>{
    exercise.expthumbnail = e.target.files[0];
    console.log(exercise.expthumbnail)
    let reader = new FileReader();
    reader.readAsDataURL( exercise.expthumbnail);
    reader.onload = e => {
      avatar = e.target.result
      // exercise.exp= e.target.result;



    };
  }
    const onVideoSelected =(e)=>{
    exercise.expvideo = e.target.files[0];
    console.log("video : " + exercise.expvideo)
    // exercise.thumbnail= Date.now()
    let reader = new FileReader();
    reader.readAsDataURL( exercise.expvideo);
    reader.onload = e => {
      video = e.target.result
      // exercise.exp= e.target.result;



    };  
  }
	
</script>
<div class="flex flex-col mx-auto">
  <div class="flexcontainer bg-base-100" style="width:1000px; height:600px;box-shadow: 1px 1px 1rem rgba(0, 0, 0, 0.2);">
    <div id="app"style="margin-right:auto; margin-left:40px; " >
    
            {#if avatar}
            <img style="height:250px;width:250px;" class="avatar" src="{avatar}"  alt="" on:click={()=>{imageinput.click();}} />
            {:else}
            <img style="height:250px;width:250px;" class="upload" src="/imageUpl.svg" alt="" on:click={()=>{imageinput.click();}} />
            {/if}
            <div class="chan" on:click={()=>{imageinput.click();}}>Choose Image</div>
            <input style="display: none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onImageSelected(e)} bind:this={imageinput} >
    
    </div>
  
    <div class="vertical-line bg-base-content" style="margin-top:auto;margin-bottom:auto; ">  </div>
    <div id="app" style="margin-left:auto; margin-right:40px; ">
  
      {#if video}
        <video style="height:250px;width:250px;" class="avatar" src={video} alt="" on:click={()=>{videoinput.click();}} ><track kind="captions"/></video>
  
      {:else}
      
      <img style="height:250px;width:250px;"class="upload" src="/video-upload.svg" alt="" on:click={()=>{videoinput.click();}} />
  
      {/if}
      <div class="chan" on:click={()=>{videoinput.click();}}>Choose Video</div>
      <input style="display: none" type="file" accept=" .mp4" on:change={(e)=>onVideoSelected(e)} bind:this={videoinput} >
  
  
    
    
    </div>
  </div>
  <div class="flex flex-row mt-5">

    <button on:click={back} class="btn btn-error" >Back </button>
    <button on:click={next} class="btn btn-info ml-auto" >Next </button>
  </div>
</div>



<style>
  .vertical-line{
    height: 300px;
    width: 1px;
    

  }
  .flexcontainer{
    display: flex;
    flex-direction: row;
    margin: 20px auto;

  }
	#app{
	display:flex;
		align-items:center;
		justify-content:center;
		flex-flow:column;
}
 
	.upload{
		display:flex;
	height:50px;
		width:50px;
		cursor:pointer;
	}
	.avatar{
		display:flex;
		height:200px;
		width:200px;
	}
</style>

 

