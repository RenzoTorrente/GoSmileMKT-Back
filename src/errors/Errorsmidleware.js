const { error } = require("../Responses/reponses");

exports.errors = function (err, req, res, next){
console.log(err);
const message = err.message || 'error interno';
const status = err.statusCode || 500 ;
 error(req, res, status, message);
}