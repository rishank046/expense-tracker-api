import http from 'node:http';
import initDB from './db/initDB.js';
import getExpense from './controllers/getExpense.js';
import database from './db/database.js';
import 'dotenv/config';
import url from 'node:url';
import createUser from './controllers/createUser.js';
import { create } from 'node:domain';
import addExpense from './controllers/addExpense.js';
import logInUser from './controllers/logInUser.js';
import getUserIdByToken from './controllers/getIdByToken.js';


const server = http.createServer(async function(req , res){
    res.setHeader('Access-Control-Allow-Origin' , 'http://localhost:3000');
    const reqUrl = new URL(req.url , `http://${req.headers.host}`);
    
    try{
        if(req.method === 'OPTIONS'){
            res.writeHead(200 , {
                'Content-Type' : 'text/plain',
                'Timeout' : '10',
                'cache-control' : 'no-cache'
            })
            res.end('This data is not for user')
            return;
        }

        else if(req.method === 'POST' && reqUrl.pathname === '/signIn'){
            const token= await logInUser(reqUrl.searchParams.get('email') , reqUrl.searchParams.get('password'));
            if(token === null){
                res.statusCode = 404;
                res.end('user not found');
                return;
            }
            res.setHeader('Set-Cookie' , `session_id=${token}; Path=/; httpOnly`)
            res.end();
            return;
        }

        else if(req.method === 'POST' && reqUrl.pathname === '/register'){
            res.statusCode = 201;
            try{
                await createUser(reqUrl.searchParams.get('username') , reqUrl.searchParams.get('email') , reqUrl.searchParams.get('password'))
                res.end('User Created');
                return;
            } catch(error){
                res.end('Cannot able to create user');
                return;
            }
        }

        else if(req.method === 'POST' && reqUrl.pathname === '/addExpense'){
            const userId= await getUserIdByToken(req.headers.cookie);
            if(userId === undefined){
                res.statusCode = 404;
                res.end('user have to login first');
                return;
            }
           const result = await addExpense(userId , reqUrl.searchParams.get('amnt') , reqUrl.searchParams.get('dscr'));
            if(result !== null){
                res.end('Added expense');
                return;
            }
            else{
                res.end('Failed to add expense');
                return;
            }
        }
    
        else if(req.method === 'GET' && reqUrl.pathname === '/getExpense'){
            let userId = await getUserIdByToken(req.headers.cookie);
            console.log(userId)
            const result = await getExpense(userId);
            if(!result){
                res.end('cannot fetch data');
                return;
            }
            else{
                res.end(result.toString());
                return;
            }
        }

        else if(req.method === 'GET' && reqUrl.pathname === '/filterExpense'){
            let userId = await getUserIdByToken(req.headers.cookie);
            const expenses = await filterExpenseByAmount(userId , reqUrl.searchParams.get('amount'));

            if(!expenses){
                res.end(expenses);
                return;
            }
        }

        else{
            res.end('invalid request');
            return;
        }

    }
    catch(err){
        res.statusCode = 500;
        res.end(JSON.stringify(err));
        console.log(err)
        return;
    }
})

initDB().then(() => {
    server.listen(3000 , async function(){
        console.log("Server is working and running")
    })
});
