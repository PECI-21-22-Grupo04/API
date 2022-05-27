import * as cookie from "cookie";
import { v4 as uuidv4 } from "uuid";
import { db } from "$lib/database/dbFunctions.js";
import { app } from "$lib/database/firebase.js";
import fs from "fs";
// import app from "./register.js";
import jwt from "jsonwebtoken";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { initializeApp } from "firebase/app";
// const firebaseConfig = {
//   apiKey: "AIzaSyBHQxQkZSV4t20FD3j5l6Uw04KxcE70zQM",
//   authDomain: "runx-be658.firebaseapp.com",
//   projectId: "runx-be658",
//   storageBucket: "runx-be658.appspot.com",
//   messagingSenderId: "84913934296",
//   appId: "1:84913934296:web:39f8932c68556c41002cad",
//   measurementId: "G-5ZR565TEEL"
// };
// const app = initializeApp(firebaseConfig);
export async function post({ request }) {
  const body = await request.json();
  const auth = await getAuth(app);

  let cookieID;

  if (!body.email || !body.password) {
    console.log("Please insert all the required info.");
  } else {
    let success_f = 0;
    await signInWithEmailAndPassword(auth, body.email, body.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("logged in");
        success_f = 1;

        user.getIdToken().then((id) => {
          console.log("this is cookie " + id);
          cookieID = id;
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Credentials are wrong");
      });

    if (success_f === 1) {
      // save some parameters to storage, to ease dev (prob the name)

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
          message: "Success",
        },
      };
    } else {
      return {
        status: 509,
        body: {
          message: "Problem in Login",
        },
      };
    }
  }
}
