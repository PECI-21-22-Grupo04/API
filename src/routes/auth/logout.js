import { app } from "$lib/database/firebase.js";
import { getAuth, signOut } from "firebase/auth";

export async function post({}) {
    const auth= getAuth(app);


    console.log("SOMEONE CALLED, ITS ME")

    try{
        await signOut(auth);

        return {
            status: 200,
            body: {
              message: "Log Out Success",
            },
          
        }

    }
    catch(error)
    {

        console.log("error" + error);
    }

       


    

}



          
    