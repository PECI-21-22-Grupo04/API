
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
  let  fileinput;

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
      
  }
	
</script>
<div class="flexcontainer">
  <div id="app">
    <h1>Upload Image</h1>
    
          {#if avatar}
          <img class="avatar" src="{avatar}" alt="d" />
          {:else}
          <img class="avatar" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" alt="" /> 
          {/if}
          <img class="upload" src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput.click();}} />
          <div class="chan" on:click={()=>{fileinput.click();}}>Choose Image</div>
          <input style="" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onImageSelected(e)} bind:this={fileinput} >
  
  </div>
  <div class="vertical-line"></div>
  <div id="app">
    <h1>Upload Video</h1>
    <img class="upload" src="data:image/jpeg;base64,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" alt="" on:click={()=>{fileinput.click();}} />
    <img class="upload" src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput.click();}} />
    <input style="" type="file" accept=" .mp4 " on:change={(e)=>onVideoSelected(e)} bind:this={fileinput} >
  
  </div>
</div>

<style>
  .vertical-line{
    height: 90%;
    width: 1px;
    background-color: black;
    margin: auto;
  }
  .flexcontainer{
    display: flex;
    flex-direction: row;
    margin: 20px auto;
    gap: 200px;
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

 

