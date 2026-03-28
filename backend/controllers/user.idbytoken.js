import "dotenv/config";

async function getUserIdByToken(realCookie) {
  if (!realCookie) {
    return null;
  }
  const token = realCookie
    .split("; ")
    .filter(function (element) {
      const arr = element.split("=");
      if (arr[0] === "token") {
        return true;
      } else return false;
    })[0]
    ?.split("=")[1];

  if (!token) {
    let error = new Error();
    error.code = "No_Session_Id_Found";
    throw error;
  }
  // find userId after verifying the token session_id
  return token;
}

export default getUserIdByToken;
