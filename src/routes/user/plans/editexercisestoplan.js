import {db} from "$lib/database/dbFunctions.js";
export async function post({request}){
    // localStorage.setItem("name", request.body.name);
    // await create(data);
    const body = await request.json();
    //let plan = []
    // console.log("planid " + body.planid + "exid " + body.exercises[0].exerciseID + "reps : " + body.exercises[0].sets + "sets :"+ body.exercises[0].reps)
    console.log(body.exercisesToDelete + "ok")
    for (let index = 0; index < body.exercisesToDelete.length; index++) {
        const del = await db.deleteExercisefromProgram(body.plan.programID, body.exercisesToDelete[index].exerciseID);
        if (del == 0) {
            console.log('sucesssssss');
            // const exertodel = await db.addExercisetoProgram(body.pro, body.pname, body.pdescription, body.pathology, body.pthumbnailPath, body.pvideoPath, body.showcase)
            
        } else  if (del==1){
          console.log("something went wrong while adding plan");
        }
        else{
            console.log("something went wrong while adding plan 3");
        }
    }
    
    
    
    
    for (let index = 0; index < body.plan.exercises.length; index++) {
        const plan = await db.addExercisetoProgram(body.plan.programID, body.plan.exercises[index].exerciseID, index ,body.plan.exercises[index].numSets, body.plan.exercises[index].numReps, '00:00:10');
        //CALL spAddExerciseToProgram(1, 2, 1, 1, '00:00:10');
        // do verification 


        
        if (plan == 0) {
            console.log('sucesssssss');
            // const exertoplan = await db.addExercisetoProgram(body.pro, body.pname, body.pdescription, body.pathology, body.pthumbnailPath, body.pvideoPath, body.showcase)
            
        } else  if (plan==1){
          console.log("something went wrong while adding plan");
        }
        else{
            console.log("something went wrong while adding plan 3");
        }
    }



    return{
        
        status: 200
    }
}