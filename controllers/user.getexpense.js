import wrapper from '../utils/catchWrapper.js';
import getExpService from '../services/getExpense.service.js';
import idByToken from '../controllers/user.idbytoken.js';

export default wrapper(async (req , res) => {
    // need the token to access website functionality
    const userId = await idByToken(req.headers.cookie);

    if(!userId){ 
        throw new Error('user not logged in');
    }

    let expString = await getExpService(userId); 

    if(!expString || expString.length == 0){
        res.statusCode = 404;
        res.end('expense not found');
        return;
    }

    res.statusCode = 200;
    res.end(JSON.stringify(expString));
})
