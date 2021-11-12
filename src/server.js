
const express = require('express');
const path = require('path');
require('dotenv').config()
const router = require('./routes/routesmain');
const app = express();
const cors = require('cors');
const {sequelize} = require('./models/index');
const { errors } = require('./Errors/Errorsmidleware');
//SETINGS
const PORT = process.env.PORT || 3004;
app.use(express.static(path.join(__dirname , 'dbimages')));
//MIDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

//ROUTE TEST
app.use(router);
app.use(errors);
//SERVER
app.listen(PORT, ()=>{
console.log('server listening on port: ', PORT);
sequelize.authenticate().then(()=>{
console.log('db is connect')
})
})