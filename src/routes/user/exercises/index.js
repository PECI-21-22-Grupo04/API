
import {db} from "$lib/database/dbFunctions.js";

export async function get(){
    try{
        const exercises = await db.selectAllExercises();
        let parsed_data = JSON.parse(JSON.stringify(exercises))[0];
        console.log(parsed_data);
        if (exercises) {
            return {
                body: {parsed_data}
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