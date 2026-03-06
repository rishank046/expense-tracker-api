import handle from './routes.table.js';
import wrapper from '../utils/catchWrapper.js';

export default async (pathname , method , req , res) => {
    if(method === 'OPTIONS'){
        const controller = Object.values(handle).some(m => m[pathname]);
        if(!controller){
            res.statusCode = 404;
            res.end();
            return;
        } 

        // if the controller is found in the object then return CORS

        res.writeHead(204,{
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        })
        return;
    }
    if(typeof handle?.[method]?.[pathname] === 'function'){
        handle[method][pathname](req , res);
    }
    else{
        res.statusCode = 404;
        res.end();
        return;
    }
}
