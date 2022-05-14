import {db} from "$lib/database/dbFunctions.js";
import fs from 'fs'

export async function post({params,request}){
    const body = await request.json();
    const email = body.email
    const id = await params.id;
    try{
        const client = await db.selectInstructorClientFromID(email,id);
        const parsed_data = JSON.parse(JSON.stringify(client))[0];
        console.log(parsed_data);
        if (client) {
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