export default function (error, res) {
  const errors = {
    Missing_Required_Fields: {
      message: "information is not correct or not given",
      statusCode: 400,
    },
    Unauthorized: {
      message: "user have to log in first",
      statusCode: 401,
    },
    No_Resource_Found: {
      message: "the resource is not available or mistyped",
      statusCode: 404,
    },
    No_User_Found: {
      message: "user not found in the database",
      statusCode: 404,
    },
    No_Expense_Found: {
      message: "expense not found that you are looking for",
      statusCode: 404,
    },
    User_Already_Exists: {
      message: "user already available for this email",
      statusCode: 409,
    },
    Too_Many_Requests: {
      message: "got too many request",
      statusCode: 429,
    },
    Database_Error: {
      message: "database got an error",
      statusCode: 500,
    },
    Internal_Server_Error: {
      message: "server got an error",
      statusCode: 500,
    },
    No_Session_Id_Found: {
      message: "no session id found have to login first",
      statusCode: 401,
    },
  };

  if (errors?.[error.code]) {
    res.statusCode = errors[error.code].statusCode;
    res.end(errors[error.code].message);
    return;
  } else {
    res.statusCode = 500;
    res.end(`${error}`);
  }
}
