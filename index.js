var express=require("express");
var mysql=require("mysql2");
const app=express();
const bodyParser =require('body-parser');
const homerouter=require('./router/home')
var db = require('./database');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',homerouter)
//app.get('/router/home',function(req,res){if(err) throw err;})
app.listen(3200, function(){
    console.log('App Listening on port 3000');
    db.connect(function(err){
        if(err) throw err;
        console.log('Database connected!');
    })
});