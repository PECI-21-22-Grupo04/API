// Import utilities
import mysql from 'mysql';
import dot from 'dotenv';

const dotenv = dot.config();

export const db = {
    createInstructor,
    createClient,
    selectClient,
    deleteClient,
    addClientInfo,
    selectInstructor,
    selectClientInfo,
    selectAllClients,
    selectAllExercises,
    selectAllPrograms,
    selectInstructorExerciseFromID,
    createExercise,
    createProgram,
    selectInstructorProgramFromID,
    addExercisetoProgram,
    addProgramtoClient,
    selectPlanExercises,
    selectInstructorClientFromID,
    deleteExercise,
    deleteProgram,
    deleteExercisefromProgram,
    updateExercise,
    updateProgram,
    updateProgramExercise,
    addUserImage
}

// Connect to database (MUST USE LEGACY AUTHENTICATION METHOD (RETAIN MYSQL 5.X COMPATIBILITY))
const dbconnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});
dbconnection.connect((error) => {
    
    if (error) {
        console.log("ERROR: Problems connecting to database!");
    }
});
const dbKey = process.env.DB_ENCRYPTKEY;


/*
*******************************************
            STORED PROCEDURES               
*******************************************
*/
function createInstructor(mail,firebaseID, fName, lName, birth, sex, street,postcode,city,country,contact,paypalAcc) {
    const zero = 0;
    // console.log(mail + ' : ' +fName+' : ' +lName+ ' : ' +birth+ ' : ' +sex+ ' : ' +street + ' :'+postcode + ' :'+city + ' :'+country + ' :'+contact + ' :'+paypalAcc + ' :'+password );
    return new Promise((resolve) => {

       
        var sql = 'CALL spCreateInstructor(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        dbconnection.query(sql, [
            mail,
            firebaseID,
            fName, 
            lName, 
            birth, 
            sex, 
            street,
            postcode,
            city,
            country,
            contact,
            paypalAcc,
            zero,
            "about me",   // substituir por input
            dbKey], (err, data) => {
                console.log(data)
                if (err && err.errno==1062) {
                console.log(err);

                    
                    resolve(1);
                }
                else if (typeof data !== 'undefined') { 
                    resolve(0);
                }
                else {
                    resolve(2);
                console.log(err);

                }
        });
    });
}
function createClient(mail, fName, lName) {
    return new Promise((resolve) => {

        var sql = 'CALL spCreateClient(?,?,?,?)';

        dbconnection.query(sql, [mail, fName, lName, dbKey], (err, data) => {
            if (err && err.errno==1062) {
                resolve(1);
            }
            else if (typeof data !== 'undefined' && data["affectedRows"] == 1) { 
                resolve(0);
            }
            else {
                resolve(2);
            }
        });
    });
};

function createProgram(email, pname , pdescription, pathology,pthumbnailPath, pvideoPath, showcase) {
    return new Promise((resolve) => {

        var sql = 'CALL spcreateProgram(?,?,?,?,?,?,?,?)';

        dbconnection.query(sql, [email,pname, pdescription, pathology , pthumbnailPath, pvideoPath, showcase,dbKey], (err, data) => {
            console.log(data)
            if (err && err.errno==1062) {
                resolve(1);
            }
            else if (typeof data !== 'undefined') { 
                resolve(0);
            }
            else {
                resolve(2);
            }
        });
    });
};
function addExercisetoProgram(programID, exerciseID , nsets, nreps, duration) {
    return new Promise((resolve) => {

        var sql = 'CALL spAddExerciseToProgram(?,?,?,?,?)';

        dbconnection.query(sql, [programID, exerciseID , nsets, nreps, duration], (err, data) => {
            if (err && err.errno==1062) {
                resolve(1);
            }
            else if (typeof data !== 'undefined' && data["affectedRows"] == 1) { 
                resolve(0);
            }
            else {
                resolve(2);
            }
        });
    });
};

function addProgramtoClient(clientEmail,programID) {
    return new Promise((resolve) => {

        var sql = 'CALL spAssociateProgramToClient(?,?,?)';
        console.log(programID)
        dbconnection.query(sql, [clientEmail,programID,dbKey], (err, data) => {
            console.log(data)
            if (err && err.errno==1062) {
                resolve(1);
            }
            else if (typeof data !== 'undefined' && data["affectedRows"] == 1) { 
                resolve(0);
            }
            else {
                resolve(2);
            }
        });
    });
};

function createExercise(email, ename, difficulty, edescription, pathologies, targetMuscle ,thumbnailPath,videoPath) {
    return new Promise((resolve) => {

        var sql = 'CALL spCreateExercise(?,?,?,?,?,?,?,?,?)';
        
        dbconnection.query(sql, [email,ename, difficulty, edescription, pathologies,targetMuscle ,thumbnailPath,videoPath,dbKey], (err, data) => {
            console.log(data)
            if (err && err.errno==1062) {
                resolve(1);
            }
            else if (typeof data !== 'undefined') { 
                resolve(0);
            }
            else {
                resolve(2);
            }
        });
    });
};

