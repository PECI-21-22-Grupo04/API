import * as cookie from 'cookie';

import {db} from "$lib/database/dbFunctions.js";
// export async function get(){
    
//     try{
//         const exercises = await db.selectAllExercises();
//         const parsed_data = JSON.parse(JSON.stringify(exercises))[0];
//         // console.log(parsed_data);
//         if (exercises) {
//             return {
//                 body: {parsed_data}
//             };
//         } else {
//             return {
//                 status : 404
//             };
//         }
//     }catch(e){
//         console.log(e);
//     }
// }
export async function post({request}){
    // localStorage.setItem("name", request.body.name);
    // await create(data);
    console.log("are we here..sdas.ds.adasdas")
    const body = await request.json();
    console.log(JSON.stringify(body))
    const plan = await db.createProgram(body.email, body.pname, body.pdescription, body.pathology, body.pthumbnailPath, body.pvideoPath, body.showcase);
    
    console.log(plan) 
    let pid;
    // do verification  
                // call sp to get id
                            // populate new data
    if (plan == 0) {
 

        const pplan = await db.selectAllPrograms(cookie.parse(request.headers.get("cookie")).usermail);

        if(pplan!== "fetch error")
        {
            if(pplan!== "data error")
            {
               console.log("jesusus" + JSON.parse(JSON.stringify(pplan))[0].length);

               for ( let i = 0 ; i<JSON.parse(JSON.stringify(pplan))[0].length ; i++)
               {
                    console.log("doing things")
                    console.log(JSON.stringify(JSON.parse(JSON.stringify(pplan))[0][i].pName))
                  if (JSON.parse(JSON.stringify(pplan))[0][i].pName  === body.pname )
                  {
                    //populate
                    console.log("true")
                    pid=JSON.stringify(JSON.parse(JSON.stringify(pplan))[0][i].programID)
                    console.log("pid: \n " + pid)

                    return{
                        status: 200,
                        body:{pid},
                  }
               }


            }
            }
            else
            {
                //err
                console.log("data error")
                return{
                    status: 409,
                    body:{message:'error'},
              }
            }
        }
        else
        {
                console.log("getch error")
                return{
                    status: 409,
                    body:{message:'error'},
              }
                //err
        }
        
      
    } else {
      console.log(plan);
      console.log("something went wrong");
    }
}