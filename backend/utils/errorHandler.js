export default function(error , res){
    res.statusCode = error.code;
    const errorMessage = `${error.message}`;
    res.end(errorMessage);
    return;
}
