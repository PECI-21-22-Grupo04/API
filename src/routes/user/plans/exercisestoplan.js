import {db} from "$lib/database/dbFunctions.js";
export async function post({request}){
    // localStorage.setItem("name", request.body.name);
    // await create(data);
    const body = await request.json();
    //let plan = []
    console.log("HEREEEE" + JSON.stringify(body))
    let exercise
    for (let index = 0; index < body.exercises.length; index++) {
        const plan = await db.addExercisetoProgram(body.planid, body.exercises[index].exercise.exerciseID, body.exercises[index].sets, body.exercises[index].reps, '00:00:10');
        
        // do verification 


        
        if (plan == 0) {
            console.log('sucesssssss');
            // const exertoplan = await db.addExercisetoProgram(body.pro, body.pname, body.pdescription, body.pathology, body.pthumbnailPath, body.pvideoPath, body.showcase)
            
        } else {
          console.log(plan);
          console.log("something went wrong");
        }
    }



    return{
        headers:{location:'/user/plans/'},
        status: 302
    }
}