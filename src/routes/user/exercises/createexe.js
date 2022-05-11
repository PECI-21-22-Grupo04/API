import {db} from "$lib/database/dbFunctions.js";
export async function post({request}){
    // localStorage.setItem("name", request.body.name );
    const body = await request.json();
    // await create(data);
    console.log(" EXERCISE : " + body.name)
    const exercise = await db.createExercise(
        body.name,
        body.difficulty,
        body.e_description,
        body.area,
        body.path,
        "body.videoPath",
        0
    );
    
    console.log(exercise) 
    if (exercise == 0) {
        console.log('sucesssssss');
        return{
            headers:{location:'/user/exercises'},
            status: 302
        }
    } else {
      console.log(exercise);
      console.log("something went wrong");
    }
}