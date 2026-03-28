import parseBody from "../utils/parseBody.js";
import wrapper from "../utils/catchWrapper.js";
import { userLogIn } from "../services/userOperations.service.js";

export default wrapper(async (req, res) => {
  const data = await parseBody(req);

  const token = await userLogIn(data);

  if (token) {
    res.writeHead(200, {
      "Set-Cookie": `token=${token}; Max-Age=43200; Path=/; HttpOnly; Secure;`,
      "Access-Controll-Origin-Credentials": "true",
      "Access-Controll-Allow-Origin": "http://www.expensetracker.com",
    });
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});
