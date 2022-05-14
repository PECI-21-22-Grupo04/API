
import {db} from "$lib/database/dbFunctions.js";
import fs from 'fs'


export async function post({request}){
    const sessions = JSON.parse(fs.readFileSync("sessions.json", 'utf8'))
    const body = await request.json();
    const email = body.email
    console.log("email: " + email)
    let password = sessions[email].password;
    
    try{
        const clients = await db.selectAllClients(email);
        // console.log(clients)
        let parsed_data = JSON.parse(JSON.stringify(clients))[0];
        console.log(parsed_data);
        if (clients) {
            return {
                body: {parsed_data}
            };
        } else {
            // @ts-ignore
            parsed_data = {e_name: 'NENHUM EXERCICIO'}
            return {
                status : {}
            };
        }
    }catch(e){
        console.log(e);
    }
}