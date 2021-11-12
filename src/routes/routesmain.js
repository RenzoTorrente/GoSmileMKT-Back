const express = require('express');
const Authcontroller = require('../controllers/Authcontroller');
const controllerpost = require('../controllers/Postcontroller');
const authmiddleware = require('../middlewares/auth');
const { ValidatoRegister } = require('../validators/ValidatoRegister');
const {ValidatorLogin} = require('../validators/ValidatorLogin');
const policies = require('../policies/policies');
const fileUpload = require('../middlewares/uploadmiddleware');
const router = express.Router();
const emailController = require('../controllers/EmailContactController');

router.get('/', (req, res)=>{
    res.json({message:'hello word'});
});
router.post('/api/signin',ValidatorLogin, Authcontroller.signIn);
router.post('/api/signup',ValidatoRegister, Authcontroller.signUp);

//POST routes
router.get('/api/posts/:page', authmiddleware.auth, controllerpost.postcontroller );
router.get('/api/post/:id', authmiddleware.auth, controllerpost.returnPostById )
router.patch('/api/post/:id', authmiddleware.auth,fileUpload, controllerpost.findpost, policies.delete, controllerpost.updatepost);
router.delete('/api/post/:id', authmiddleware.auth,controllerpost.findpost ,policies.delete, controllerpost.deletepost);
router.post('/api/post', authmiddleware.auth, fileUpload, controllerpost.createPost)

//CONTACT Routes
router.post('/api/contact/consult', emailController.SendConsultAtEmail)
module.exports = router;