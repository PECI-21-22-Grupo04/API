import {db} from "$lib/database/dbFunctions.js";

export async function post({request}){
    const body = await request.json();
    try{
        const instructor = await db.selectInstructor(body.email);
  
  
        if(instructor!==1)
        {   
            if(instructor!==2)
            {
                let parsed_data = JSON.parse(JSON.stringify(instructor))[0]
                return{
                    body: {parsed_data},
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