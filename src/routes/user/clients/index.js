
import {db} from "$lib/database/dbFunctions.js";
import fs from 'fs'


export async function post({request}){
    
    const body = await request.json();
    const email = body.email
    
    
    
    try{
        const clients = await db.selectAllClients(email);

        if (clients !==2)
        {
            if(clients !== 1)
            {   
                let parsed_data = JSON.parse(JSON.stringify(clients))[0];
                console.log( "SDADSADSA" + parsed_data);
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


        }
            //err
            console.log("data error")
            return {
                status:409,
                body: {
                    message: "An error occured during fetch"
                }
        }
     




   




    }
    catch(e){
        console.log('query went wrong')
        console.log(e);
    }
}