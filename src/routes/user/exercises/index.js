
import {db} from "$lib/database/dbFunctions.js";

    

export async function post({request}){

    const body = await request.json();
    const email = body.email
    console.log("email: " + email)

    
    try{

        console.log("are we coming here")
        const exercises = await db.selectAllExercises(email);

        if (exercises !=="data error")
        {
            if(exercises !== "fetch error")
            {   
                let parsed_data = JSON.parse(JSON.stringify(exercises))[0];
                console.log("body - " + JSON.stringify(parsed_data))
                return {
                    status:200,
                    body: {parsed_data} 

                };
            }
            else
            {
                //err

                console.log("fetch error")
                return {
                    status:409,
                    body: {
                        message: "An error occured during query"
                    }
                    
                };
            }
        }
        else
        {
            //err
            console.log("data error")
            return {
                status:409,
                body: {
                    message: "An error occured during fetch"
                }
        }

    }
        // console.log(exercises)


      


    } catch(e){

        console.log('query went wrong')
        console.log(e);

    }
}

export async function del({request}){
    const body = await request.json();
    try{
        const deleted_exercise = await db.deleteExercise(body.exerciseID);


        if(deleted_exercise!==1)
        {   
            if(deleted_exercise!==2)
            {
                return{
                    headers:{location:'/user/exercises'},
                    status: 302
                }
            }
            else
            {
                console.log("Data error")
                return{
                    status: 409,
                    message:"Error occured"
                }
            }

        }
        else
        {
            console.log("Connection error")
            return{
                status: 409,
                message:"Error occured"
            }
        }


    }catch(e)
    {
        console.log(e);
        console.log("Error in the query")
    }



}