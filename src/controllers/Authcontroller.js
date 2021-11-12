const { user, roles, roleusers } = require("../models/index"); //Los modelos se importan desde el index no desde el modelo en si
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../../config/config");
exports.signIn = async (req, res) => {
  let { email, password } = req.body;
  try {
    let account = await user.findOne({ where: { email } });
    if (!account) {
      res
        .status(401)
        .json([
          (error = {
            message: "el email no coincide con el de una cuenta valida",
          }),
        ]);
    }
    if (!bcrypt.compareSync(password, account.password)) {
      res.status(401).json([(error = { message: "password incorrecto" })]);
    } else {
      var token = jwt.sign({ user: account.id }, auth.secret);
    }
    res.status(200).json({
      user: account,
      token,
    });
  } catch (err) {
    res.status(500).json(err.errors);
  }
};
//registro
exports.signUp = async (req, res) => {
  //encriptamos el password
  let password = bcrypt.hashSync(
    req.body.password,
    Number.parseInt(auth.rounds)
  );
  //creamos el usuario
  try {
    let resp = await user.create({
      name: req.body.name,
      password: password,
      email: req.body.email,
    });
    let rol = await roles.create({
      role: "admin",
    });
     await roleusers.create({user_id: resp.id , role_id : rol.id}); 

    var token = jwt.sign({ user: resp.id, rol: rol.role }, auth.secret, {
      expiresIn: process.env.AUTH_Expires,
    });
    res.json({
      token,
    });
  } catch (err) {
    res.status(500).json(err.errors);
  }
};














