const mysql = require('mysql');
const express = require('express');
const http = require('http');
var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('node'));
app.use('/Ressources/',express.static(__dirname + '/Ressources'));


var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'money_plan_db'
});

mysqlConnection.connect((err)=>{
    if(!err)
    console.log('DB connection success.');
    else
    console.log('DB connect failed. \n ERROR :' +JSON.stringify(err,undefined,2));
});

app.listen(3000,()=>console.log('express server is running '));

/*  REGISTER */

app.get('/register/:username/:email/:password/:money',(req,res)=>{
    let user = req.params;
    var sql = "INSERT INTO users (username,email,password,money) VALUES (?,?,?,?)";
    mysqlConnection.query(sql,[users.username,user.email,user.password,user.money],
    (err, rows, fields)=>{
        if(!err){    
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ "success": 1 , "message" : " user added successfully" },undefined,2));
        }
        else{
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(err,undefined,2));   
        }   
    });
});

app.get('/register/test',(req,res)=>{
    res.write('Hello World!'); //write a response to the client
    res.end(); //end the response
});

