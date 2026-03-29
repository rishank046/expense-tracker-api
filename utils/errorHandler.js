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
    ECONNREFUSED: {
      message: "unable to connect to the database",
      statusCode: 503,
    },
    57014: { message: "database query timed out", statusCode: 504 },
    23505: {
      message: "record already exists (duplicate entry)",
      statusCode: 409,
    },
    23503: { message: "referenced record does not exist", statusCode: 400 },
    23502: {
      message: "required field is missing (null violation)",
      statusCode: 400,
    },
    "22P02": { message: "invalid data type provided", statusCode: 400 },
    23514: { message: "value violates a check constraint", statusCode: 400 },
    42703: { message: "column does not exist in the table", statusCode: 400 },
    "42P01": {
      message: "table does not exist in the database",
      statusCode: 400,
    },
    42601: { message: "sql syntax error in the query", statusCode: 500 },
    53300: { message: "too many database connections", statusCode: 503 },
    53200: { message: "database ran out of memory", statusCode: 503 },
    "40P01": {
      message: "deadlock detected between transactions",
      statusCode: 500,
    },
    40001: {
      message: "transaction conflict, serialization failed",
      statusCode: 500,
    },
    "08006": { message: "database connection was lost", statusCode: 503 },
    "08001": { message: "database connection was rejected", statusCode: 503 },
    "28P01": { message: "invalid database credentials", statusCode: 401 },
    "3D000": { message: "database does not exist", statusCode: 500 },
  };

  if (errors?.[error.code]) {
    res.statusCode = errors[error.code].statusCode;
    res.end(errors[error.code].message);
    return;
  }
}
