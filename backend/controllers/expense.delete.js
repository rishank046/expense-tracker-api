import wrapper from '../utils/catchWrapper.js';
import parseBody from '../utils/parseBody.js';
import db from '../db/database.connect.js';

export default wrapper(async (req , res) => {
    const data = await parseBody(req);

    const deleteExpense = `DELETE FROM ${process.env.EXPENSE_TABLE_NAME} WHERE expense_id = ?`;

    db.query(deleteExpense , [data.expense_id]);
    res.statusCode = 200;
    res.end();
})
