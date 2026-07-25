import initDB from "./db/database.createtables.js";
import "dotenv/config";
import userRouter from "./routes/user.routes.js";
import expenseRouter from "./routes/expense.routes.js";
import cookieParser from "cookie-parser";
import express from "express";

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/user", userRouter);
app.use("/expense", expenseRouter);

initDB().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
