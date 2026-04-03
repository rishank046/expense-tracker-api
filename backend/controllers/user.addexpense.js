import catchWrapper from "../utils/catchWrapper.js";
import parseBody from "../utils/parseBody.js";
import { createExpense } from "../services/expenseOperations.service.js";
import getUserIdByToken from "./user.idbytoken.js";

export default catchWrapper(async (req, res) => {
  const data = await parseBody(req);
  const userId = await getUserIdByToken(req.headers.cookie);
  data.userId = userId;

  await createExpense(data);

  res.statusCode = 200;
  res.end();
});
