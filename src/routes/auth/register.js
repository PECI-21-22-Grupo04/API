// import stringHash from 'string-hash'
import * as cookie from 'cookie';
import {v4 as uuidv4} from 'uuid';
import {db} from "$lib/database/dbFunctions.js";
import {app} from "$lib/database/firebase.js";
import fs from 'fs';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import jwt from "jsonwebtoken";
// import { initializeApp } from "firebase/app";




// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBHQxQkZSV4t20FD3j5l6Uw04KxcE70zQM",
//   authDomain: "runx-be658.firebaseapp.com",
//   projectId: "runx-be658",
//   storageBucket: "runx-be658.appspot.com",
//   messagingSenderId: "84913934296",
//   appId: "1:84913934296:web:39f8932c68556c41002cad",
//   measurementId: "G-5ZR565TEEL"
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);

export async function post({request}){
    const body = await request.json();

    if (!body.email || !body.password || !body.firstName || !body.lastName || !body.birth  || !body.sex  || !body.street ||!body.postcode ||!body.city ||!body.country || !body.contact || !body.paypalAcc )
    {
        console.log("Please insert all the required info.")
    }

    else
    {
        let success_f=0;
        //getFirestore(firebaseApp)
        const auth = getAuth(app);
    
        await createUserWithEmailAndPassword(auth, body.email, body.password) 
        .then((userCredential) => {
    
        // Signed in
        const user = userCredential.user;
    
        console.log("we creating firebase");
        success_f=1;
        // ...
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    
        console.log(error.message)
        // ..
        });
    
        if (success_f===1)
        {
            const newuser = await db.createInstructor(body.email, body.firstName, body.lastName, body.birth, body.sex, body.street,body.postcode,body.city,body.country,body.contact,body.paypalAcc);
            if(newuser == 0){
    
            
                const cookieID = uuidv4()
                
                
                const headers = {
                    "Set-Cookie": [
                      cookie.serialize("usermail", body.email, {
                        httpOnly: true,
                        maxAge: 60 * 60,
                        sameSite: "lax",
                        path: "/",
                      }),
                      cookie.serialize(
                        "CookieId",
                        jwt.sign(
                          {
                            data: cookieID,
                          },
                          "697d7fb5dcde8cd048d3c9158b620b6910522b4d"
                        ),
                        {
                          httpOnly: true,
                          maxAge: 60 * 60,
                          sameSite: "lax",
                          path: "/",
                        }
                      ),
                    ]
                  }
                return {
                    status: 200,
                    headers,
                    body: {
                        message: "Success, user was created"
                    }
                }
            }
            
            else{
                return{
                    status: 500,
                    body: {
                        message: "An error occured during Registration"
                    }
                }
            }
        }
        else
        {
            // delete from firebase in case we cannot register in our DB

            console.log("There was a problem with registration")
            return{
                status: 409,
                body: {
                    message: "An error occured during Registration"
                }
            }
        }
        
    }
   


}