import mysql from 'mysql2'

const db = mysql.createConnection({
    host: "82.180.153.154",
    user: "u597946082_root2",
    password: "Gu252525",
    database: "u597946082_db_spacebBlog"
})

db.connect((err) => {
    if(err) {
        console.log(err.message)
    }
    console.log("Connect")
})

export default db