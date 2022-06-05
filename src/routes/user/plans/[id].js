import {db} from "$lib/database/dbFunctions.js";


export async function post({params,request}){
    const body = await request.json();
    const email = body.email
    const id = await params.id;
    // we get id here 
    try{
        const plans = await db.selectInstructorProgramFromID(email,id);
        const parsed_data = JSON.parse(JSON.stringify(plans))[0];
        console.log( parsed_data);
        if (plans) {
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

export async function del({params,request}){
    const body = await request.json();
    const id = await params.id;
    try{
        const deleted_program = await db.deleteExercisefromProgram(body.programID, body.exerciseID);
  
  
        if(deleted_program!==1)
        {   
            if(deleted_program!==2)
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