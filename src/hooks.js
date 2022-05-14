import * as cookie from 'cookie'
import { getAuth } from "firebase/auth";
import jwt  from 'jsonwebtoken';
// import fs from 'fs'
// import { request } from 'http';
import app from '../src/routes/auth/register.js'

export const handle = async({event,resolve})=>{
    const cookies = cookie.parse(event.request.headers.get('cookie')|| '');
    
   //console.log("FPDEBUGGSASASAA - " +  JSON.stringify(event))

    event.locals.user = cookies || null;
    
    let response;
    let usermail;
    console.log("BEFOREEE \n " + JSON.stringify(cookies.CookieId))

    var decoded = jwt.decode(cookies.CookieId);

    console.log("FPDEBUGTTTT \n " + JSON.stringify(decoded))

        jwt.verify( (cookies.CookieId), '697d7fb5dcde8cd048d3c9158b620b6910522b4d', function(err, decoded) {
            if(decoded)
            {
                console.log("decoded  " +decoded)
                event.locals.user.authenticated = true
                event.locals.user.email = cookies.usermail
                console.log("true")
       
            }
            else if (err){
                
                event.locals.user.authenticated = false
                console.log("false")
                
        
                
        
            }
       
      });


   
            
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

