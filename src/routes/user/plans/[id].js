import {db} from "$lib/database/dbFunctions.js";
import fs from 'fs'

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