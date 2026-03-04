import http from 'node:http';
import initDB from './db/initDB.js';
import 'dotenv/config';
import route from './routes/routes.js';

const server = http.createServer(async function(req , res){
    const pathname = req.url.slice(1);
    const method = req.method;
    route(pathname , method , req , res);

})

initDB().then(() => {
    server.listen(3000 , async function(){
        console.log("Server is working and running")
    })
});
