const {check} = require('express-validator');
const {user} = require("../models/index");
const { ValidateResult } = require('../helpers/ValidatorHelper');
const ValidatoRegister =  [
    check('email').exists().not().isEmpty().isEmail()
    .custom(async (value, {req})=>{
    let isregistered = await user.findOne({where: {email: value}});
    if(isregistered !== null){
       throw new Error ('la cuenta de email ya está registrada');
    }else{
        return true
    }
    }),
    check('password').exists().not().isEmpty().isLength({min:7}),
    check('name').exists().notEmpty().withMessage(' name is required').isLength({min:4}).withMessage('name is too short'),
    (req, res, next)=>{
        ValidateResult(req, res, next);
    }
]
module.exports = {ValidatoRegister}; 