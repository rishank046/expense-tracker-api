import http from 'node:http';
import getExpense from './controllers/getExpense.js';

const server = http.createServer(function(req , res){
    res.setHeader('Access-Control-Allow-Origin' , 'http://localhost:3000');

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
    else if(req.method === 'POST'){
        res.statusCode = 201;
        res.setHeader('Content-Type' , 'text')
        res.end('New user is created');
        return;
    }
    else if(req.method === 'GET'){
        res.end();
        return;
    }
    else if(req.method === 'DELETE'){
        res.end();
        return;
    }
    else if(req.method === 'PUT'){
        res.end();
        return;
    }}
    catch(err){
        res.statusCode = 500;
        res.end()
        return;
    }
})

server.listen(3000 , function(){
    console.log("Server is working and running")
});
