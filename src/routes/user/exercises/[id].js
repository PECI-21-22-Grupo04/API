import {db} from "$lib/database/dbFunctions.js";
import fs from 'fs'

export async function post({params,request}){
    const body = await request.json();
    const email = body.email
    const id = await params.id;
    
    try{

        const exercises = await db.selectInstructorExerciseFromID(email,id);

        if (exercises !=="data error")
        {
            if (exercises !== "fetch error")
            {
                let parsed_data = JSON.parse(JSON.stringify(exercises))[0];
                return {
                    status:200,
                    body: {parsed_data} 

                };
            }
            else
            {
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
            console.log("fetch error")
            return {
                status:409,
                body: {
                    message: "An error occured during query"
                }
                
            };
        }
        

    }catch(e){
        console.log(e);
    }
}