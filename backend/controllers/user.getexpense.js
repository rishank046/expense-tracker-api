import wrapper from '../utils/catchWrapper.js';
import getExpService from '../db/getExpense.service.js';
import parseBody from '../utils/parseBody.js';

export default wrapper(async (req , res) => {
    const body = await parseBody(req);
    
    if(!body || !body.userId){
        res.writeHead(404 , 'user not found');
        res.end();
        return;
    }

    let expString = await getExpService(body.userId); 

    if(!expString || expString.length == 0){
        res.statusCode = 404;
        res.end('expense not found');
        return;
    }

    res.statusCode = 200;
    res.end(JSON.stringify(expString));
})
