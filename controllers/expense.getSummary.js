import wrapper from "../utils/catchWrapper.js";
import parseBody from "../utils/parseBody.js";
import { getSummary } from "../services/expenseOperations.service.js";

export default wrapper(async (req, res) => {
  const data = await parseBody(req);

  const summary = await getSummary(data);

  res.writeHead(200, { data: `${JSON.stringify(summary)}` });
  res.end();
  return;
});
