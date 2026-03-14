export default function(error , res){
    res.statusCode = 500;
    const errorMessage = `${error.message}`;
    res.end(errorMessage);
    return;
}
