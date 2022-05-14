import {db} from "$lib/database/dbFunctions.js";
import fs from 'fs'
import { PassThrough } from "stream";
export async function post({request}){
    const body = await request.json();
    const email = body.email



    try{

        const exercise = await db.createExercise(
            email,
            body.name,
            body.difficulty,
            body.description,
            body.pathologie,
            body.targetmuscle,
            body.thumbnail,
            body.videopath
        );
        

        if(exercise!==1)
        {   
            if(exercise!==2)
            {

                return{
                    headers:{location:'/user/exercises'},
                    status: 302
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