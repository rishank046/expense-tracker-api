import wrapper from "../utils/catchWrapper.js";
import idByToken from "../controllers/user.idbytoken.js";
import parseBody from "../utils/parseBody.js";
import { getExpense } from "../services/expenseOperations.service.js";

export default wrapper(async (req, res) => {
  // need the token to access website functionality
  const data = await parseBody(req);
  const token = await idByToken(req.headers.cookie);
  data.token = token;

  let expenses = await getExpense(data);

  res.statusCode = 200;
  res.end(JSON.stringify(expenses));
});
