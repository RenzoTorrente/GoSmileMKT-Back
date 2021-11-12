exports.Err = (message , code)=>{
let e = new Error(message);
if(code){
    e.statusCode = code;
}
throw e;
}