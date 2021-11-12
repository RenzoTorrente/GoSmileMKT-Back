const {check} = require('express-validator');
const { ValidateResult } = require('../helpers/ValidatorHelper');
ValidatorLogin = [
check('email').notEmpty().withMessage('email is required').isEmail().withMessage('email must be adress email'),
check('password').notEmpty().withMessage('password is required').isLength({min:8}).withMessage('password must be of 7 characters'),
(req, res, next)=>{
ValidateResult(req,res,next);
}

]
module.exports ={ValidatorLogin};