function selectInstructor(mail) {
    return new Promise((resolve) => {
        

        var sql = 'CALL spSelectInstructor(?,?)';

        dbconnection.query(sql, [mail, dbKey], (err, data) => {
            console.log(data);
            if (err) {
                resolve(1);
            }
            else if (typeof data !== 'undefined' && data.length > 0 && data[0].length > 0) {
                resolve(data);
            }
            else {
                console.log('doesnt exist')
                resolve(2);
            }
        });
    });
};
function selectClient(mail) {
    return new Promise((resolve) => {
        

        var sql = 'CALL spSelectClient(?,?)';

        dbconnection.query(sql, [mail, dbKey], (err, data) => {
            if (err) {
                resolve(1);
            }
            else if (typeof data !== 'undefined' && data.length > 0 && data[0].length > 0) {
                resolve(data);
            }
            else {
                resolve(2);
            }
        });
    });
};


function selectAllClients( email) {
    return new Promise((resolve) => {
        

        var sql = 'CALL spSelectInstructorClients(?,?)';

        dbconnection.query(sql,  [email,dbKey], (err, data) => {
            console.log(data)
            if (err) {
                resolve(1);
            }
            else if (typeof data !== 'undefined' && data.length > 0) {
                resolve(data);
            }
            else {
                resolve(2);
            }
        });
    });
};


function selectAllExercises(email) {
    return new Promise((resolve) => {
        

        var sql = 'CALL spSelectInstructorExercises(?,?)';

        dbconnection.query(sql,[email,dbKey] ,(err, data) => {
            // console.log(data);
            if (err) {
                console.log(err)
                resolve("fetch error");
            }
            else if (typeof data !== 'undefined' && data.length > 0) {
                resolve(data);
            }
            else {
                resolve("data error");
            }
        });
    });
};
function selectPlanExercises(programID) {
    return new Promise((resolve) => {
        

        var sql = 'CALL spSelectProgramExercises(?)';

        dbconnection.query(sql,[programID] ,(err, data) => {
            // console.log(data);
            if (err) {
                console.log(err)
                resolve("fetch error");
            }
            else if (typeof data !== 'undefined' && data.length > 0) {
                resolve(data);
            }
            else {
                resolve("data error");
            }
        });
    });
};

function selectAllPrograms(email ) {
    return new Promise((resolve) => {
        

        var sql = 'CALL spSelectInstructorPrograms(?,?)';

        dbconnection.query(sql,[email,dbKey] , (err, data) => {
            if (err) {
                resolve("fetch error");
            }
            else if (typeof data !== 'undefined' && data.length > 0) {
                resolve(data);
            }
            else {
                resolve("data error");
            }
        });
    });
};

function selectInstructorExerciseFromID(email,eid) {
    return new Promise((resolve) => {
        

        var sql = 'CALL spSelectInstructorExerciseFromID(?,?,?)';

        dbconnection.query(sql, [email,eid,dbKey], (err, data) => {
            if (err) {
                resolve("fetch error");
            }
            else if (typeof data !== 'undefined' && data.length > 0 && data[0].length > 0) {
                resolve(data);
            }
            else {
                resolve("data error");
            }
        });
    });
};

function selectInstructorProgramFromID( email,pid) {
    return new Promise((resolve) => {
        

        var sql = 'CALL spSelectInstructorProgramFromID(?,?,?)';

        dbconnection.query(sql, [email,pid,dbKey], (err, data) => {
            if (err) {
                resolve("fetc error");
            }
            else if (typeof data !== 'undefined' && data.length > 0 && data[0].length > 0) {
                resolve(data);
            }
            else {
                resolve("data error");
            }
        });
    });
};

function deleteClient(mail) {
    return new Promise((resolve) => {

        var sql = 'CALL spDeleteClient(?,?)';

        dbconnection.query(sql, [mail, dbKey], (err, data) => {
            if (err) {
                resolve(1);
            }
            else if (typeof data !== 'undefined' && data["affectedRows"] == 1) {
                resolve(0);
            }
            else {
                resolve(2);
            }
        });
    });
};

function addClientInfo(mail, age, height, weight, fitness, pathologies) {
    return new Promise((resolve) => {

        var sql = 'CALL spAddClientInfo(?,?,?,?,?,?,?)';

        dbconnection.query(sql, [mail, age, height, weight, fitness, pathologies, dbKey], (err, data) => {
            if (err) {
                resolve(1);
            }
            else if (typeof data !== 'undefined' && data["affectedRows"] == 1) {
                resolve(0);
            }
            else {
                resolve(2);
            }
        });
    });
};

