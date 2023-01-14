import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const db = mysql.createConnection(process.env.DATABASE);

db.connect((err) => {
    if(err) {
        console.log(err.message);
    }else {
        console.log("Connect");
    }
})

export default db;