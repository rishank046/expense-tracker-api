import db from './database.js';
import 'dotenv/config';

// dscr is description about the expense
// amnt is amount that is spend by the user

const init = async () => {
    const makeUserTable = `
        CREATE TABLE IF NOT EXISTS ${process.env.USER_TABLE_NAME} (
            usr_id INT AUTO_INCREMENT PRIMARY KEY,
            usr_nm VARCHAR(50) NOT NULL,
            usr_email VARCHAR(50) UNIQUE NOT NULL,
            usr_pswd VARCHAR(20) NOT NULL
        )`

    const makeExpenseTable = `
        CREATE TABLE IF NOT EXISTS ${process.env.EXPENSE_TABLE_NAME} (
            exp_id INT AUTO_INCREMENT PRIMARY KEY,
            amnt INT NOT NULL,
            dscr VARCHAR(200),
            usr_id INT NOT NULL,
            FOREIGN KEY (usr_id) REFERENCES user_data(usr_id) ON DELETE CASCADE
        )`
    const makeTokenTable = `
        CREATE TABLE IF NOT EXISTS ${process.env.TOKEN_TABLE_NAME} (
            token VARCHAR(100),
            usr_id INT NOT NULL
        ) `

    try{
        await db.query(makeUserTable);
        await db.query(makeExpenseTable);
        await db.query(makeTokenTable);
        console.log('Made user table');
    }
    catch (error){
        console.log(`cannot able to connect to db ${error}`)
    }
}

export default init;
