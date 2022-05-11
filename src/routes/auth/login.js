import * as cookie from 'cookie'
import {v4 as uuidv4} from 'uuid'
import {db} from "$lib/database/dbFunctions.js";
import fs from 'fs'

export async function post({request}){
    const body = await request.json();
    // console.log(body)
    const user = await db.selectInstructor(body.email,body.password)[0];
    const parsed_data = JSON.stringify(user);
    
    console.log(parsed_data )
    
    if(user != 1 && user != 2  ){
        const cookieId = uuidv4()
        console.log(cookieId)
        //we need a way to set a cookieId for a user in the database
        let sessions={};
        fs.exists('sessions.json',(exists)=>{
            if(exists){
                fs.readFile("sessions.json", 'utf8', (err, data) =>{
                    if (err){
                        console.log(err);
                    } else {
                        sessions = JSON.parse(data); //now it an object
                        sessions[body.email] = {"session":cookieId,
                                                "password": body.password
                                            }; //add some data
                        const json = JSON.stringify(sessions); //convert it back to json
                        fs.writeFile("sessions.json", json, 'utf8', (error) => {
                            if (error) throw new Error('listId does not exist')
                            console.log('[write auth]: success');
                        }); // write it back 
                    }
                });
    
            }else{
                sessions[body.email] = {"session":cookieId,
                                        "password": body.password
                                        }; //add some data
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
        console.log(headers)
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