const { validationResult} = require("express-validator");
const { Err } = require("../utils/err");

const ValidateResult =  (req, res, next)=>{
 try{
    validationResult(req).throw() ;
    return next(); // si no hay errores
   
    }catch(err){
    let error = err.array();
     next(Err(error[0].msg, 400));
    }
   

}
module.exports = {ValidateResult}
