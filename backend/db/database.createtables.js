import db from "./database.connect.js";
import "dotenv/config";

// dscr is description about the expense
// amnt is amount that is spend by the user

const init = async () => {
  try {
    await db.query(`
        CREATE TABLE IF NOT EXISTS ${process.env.USER_TABLE_NAME} (
            usr_id INT AUTO_INCREMENT PRIMARY KEY,
            usr_nm VARCHAR(50) NOT NULL,
            usr_email VARCHAR(50) UNIQUE NOT NULL,
            usr_pswd VARCHAR(255) NOT NULL 
        );
        `);
    await db.query(`
        CREATE TABLE IF NOT EXISTS ${process.env.USER_PROFILE_TABLE_NAME} (
            usr_id INT PRIMARY KEY,
            salary INT CHECK(salary > 0) NOT NULL,
            minimum_expense INT CHECK(minimum_expense > 0) NOT NULL,
            expense_goal INT CHECK(expense_goal > 0),
            FOREIGN KEY (usr_id) REFERENCES ${process.env.USER_TABLE_NAME}(usr_id)
        )
       `);
    await db.query(`
    CREATE TABLE IF NOT EXISTS ${process.env.CATEGORY_TABLE_NAME} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE
    );
            `);
    await db.query(`
    CREATE TABLE IF NOT EXISTS ${process.env.EXPENSE_TABLE_NAME} (
        expense_id INT AUTO_INCREMENT PRIMARY KEY, 
        category_id INT,
        userId INT,
        amount INT CHECK(amount > 0) NOT NULL, 
        description VARCHAR(200),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES ${process.env.USER_TABLE_NAME}(usr_id) ON DELETE CASCADE,
        FOREIGN KEY (category_id) REFERENCES ${process.env.CATEGORY_TABLE_NAME}(id)
    );
            `);
    await db.query(`
    CREATE TABLE IF NOT EXISTS ${process.env.TOKEN_TABLE_NAME} (
        token VARCHAR(255) PRIMARY KEY, 
        userId INT NOT NULL UNIQUE,
        FOREIGN KEY (userId) REFERENCES ${process.env.USER_TABLE_NAME}(userId) ON DELETE CASCADE
    );
            `);
    console.log("Made user table");
  } catch (error) {
    console.log(`cannot able to connect to db ${error}`);
  }
};

export default init;
