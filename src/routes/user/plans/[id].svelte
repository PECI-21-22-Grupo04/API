<script context="module">
    export async function load({ params }) {
        const url = `/user/plans/${params.id}`;
        console.log(url);
        return {
            props: {
                url: url,
            },
        };
    }
</script>

<script>
    import { Swiper, SwiperSlide } from "swiper/svelte";
    import "swiper/css";

    import "swiper/css/navigation";
    import { onMount } from "svelte";
    import { Navigation } from "swiper";

    import { page, session } from "$app/stores";
    import CreatePlanSelectExe from "$lib/components/plans/CreatePlanSelectExe.svelte";
    import Card from "$lib/components/Card.svelte";

    let plan = {};
    let parsed_data = {};
    export let url;
    let toggle = 0;
    let exer = [];
    onMount(async () => {
        console.log(url);
        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: $session.user.email,
            }),
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
            },
        });
        const data = await res.json();
        parsed_data = data.parsed_data;

        plan = parsed_data[0];

        plan["email"] = $session.user.email;
        console.log(plan);

        const res2 = await fetch("/user/plans/selectexercises", {
            method: "POST",
            body: JSON.stringify({
                programID: plan.programID,
            }),
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
            },
        });
        const data2 = await res2.json();

        exer = data2.arr;
        plan["exercises"] = [];
    });
    function AddExerc() {
        toggle = 1;
    }
    function plandetails() {
        toggle = 0;
    }
</script>

<h1
    class="col"
    style="text-align:center;font-size:50px; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;margin-top:30px;"
>
    {plan.pName}
</h1>

<div style="display:flex;justify-content:center; margin-top:30px; ">
    <div class="flex flex-col bg-base-200 w-[700px] h-[650px] text-center mr-10" style="box-shadow: 1px 1px 2rem rgba(0, 0, 0, 0.3);">
        <h1
        class="col mt-[20px]"
        style="text-align:center;font-size:32px; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;margin-bottom:30px"
        >
            Description
        </h1>
        <textarea class="w-[600px] h-[300px] m-auto input input-bordered" bind:value={plan.pDescription} disabled/>
        

    </div>



{#if toggle == 0}


    <div style="display:flex;justify-content:center; box-shadow: 1px 1px 2rem rgba(0, 0, 0, 0.3);" class=" bg-base-200 ">

        <div class="snap-x overflow-x-hidden my-auto p-5 gap-5" style="height:600px;">

            {#each [...exer] as exercise}
 
                <div class = "bg-base-100 flex flex-row w-full " style="height:160px; border-radius: 25px; margin-top:20px;  box-shadow: 1px 1px 2rem rgba(0, 0, 0, 0.3);">
                    
                    <img src={exercise.thumbnailPath} alt="" class="w-[200px] h-full" style="border-radius: 25px;">
                    <div class="w-[250px] overflow-hidden mx-auto py-5" >
                        <h1 class="mx-auto w-full text-center" style="font-size:x-large;font-weight:700;">{exercise.eName }</h1>
                        <div class="flex flex-row my-5 gap-2">
                            {#if exercise.difficulty == "Fácil"}
                                <h1 class="badge badge-outline badge-success badge-lg ml-auto" >{exercise.difficulty }</h1>
                            {:else if exercise.difficulty == "Média" }    
                                <h1 class="badge badge-outline badge-warning badge-lg ml-auto " >{exercise.difficulty }</h1>
                            {:else}
                                <h1 class="badge badge-outline badge-error badge-lg ml-auto " >{exercise.difficulty }</h1>

                            {/if }
                                <h1 class="badge badge-outline badge-lg mr-auto "  > {exercise.targetMuscle }</h1>

                        </div>
                        
                        <div class="flex flex-row">

                                <div class="badge badge-primary ml-auto " >Sets</div>
                                <div class="ml-3"> {exercise.numSets} </div>
                            
                            
                                <div class="badge badge-secondary ml-3" >Reps</div>
                                <div class="ml-3 mr-auto" > {exercise.numReps} </div>
                            
                        </div>
                    </div>

                </div>

             
            {/each}
         

          </div>

    </div>



{:else}
  <!--<CreatePlanSelectExe bind:plan /> -->  
{/if}

</div>

<a class="btn btn-error ml-10 relativ"  href="/user/plans">Back</a>

<style>
    /* a {
        text-decoration: none;
        color: black;
        padding: 10px;
        width: fit-content;
        border: 1px solid black;
    }
 */
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



    .anchor > img {
    height: 100px;
    width: 100px;
    position:absolute;
    margin:auto;
    top:0;right:0;bottom:0;left:0;
}
</style>
