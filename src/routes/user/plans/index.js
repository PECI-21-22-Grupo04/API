import { db } from "$lib/database/dbFunctions.js";
import fs from "fs";
export async function post({ request }) {
  const body = await request.json();
  const email = body.email;

  try {
    const plans = await db.selectAllPrograms(email);
    if (plans !== "data error") {
      if (plans !== "fetch error") {
        const parsed_data = JSON.parse(JSON.stringify(plans))[0];
        return {
          status: 200,
          body: { parsed_data },
        };
      } else {
        console.log("fetch error");
        return {
          status: 409,
          body: {
            message: "An error occured during query",
          },
        };
      }
    } else {
      //err
      console.log("data error");
      return {
        status: 409,
        body: {
          message: "An error occured during fetch",
        },
      };

      // console.log(parsed_data);
    }
  } catch (e) {
    console.log(e);
  }
}


export async function del({request}){
  const body = await request.json();
  try{
      const deleted_program = await db.deleteProgram(body.programID);


      if(deleted_program!==1)
      {   
          if(deleted_program!==2)
          {
              return{
                  headers:{location:'/user/plans'},
                  status: 302
              }
          }
          else
          {
              console.log("Data error")
              return{
                  status: 409,
                  message:"Error occured"
              }
          }

      }
      else
      {
          console.log("Connection error")
          return{
              status: 409,
              message:"Error occured"
          }
      }


  }catch(e)
  {
      console.log(e);
      console.log("Error in the query")
  }



}