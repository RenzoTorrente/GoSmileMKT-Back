const {IsAdmin} = require('../middlewares/auth');
exports.delete = async(req, res, next)=>{
    //SI EL USUARIO QUE ESTÁ INGRESANDO ES EL AUTOR DEL POST
    let admin = IsAdmin(req.user.roles);
    console.log(admin);
    if(req.user == req.post.userId || admin){
        console.log('id de user:' , req.user);
        console.log('id de autor del post:' , req.post.id);
     next()
    }
   else{
        res.status(401).json({Error:"user not authenticated to see post"})
    }

}
exports.update = async(req, res, next)=>{
    //SI EL USUARIO QUE ESTÁ INGRESANDO ES EL AUTOR DEL POST
    let admin = IsAdmin(req.user.roles);

    if(req.user == req.post.userId || admin){
        console.log('id de user:' , req.user);
        console.log('id de autor del post:' , req.post.id);
     next()
    }else{
        res.status(401).json({Error:"user not authenticated to see post"})
    }

}
