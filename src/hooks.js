import * as cookie from 'cookie'
import fs from 'fs'
import { request } from 'http';

export const handle = async({event,resolve})=>{
    const cookies = cookie.parse(event.request.headers.get('cookie')|| '');

    event.locals.user = cookies || null;
    
    let response;
    let sessions = {}
    let usermail;
    if(!fs.existsSync('sessions.json')){
        event.locals.user.authenticated = false
        response = await resolve(event);
        return response
    }else{
        var content = fs.readFileSync("sessions.json", 'utf8');
        sessions = JSON.parse(content)
        for (let key in sessions) {
            if(sessions[key].session === cookies.session_id){
                usermail = key;
                break
            }
        }
        console.log(usermail)
        if(usermail){
            event.locals.user.authenticated = true
            event.locals.user.email = usermail
        }else{
            event.locals.user.authenticated = false
            
        }

    }
            
    response = await resolve(event);
    return response
    
}

export async function getSession(event) {
    
    /* console.log(event.locals.user) */
    if(!event.locals.user.authenticated){
        
        return{
            user: {
                authenticated: false
            }
        }
    }else{
        return{
            user: {
                authenticated: true,
                email: event.locals.user.email,
            }
        }
    }
}

