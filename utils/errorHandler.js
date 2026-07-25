export default function (error, res) {
  const errors = {
    Missing_Required_Fields: {
      message: "Information is not correct or missing",
      statusCode: 400,
    },
    Unauthorized: {
      message: "User must log in first",
      statusCode: 401,
    },
    No_Resource_Found: {
      message: "The resource is not available",
      statusCode: 404,
    },
    No_User_Found: {
      message: "User not found",
      statusCode: 404,
    },
    No_Expense_Found: {
      message: "Expense not found",
      statusCode: 404,
    },
    User_Already_Exists: {
      message: "An account with this email already exists",
      statusCode: 409,
    },
    Too_Many_Requests: {
      message: "Too many requests",
      statusCode: 429,
    },
    Database_Error: {
      message: "Database error occurred",
      statusCode: 500,
    },
    Internal_Server_Error: {
      message: "Internal server error",
      statusCode: 500,
    },
    No_Session_Id_Found: {
      message: "No session found, please log in",
      statusCode: 401,
    },
    ECONNREFUSED: {
      message: "Unable to connect to the database",
      statusCode: 503,
    },
    57014: { message: "Database query timed out", statusCode: 504 },
    23505: {
      message: "Record already exists",
      statusCode: 409,
    },
    ER_DUP_ENTRY: {
      message: "Record already exists",
      statusCode: 409,
    },
    1062: {
      message: "Record already exists",
      statusCode: 409,
    },
    23503: { message: "Referenced record does not exist", statusCode: 400 },
    23502: {
      message: "Required field is missing",
      statusCode: 400,
    },
  };

  res.setHeader("Content-Type", "application/json");

  const errorKey = error?.code || error?.errno;
  if (errors[errorKey]) {
    const errObj = errors[errorKey];
    res.statusCode = errObj.statusCode;
    res.end(JSON.stringify({ error: errObj.message }));
  } else {
    console.error("Unhandled Error:", error);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
}
