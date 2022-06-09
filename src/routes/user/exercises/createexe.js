import {db} from "$lib/database/dbFunctions.js";

export async function post({request}){
    const body = await request.json();
    const email = body.email


    console.log(email)
    console.log("this is body " + JSON.stringify(body))

    


    
    try{

        const exercise = await db.createExercise(
            email,
            body.name,
            body.firebaseRef,
            body.difficulty,
            body.description,
            body.pathologie,
            body.targetmuscle,
            body.thumbnail,
            body.videopath
        );
        
        console.log(exercise)
        if(exercise!==1)
        {   
            if(exercise!==2)
            {
                return{
                    headers:{location:'/user/exercises'},
                    status: 303
                }


            }
            else
            {
                //err
                console.log("Data error")
                return{
                    
                    status: 409,
                    message:"Error occured"
                }
            }

        }
        else
        {
            //err
            console.log("Connection error")
            return{
                    
                status: 409,
                message:"Error occured"
            }
        }


   }catch(e)
    {
        //err
        console.log(e);
        console.log("Error in the query")
    }
  
    

  
    
  
  
    
}