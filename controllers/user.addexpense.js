import createExpense from '../services/addexpense.service.js';
import catchWrapper from '../utils/catchWrapper.js';
import parseBody from '../utils/parseBody.js';
import getIdByToken from '../controllers/user.idbytoken.js';

export default catchWrapper(async (req , res) => {
    const data = await parseBody(req);
    
    if(!data.amount && !data.description){
        res.statusCode = 400;
        res.end(JSON.stringify({error : 'missing required field'}));
        return;
    }

    // get user id from the token as a cookie
    const userId = await getIdByToken(req.cookie);
    if(!userId){
        throw new Error('no user found');
    }

    // add expense to the database
    await createExpense(data.amount , data.description , userId);

    res.statusCode = 200;
    res.end('added expense');
    return;
});
