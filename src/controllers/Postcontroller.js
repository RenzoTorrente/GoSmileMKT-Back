const {posts} = require('../models/index');
const path = require('path');
const fs = require('fs');
const { imageS3 } = require('../middlewares/S3image');
exports.postcontroller = async (req, res)=>{
    let limit = 10;   // number of records per page    
    let offset = 0;
    let page = req.params.page;
    posts.findAndCountAll().then(async (data)=>{
    //SACO EL NUMERO DE PAGINAS:
    let countofregisters = data.count//DATA.COUNT CONTIENE EL TOTAL DE REGISTROS
    let pages = Math.ceil(countofregisters / limit); //Sacamos el total de paginas que tendremos.
    offset = limit * (page - 1);  //DESDE QUE REGISTRO ARRANCA
    try{
    let Poststoreturn = await posts.findAll({ limit: limit, offset: offset, $sort: { id: 1 }}) 
    res.status(200).json({posts:Poststoreturn, count:countofregisters, pages: pages});
    }catch(err){
    next(err);
    }
    
    })
    
}

exports.findpost = async(req, res, next)=>{
    let post = await posts.findByPk(req.params.id);

    if(!post) {
        res.status(404).json({ msg: "El post no se ha encontrado" });
    } else {
        req.post = post;
        
        next();
    }
}
exports.showpost =  async (req, res) => {
  let post = req.post;
  res.json({post});
}

exports.updatepost = async (req, res)=>{
    let {Location} = await imageS3(req.file)
   let  {title, subtitle, body} = req.body
    let post = req.post
    post.title = title;
    post.body= body;
    post.image = Location;
    post.subtitle = subtitle
        post.save().then(post => {
           console.log('new post containt: ', post);
           fs.unlinkSync((path.join(__dirname, '../images/' + req.file.filename)));
           res.json(post);
        })
    
}
exports.deletepost = async (req, res)=>{
    let post = req.post;

    if(!post) {
        res.status(404).json({ msg: "El post no encontrado" });
    } else {
        post.destroy().then(post => {
            res.json({ msg: "El post ha sido eliminado "});
        })
    }
}

exports.returnPostById= async (req, res ,next) =>{

try{
let post = await posts.findByPk(req.params.id);
res.status(200).json(post);
}catch(err){
next(err);
}

}
exports.createPost = async (req, res, next)=>{
try{
let imageUrl = await imageS3(req.file);
let post = await posts.create({
 title: req.body.title,
subtitle:req.body.subtitle,
body:req.body.body,
image:imageUrl.Location,
userId: req.user.id
 });
fs.unlinkSync((path.join(__dirname, '../images/' + req.file.filename)));
res.status(200).json({
msg:"post was successfully",
post_id:post.id
 })
}catch(err){
next(err)
}

}