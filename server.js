import http from "node:http";
import initDB from "./db/database.createtables.js";
import "dotenv/config";
import route from "./routes/routes.js";

const server = http.createServer(async function (req, res) {
  const pathname = req.url;
  const method = req.method;
  await route(pathname, method, req, res);
});

initDB().then(() => {
  server.listen(process.env.PORT, "0.0.0.0", function () {
    console.log("Server is working and running");
  });
});
