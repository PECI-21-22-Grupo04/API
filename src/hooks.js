import * as cookie from 'cookie'
import { getAuth } from "firebase/auth";
import jwt  from 'jsonwebtoken';
// import fs from 'fs'
// import { request } from 'http';


export const handle = async({event,resolve})=>{
    const cookies = cookie.parse(event.request.headers.get('cookie')|| '');
    
   //console.log("FPDEBUGGSASASAA - " +  JSON.stringify(event))

    event.locals.user = cookies || null;
    
    let response;
    let usermail;


    var decoded = jwt.decode(cookies.CookieId);

    

        jwt.verify( (cookies.CookieId), '697d7fb5dcde8cd048d3c9158b620b6910522b4d', function(err, decoded) {
            if(decoded)
            {

                event.locals.user.authenticated = true
                event.locals.user.email = cookies.usermail
             
       
            }
            else if (err){
                
                event.locals.user.authenticated = false
            
                
        
                
        
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

