import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const db = mysql.createConnection("mysql://root:3ipQoc3DcX4KIEtpT195@containers-us-west-116.railway.app:5618/railway")

db.connect((err) => {
    if(err) {
        console.log(err.message)
    }else {
        console.log("Connect")
    }
})

export default db