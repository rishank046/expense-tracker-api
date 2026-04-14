import wrapper from "../utils/catchWrapper.js";
import parseBody from "../utils/parseBody.js";
import { updateExpense } from "../services/expenseOperations.service.js";

export default wrapper(async function (req, res) {
  const data = await parseBody(req);

  await updateExpense(data);

  res.statusCode = 200;
  res.end();
  return;
});
