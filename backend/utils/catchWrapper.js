import errorHandler from './errorHandler.js';

export default (fn) => {
    return (req , res) => {
        fn(req , res).catch(error => errorHandler(error , res));
    }
}
