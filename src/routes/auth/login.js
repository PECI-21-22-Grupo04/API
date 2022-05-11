import * as cookie from 'cookie'
import {v4 as uuidv4} from 'uuid'
import {db} from "$lib/database/dbFunctions.js";
import fs from 'fs'

export async function post({request}){
    const body = await request.json();
    // console.log(body)
    const user = await db.selectInstructor(body.email,body.password);
    // const parsed_data = JSON.parse(JSON.stringify(user))[0];
    
    console.log(user)
    
    const cookieId = uuidv4()
    console.log(cookieId)
    //we need a way to set a cookieId for a user in the database
    let sessions={};
    fs.exists('sessions.json',(exists)=>{
        if(exists){
            fs.readFile("sessions.json", 'utf8', function readFileCallback(err, data){
                if (err){
                    console.log(err);
                } else {
                    sessions = JSON.parse(data); //now it an object
                    sessions[body.email] = cookieId; //add some data
                    const json = JSON.stringify(sessions); //convert it back to json
                    fs.writeFile("sessions.json", json, 'utf8', (error) => {
                        if (error) throw new Error('listId does not exist')
                        console.log('[write auth]: success');
                    }); // write it back 
                }
            });

        }else{
            sessions[body.email] = cookieId; //add some data
            const json = JSON.stringify(sessions);
            fs.writeFile("sessions.json", json, 'utf8', (error) => {
                if (error) throw new Error('listId does not exist')
                console.log('[write auth]: success');
            }); // write it back 
        }
    });

    //cookie to the header

    const headers = {
        'Set-Cookie': cookie.serialize('session_id', cookieId, {
            httpOnly: true,
            maxAge: 60*60*24 *7,
            sameSite: 'lax',
            path: '/'
        })
    }
    if(user != 1 && user != 2){
        return {
            status: 200,
            headers,
            body: {
                message: "Success"
            }
        }
    }else{
        return{
            status: 409,
            body: {
                message: "password or email wrong"
            }
        }
    }
}