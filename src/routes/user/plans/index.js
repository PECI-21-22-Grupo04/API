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
