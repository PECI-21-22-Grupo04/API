import {db} from "$lib/database/dbFunctions.js";
import fs from 'fs'
import { PassThrough } from "stream";
export async function post({request}){
    const sessions = JSON.parse(fs.readFileSync("sessions.json", 'utf8'));
    // localStorage.setItem("name", request.body.name );
    const body = await request.json();
    const email = body.email
    console.log("email: " + email)
    let password = sessions[email].password;
    // await create(data);
    console.log(" EXERCISE : " + password)
    const exercise = await db.createExercise(
        email,
        body.name,
        body.difficulty,
        body.description,
        body.pathologie,
        body.targetmuscle,
        body.thumbnail,
        body.videopath,
        password
    );
    
    console.log(exercise) 
    if (exercise == 0) {
        console.log('sucesssssss');
        return{
            headers:{location:'/user/exercises'},
            status: 302
        }
    } else {
      console.log(exercise);
      console.log("something went wrong");
    }
}