function selectClientInfo(mail) {
    return new Promise((resolve) => {

        var sql = 'CALL spSelectClientInfo(?,?)';

        dbconnection.query(sql, [mail, dbKey], (err, data) => {
            if (err) {
                resolve(1);
            }
            else if (typeof data !== 'undefined' && data.length > 0 && data[0].length > 0) {
                resolve(0);
            }
            else {
                resolve(2);
            }
        });
    });
};

function selectInstructorClientFromID(email,cid) {
    return new Promise((resolve) => {


        var sql = 'CALL spSelectInstructorClientsFromID(?,?,?)';

        dbconnection.query(sql, [email,cid,dbKey], (err, data) => {
            if (err) {
                resolve("fetc error");
            }
            else if (typeof data !== 'undefined' && data.length > 0 && data[0].length > 0) {
                resolve(data);
            }
            else {
                resolve("data error");
            }
        });
    });
};

function deleteExercise(exerID) {
    return new Promise((resolve) => {

        var sql = 'CALL spDeleteExercise(?,?)';
        
        dbconnection.query(sql, [exerID,dbKey], (err, data) => {
            console.log(data + "falhou")
            if (err && err.errno==1062) {
                resolve(1);
            }
            else if (typeof data !== 'undefined') { 
                resolve(0);
            }
            else {
                resolve(2);
            }
        });
    });
};
function deleteProgram(planID) {
    return new Promise((resolve) => {

        var sql = 'CALL spDeleteProgram(?,?)';
        
        dbconnection.query(sql, [planID,dbKey], (err, data) => {
            console.log(data)
            if (err && err.errno==1062) {
                resolve(1);
            }
            else if (typeof data !== 'undefined') { 
                resolve(0);
            }
            else {
                resolve(2);
            }
        });
    });
};
function deleteExercisefromProgram(planID,exerID) {
    return new Promise((resolve) => {

        var sql = 'CALL spRemoveExerciseFromPlan(?,?)';
        
        dbconnection.query(sql, [planID,exerID], (err, data) => {
            console.log(data)
            if (err && err.errno==1062) {
                resolve(1);
            }
            else if (typeof data !== 'undefined') { 
                resolve(0);
            }
            else {
                resolve(2);
            }
        });
    });
};

function updateExercise(exerID, ename, difficulty, edescription, pathologies, targetMuscle ,thumbnailPath,videoPath) {
    return new Promise((resolve) => {

        var sql = 'CALL spUpdateExercise(?,?,?,?,?,?,?,?,?)';
        
        dbconnection.query(sql, [exerID,ename, difficulty, edescription, pathologies,targetMuscle ,thumbnailPath,videoPath,dbKey], (err, data) => {
            console.log(data)
            if (err && err.errno==1062) {
                resolve(1);
            }
            else if (typeof data !== 'undefined') { 
                resolve(0);
            }
            else {
                resolve(2);
            }
        });
    });
};

function updateProgram(progID, pname , pdescription, pathology,pthumbnailPath, pvideoPath, showcase) {
    return new Promise((resolve) => {

        var sql = 'CALL spUpdateProgramData(?,?,?,?,?,?,?,?)';

        dbconnection.query(sql, [progID,pname, pdescription, pathology , pthumbnailPath, pvideoPath, showcase,dbKey], (err, data) => {
            console.log(data)
            if (err && err.errno==1062) {
                resolve(1);
            }
            else if (typeof data !== 'undefined') { 
                resolve(0);
            }
            else {
                resolve(2);
            }
        });
    });
};

function updateProgramExercise(programID, exerciseID , nsets, nreps, duration) {
    return new Promise((resolve) => {

        var sql = 'CALL spUpdateProgramExercise(?,?,?,?,?)';

        dbconnection.query(sql, [programID, exerciseID , nsets, nreps, duration], (err, data) => {
            if (err && err.errno==1062) {
                resolve(1);
            }
            else if (typeof data !== 'undefined' && data["affectedRows"] == 1) { 
                resolve(0);
            }
            else {
                resolve(2);
            }
        });
    });
};

function addUserImage(mail,image) {
    // console.log(mail + ' : ' +fName+' : ' +lName+ ' : ' +birth+ ' : ' +sex+ ' : ' +street + ' :'+postcode + ' :'+city + ' :'+country + ' :'+contact + ' :'+paypalAcc + ' :'+password );
    return new Promise((resolve) => {

       
        var sql = 'CALL spUserAddImage(?,?,?)';
        dbconnection.query(sql, [
            mail,
            image,
            dbKey], (err, data) => {
                console.log(data)
                if (err && err.errno==1062) {
                console.log(err);

                    
                    resolve(1);
                }
                else if (typeof data !== 'undefined') { 
                    resolve(0);
                }
                else {
                    resolve(2);
                console.log(err);

                }
        });
    });
}

/*
*******************************************
            USER DEFINED FUNCTIONS                
*******************************************
*/