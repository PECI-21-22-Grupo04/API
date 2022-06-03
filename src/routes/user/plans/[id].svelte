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

<div style="display:flex;justify-content:center; margin-top:110px; ">
    <div 
        style="
                width: 700px;
                height:500px;
                border: 2px dotted black;
                padding: 50px;
                margin-right: 220px;
                border-color:#095776;
                inline-size: 650px;
                overflow-wrap: break-word;"

    >
    <h1
    class="col"
    style="text-align:center;font-size:32px; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;margin-bottom:30px"
>
    Description
</h1>
        {plan.pDescription}
    </div>



{#if toggle == 0}


    <div style="display:flex;justify-content:center;">

        <div class="snap-x overflow-x-auto" style="height:500px;">

            {#each [...exer] as exercise}
 

            <div class="snap-center ">
                <div class = "transparent flex flex-row" style="height:150px; width:300px;margin-bottom:auto; border-radius: 25px; padding:25px; margin-top:10px;">
                    
                    <div>
                        <h1 style="font-size:x-large;font-weight:700;">{exercise.eName }</h1>
                        <h1 style="margin:5px; font-size:large;font-weight:300;" >{exercise.difficulty }</h1>
                        <h1  style=" font-size:x-large;font-weight:700;" > {exercise.targetMuscle }</h1>
                    </div>
                    <div style="margin-left:auto">
                        <h1 style="font-size:x-large;font-weight:700;"> R:{exercise.numReps }</h1>
                        <h1 style="font-size:x-large;font-weight:700;"> S:{exercise.numSets}</h1>


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

<a href="/user/plans">Back</a>
<div>
    <p />
</div>

<style>
    a {
        text-decoration: none;
        color: black;
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

    .transparent {
      background-color: rgba(255,255,255,0.91);
    }

    .anchor > img {
    height: 100px;
    width: 100px;
    position:absolute;
    margin:auto;
    top:0;right:0;bottom:0;left:0;
}
</style>
