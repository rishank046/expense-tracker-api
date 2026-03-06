import mysql from 'mysql2'
import 'dotenv/config';

    const databaseServer = mysql.createPool({
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME,
        
        waitForConnections : true,
        connectionLimit : 10,
        queueLimit : 0
    })

export default databaseServer.promise()
