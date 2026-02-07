import http from 'node:http';
import { getExpense } from './controllers/getExpense.js';
import 

const server = http.createServer(function(req , res){
    res.setHeader('Access-Control-Allow-Origin' , '*');

    if(req.method === 'OPTIONS'){
        res.write('server is working fine options recieved');
        res.end();
        return;
    }
    else if(req.method === 'POST'){
        res.write('ok done');
        res.end();
        return;
    }
    else if(req.method === 'GET'){
        res.write('you got a chips packet');
        res.end();
        return;
    }
})

server.listen(3000 , function(){
    console.log("Server is working and running")
});
