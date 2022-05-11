import {db} from "$lib/database/dbFunctions.js";

export async function get({params}){
    const name = await params.name;
    console.log(name);
    try{
        const plans = await db.selectProgramFromName(name);
        const parsed_data = JSON.parse(JSON.stringify(plans))[0];
        console.log(parsed_data);
        if (plans) {
            return {
                body: {parsed_data}
            };
        } else {
            return {
                status : 404
            };
        }
    }catch(e){
        console.log(e);
    }
}