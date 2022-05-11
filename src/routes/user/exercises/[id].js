import {db} from "$lib/database/dbFunctions.js";
import fs from 'fs'

export async function post({params,request}){
    const sessions = JSON.parse(fs.readFileSync("sessions.json", 'utf8'));
    const body = await request.json();
    const email = body.email
    let pwd = sessions[email].password;
    const id = await params.id;
    
    try{
        const exercises = await db.selectInstructorExerciseFromID(email,id,pwd);
        const parsed_data = JSON.parse(JSON.stringify(exercises))[0];
        console.log(parsed_data);
        if (exercises) {
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