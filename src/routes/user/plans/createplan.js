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
    const data = await request.formData();
    // await create(data);
    const plan = await db.createProgram(data.get("name"), data.get("description"), "","");
    
    console.log(plan) 
    if (plan == 0) {
        console.log('sucesssssss');
        return{
            headers:{location:'/user/plans/uploadplan'},
            status: 302
        }
    } else {
      console.log(plan);
      console.log("something went wrong");
    }
}