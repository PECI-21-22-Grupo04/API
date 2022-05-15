import {db} from "$lib/database/dbFunctions.js";


export async function post({request}){
    const body = await request.json();
    let arr = []
    try{
        const exercises = await db.selectPlanExercises(body.programID);
        // console.log(exercises)
        let parsed_data = JSON.parse(JSON.stringify(exercises))[0];
        console.log(parsed_data);

        for(var i in parsed_data)
                {arr.push(parsed_data[i]);}

        if (exercises) {
            return {
                body: {arr}
            };
        } else {
            // @ts-ignore
            parsed_data = {e_name: 'NENHUM EXERCICIO'}
            return {
                status : {}
            };
        }
    }catch(e){
        console.log(e);
    }
}