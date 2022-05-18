import {db} from "$lib/database/dbFunctions.js";


export async function post({request}){
    const body = await request.json();
    let arr = []
    try{
        console.log("PID" + body.programID);
        const exercises = await db.selectPlanExercises(body.programID);
        console.log("query nova " + exercises)
        let parsed_data = JSON.parse(JSON.stringify(exercises))[0];
        console.log(parsed_data);

        for(var i in parsed_data)
                {arr.push(parsed_data[i]);}

        if (exercises) {
            return {
                body: {arr}
            };
        } else {
          
          
            return {
              
            };
        }
    }catch(e){
        console.log(e);
    }
}