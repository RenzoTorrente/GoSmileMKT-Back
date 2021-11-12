const jwt = require("jsonwebtoken");
const authconfig = require("../../config/config");
const {user} = require('../models/index');

exports.auth = (req, res, next) => {
  //comprobamos si el tokken existe
  if (!req.headers.authorization) {
    res.status(401).json([(Error = { msg: "usuario no autorizado" })]);
  } else {
    let token = req.headers.authorization.split(" ")[1];
    //verificamos si el toquen es valido
    jwt.verify(token, authconfig.secret, (err, decoded) => {
      if (err) {
        res.status(401).json({message:'token no valido'})
      } else{
        user.findByPk(decoded.user, {include:"roles"}).then((user)=>{ //buscamos por id y de acuerdo y joinamos =>
        req.user = user;
        next()
         
        })
      
      }
    });
  }
};
 //Comprueba que el user sea admin:
exports.IsAdmin = (roles)=>{
  let haveadmin = '';
  roles.forEach(role => { // recorremos la tabla roles y la propiedad role la usamos para saber el role (admin/user)
    haveadmin = role.role
  });

  if(haveadmin  === 'admin'){
   return true;
  }else{
    return false;
  }
}