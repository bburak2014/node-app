const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const path=require('path');
const multer  =   require('multer');

 



app.set('view engine','pug');
app.set('views','./views');
const adminroutes=require('./routes/admin');
const userroutes=require('./routes/shop');

const errorsController = require('./controller/errors');
 
app.use(bodyParser.urlencoded({extended:false}));
app.use(multer().single('userPhoto'));

app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'uploads')));

app.use(express.static(path.join(__dirname,'public','image')));
 app.use("/jquery", express.static(path.join(__dirname, "/node_modules/jQuery/dist")));

     
app.use(bodyParser.json());
app.use('/admin',adminroutes);
app.use(userroutes);



 

app.use(errorsController.getErrors);

app.listen(8080,()=>{
    console.log("listening port 8080");
});