import db from "./database.connect.js";

const init = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS User (
        userId INT AUTO_INCREMENT PRIMARY KEY,
        userName VARCHAR(50) NOT NULL,
        userEmail VARCHAR(255) UNIQUE NOT NULL,
        userPassword VARCHAR(255) NOT NULL
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS userProfile (
        userId INT PRIMARY KEY,
        salary INT NOT NULL CHECK (salary > 0),
        minimum_expense INT NOT NULL CHECK (minimum_expense > 0),
        expense_goal INT CHECK (expense_goal > 0),
        FOREIGN KEY (userId)
          REFERENCES User(userId)
          ON DELETE CASCADE
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS Category (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS Token (
        token VARCHAR(255) PRIMARY KEY,
        userId INT NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId)
          REFERENCES User(userId)
          ON DELETE CASCADE
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS Expenses (
        expense_id INT AUTO_INCREMENT PRIMARY KEY,
        category_id INT NOT NULL,
        userId INT NOT NULL,
        amount INT NOT NULL CHECK (amount > 0),
        description VARCHAR(200),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (userId)
          REFERENCES User(userId)
          ON DELETE CASCADE,

        FOREIGN KEY (category_id)
          REFERENCES Category(id),

        INDEX idx_expense_user_created (userId, created_at),
        INDEX idx_expense_category (category_id)
      );
    `);

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Unable to initialize database:", error);
    throw error;
  }
};

export default init;
