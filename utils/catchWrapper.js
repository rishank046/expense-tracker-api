import errorHandler from "./errorHandler.js";

export default (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => errorHandler(error, res));
  };
};
