export default function(error , res){
    res.statusCode = 500;
    res.end(`${error}`);
    return;
}
