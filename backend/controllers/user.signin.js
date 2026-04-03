import wrapper from "../utils/catchWrapper.js";
import parseBody from "../utils/parseBody.js";
import { userSignIn } from "../services/userOperations.service.js";

export default wrapper(async (req, res) => {
  const data = await parseBody(req);
  await userSignIn(data);

  res.statusCode = 200;
  res.end();
});
