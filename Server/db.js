import mysql from 'mysql2'

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "252525",
    database: "dbproduto"
})

db.connect((err) => {
    if(err) {
        console.log(err.message)
    }
    console.log("Connect")
})

export default db