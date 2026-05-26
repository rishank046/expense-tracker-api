import initDB from "./db/database.createtables.js";
import "dotenv/config";
import userRouter from './routes/user.routes.js';
import expenseRouter from './routes/expense.routes.js';

import express from 'express';
const app = express();

//parse data 
app.use(express.json());

app.use('/user' , userRouter);
app.use('/expense' , expenseRouter);

initDB().then(() => {
  app.listen(process.env.PORT , () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  })
})
// const server = http.createServer(async function (req, res) {
//   const pathname = req.url;
//   const method = req.method;
//   await route(pathname, method, req, res);
// });

// initDB().then(() => {
//   server.listen(process.env.PORT, function () {
//     console.log("Server is working and running");
//   });
// });
