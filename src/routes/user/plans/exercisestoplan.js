import {db} from "$lib/database/dbFunctions.js";
export async function post({request}){
    // localStorage.setItem("name", request.body.name);
    // await create(data);
    const body = await request.json();
    //let plan = []
    console.log("planid " + body.planid + "exid " + body.exercises[0].exercise.exerciseID + "reps : " + body.exercises[0].sets + "sets :"+ body.exercises[0].reps)
    let exercise
    for (let index = 0; index < body.exercises.length; index++) {
        const plan = await db.addExercisetoProgram(body.planid, body.exercises[index].exercise.exerciseID, index ,body.exercises[index].sets, body.exercises[index].reps, '00:00:10');
        //CALL spAddExerciseToProgram(1, 2, 1, 1, '00:00:10');
        // do verification 


        
        if (plan == 0) {
            console.log('sucesssssss');
            // const exertoplan = await db.addExercisetoProgram(body.pro, body.pname, body.pdescription, body.pathology, body.pthumbnailPath, body.pvideoPath, body.showcase)
            
        } else  if (plan==1){
          console.log(plan);
          console.log("something went wrong while adding plan");
        }
        else{
            console.log("something went wrong while adding plan 3");
        }
    }



    return{
        headers:{location:'/user/plans/'},
        status: 302
    }
}