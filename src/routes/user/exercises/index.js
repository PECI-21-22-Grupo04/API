
import {db} from "$lib/database/dbFunctions.js";
import fs from 'fs'
    

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

