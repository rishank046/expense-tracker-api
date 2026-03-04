export default (req) => {
    return new Promise((resolve , reject) => {
        let body = '';

        req.on('data' , (packet) => {
            body += packet;
        })
        req.on('end' , () => {
            if(!body){
                resolve({})
            }
            try{
                resolve(JSON.parse(body));
            }
            catch (error){
                reject(error);
            }
        })
    })
}
