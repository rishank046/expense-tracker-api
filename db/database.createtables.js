import db from "./database.connect.js";
import "dotenv/config";

const init = async () => {
  try {
    const userTable = process.env.USER_TABLE_NAME || "User";
    const userProfileTable = process.env.USER_PROFILE_TABLE_NAME || "userProfile";
    const categoryTable = process.env.CATEGORY_TABLE_NAME || "Category";
    const expenseTable = process.env.EXPENSE_TABLE_NAME || "Expenses";
    const tokenTable = process.env.TOKEN_TABLE_NAME || "Token";

    await db.query(`
        CREATE TABLE IF NOT EXISTS ${userTable} (
            userId INT AUTO_INCREMENT PRIMARY KEY,
            userName VARCHAR(50) NOT NULL,
            userEmail VARCHAR(50) UNIQUE NOT NULL,
            userPassword VARCHAR(255) NOT NULL 
        );
    `);

    await Promise.all([
      db.query(`
        CREATE TABLE IF NOT EXISTS ${userProfileTable} (
            userId INT PRIMARY KEY,
            salary INT CHECK(salary > 0) NOT NULL,
            minimum_expense INT CHECK(minimum_expense > 0) NOT NULL,
            expense_goal INT CHECK(expense_goal > 0),
            FOREIGN KEY (userId) REFERENCES ${userTable}(userId)
        );
      `),
      db.query(`
        CREATE TABLE IF NOT EXISTS ${categoryTable} (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL UNIQUE
        );
      `),
      db.query(`
        CREATE TABLE IF NOT EXISTS ${tokenTable} (
            token VARCHAR(255) PRIMARY KEY, 
            userId INT NOT NULL UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES ${userTable}(userId) ON DELETE CASCADE
        );
      `)
    ]);

    await db.query(`
      CREATE TABLE IF NOT EXISTS ${expenseTable} (
          expense_id INT AUTO_INCREMENT PRIMARY KEY, 
          category_id INT NOT NULL,
          userId INT NOT NULL,
          amount INT CHECK(amount > 0) NOT NULL, 
          description VARCHAR(200),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES ${userTable}(userId) ON DELETE CASCADE,
          FOREIGN KEY (category_id) REFERENCES ${categoryTable}(id),
          INDEX idx_expense_user_created (userId, created_at),
          INDEX idx_expense_category (category_id)
      );
    `);

    console.log("Database initialized successfully");
  } catch (error) {
    console.error(`Unable to connect or initialize DB: ${error}`);
  }
};

export default init;
