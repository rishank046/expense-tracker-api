import wrapper from "../utils/catchWrapper.js";
import idByToken from "../controllers/user.idbytoken.js";
import parseBody from "../utils/parseBody.js";
import { getExpense } from "../services/expenseOperations.service.js";

export default wrapper(async (req, res) => {
  // need the token to access website functionality
  const data = await parseBody(req);
  const userId = await idByToken(req.headers.cookie);
  data.userId = userId;

  let expenses = await getExpense(data);

  if (expenses) {
    res.statusCode = 200;
    res.end(JSON.stringify(expenses));
    return;
  } else {
    res.statusCode = 500;
    res.end();
    return;
  }
});
