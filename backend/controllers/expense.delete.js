import wrapper from "../utils/catchWrapper.js";
import parseBody from "../utils/parseBody.js";
import { deleteExpense } from "../services/expenseOperations.service.js";

export default wrapper(async (req, res) => {
  const data = await parseBody(req);

  await deleteExpense(data);

  res.statusCode = 200;
  res.end();
});
