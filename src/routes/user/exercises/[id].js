import {db} from "$lib/database/dbFunctions.js";


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

export async function patch({params,request}){
    const body = await request.json();
    const id = await params.id;
    try{
        const update_exercise = await db.updateExercise(id, 
                                                        body.eName, 
                                                        body.difficulty, 
                                                        body.eDescription, 
                                                        body.pathology, 
                                                        body.targetMuscle, 
                                                        body.thumbnailPath, 
                                                        body.videoPath 
                                                        );
  
  
        if(update_exercise!==1)
        {   
            if(update_exercise!==2)
            {
                return{
                    headers:{location:`/user/plans/${id}`},
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