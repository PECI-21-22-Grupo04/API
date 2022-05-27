import * as cookie from "cookie";
import { app } from "$lib/database/firebase.js";
import { getAuth, signOut } from "firebase/auth";

export async function post(req) {
    const auth= getAuth(app);

    //req.locals.user.CookieID=0;
    console.log("SOMEONE CALLED, ITS ME")


    try{
        await signOut(auth);

        return {
            status: 200,
            headers: {
                'Set-Cookie': cookie.serialize('CookieId', '', {
                    path: '/',
                    expires: new Date(0),
                }),
            },
           };

    }
    catch(error)
    {

        console.log("error" + error);
    }

       


    

}



          
    