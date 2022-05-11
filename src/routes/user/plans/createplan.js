import {db} from "$lib/database/dbFunctions.js";
export async function get(){
    
    try{
        const exercises = await db.selectAllExercises();
        const parsed_data = JSON.parse(JSON.stringify(exercises))[0];
        // console.log(parsed_data);
        if (exercises) {
            return {
                body: {parsed_data}
            };
        } else {
            return {
                status : 404
            };
        }
    }catch(e){
        console.log(e);
    }
}
export async function post({request}){
    // localStorage.setItem("name", request.body.name);
    // await create(data);
    const body = await request.json();
    console.log(JSON.stringify(body))
    const plan = await db.createProgram(body.email, body.pname, body.pdescription, body.pathology, body.pthumbnailPath, body.pvideoPath, body.showcase);
    
    console.log(plan) 
    if (plan == 0) {
        console.log('sucesssssss');
        // const exertoplan = await db.addExercisetoProgram(body.pro, body.pname, body.pdescription, body.pathology, body.pthumbnailPath, body.pvideoPath, body.showcase)
        return{
            headers:{location:'/user/plans/'},
            status: 302
        }
    } else {
      console.log(plan);
      console.log("something went wrong");
    }
}