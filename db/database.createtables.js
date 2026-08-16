import db from "./database.connect.js";

const init = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS "User" (
        userId INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        userName VARCHAR(50) NOT NULL,
        userEmail VARCHAR(255) UNIQUE NOT NULL,
        userPassword VARCHAR(255) NOT NULL
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS userProfile (
        userId INTEGER PRIMARY KEY,
        salary INTEGER NOT NULL CHECK (salary > 0),
        minimum_expense INTEGER NOT NULL CHECK (minimum_expense > 0),
        expense_goal INTEGER CHECK (expense_goal > 0),
        FOREIGN KEY (userId)
          REFERENCES "User"(userId)
          ON DELETE CASCADE
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS Category (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE
      );
    `);

    await db.query(`
      INSERT INTO Category (name)
      VALUES ('Food'), ('Transport'), ('Utilities'), ('Entertainment'), ('Health'), ('Shopping'), ('General')
      ON CONFLICT (name) DO NOTHING;
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS Token (
        token VARCHAR(255) PRIMARY KEY,
        userId INTEGER NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId)
          REFERENCES "User"(userId)
          ON DELETE CASCADE
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS Expenses (
        expense_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        category_id INTEGER NOT NULL,
        userId INTEGER NOT NULL,
        amount INTEGER NOT NULL CHECK (amount > 0),
        description VARCHAR(200),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (userId)
          REFERENCES "User"(userId)
          ON DELETE CASCADE,

        FOREIGN KEY (category_id)
          REFERENCES Category(id)
      );
    `);

    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_expense_user_created
      ON Expenses(userId, created_at);
    `);

    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_expense_category
      ON Expenses(category_id);
    `);

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Unable to initialize database:", error);
    throw error;
  }
};

export default init;
