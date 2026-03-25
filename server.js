import http from 'node:http';
import initDB from './db/database.createtables.js';
import 'dotenv/config';
import route from './routes/routes.js';

const server = http.createServer(async function(req , res){
    const pathname = req.url.slice(1);
    const method = req.method;
    route(pathname , method , req , res);

})

initDB().then(() => {
    server.listen(process.env.PORT,'::', function(){
        console.log("Server is working and running")
    })
});
