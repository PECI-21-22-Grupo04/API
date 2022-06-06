import {db} from "$lib/database/dbFunctions.js";

export async function patch({request}){
    const body = await request.json();
    try{
        const update_exercise = await db.addUserImage(body.email, 
                                                        body.imageURL   
                                                        );
  
  
        if(update_exercise!==1)
        {   
            if(update_exercise!==2)
            {
                return{
                    
                    status: 200
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