const mysql = require('mysql');
const express = require('express');
const http = require('http');
var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('node'));
app.use('/Ressources/',express.static(__dirname + '/Ressources'));
app.set('view engine','ems');

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    port: '8889',
    password:'root',
    database:'money_plan_db'
});

mysqlConnection.connect((err)=>{
    if(!err)
    console.log('DB connection success.');
    else
    console.log('DB connect failed. \n ERROR :' +JSON.stringify(err,undefined,2));
});

app.listen(3000,()=>console.log('express server is running '));












                            /*USER FUNCTIONS*/
/*  REGISTER */

app.get('/register/:username/:email/:password/:money',(req,res)=>{
    let user = req.params;
    var sql = "INSERT INTO users (username,email,password,money) VALUES (?,?,?,?)";
    mysqlConnection.query(sql,[user.username,user.email,user.password,user.money],
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

/ * Login */ 
app.get('/login/:username/:password',(req,res)=>{
    let user = req.params;
    var sql = "SELECT * FROM  users WHERE username = ? And password = ? ";
    mysqlConnection.query(sql,[user.username,user.password],
    function(err, rows){
        if(!err){    

       res.send(JSON.stringify({"users" : rows}));
}
 else {
console.log(err)
         }
    });
});
/*****/
/ * Get userid */ 
app.get('/getUser/:username',(req,res)=>{
    let user = req.params;
    var sql = "SELECT * FROM  users WHERE username = ? ";
    mysqlConnection.query(sql,[user.username],
    function(err, rows){
        if(!err){    

       res.send(JSON.stringify({"user" : rows}));
}
 else {
console.log(err)
         }
    });
});
/////

/*  SET MONEY */
app.get('/setMoney/:money/ :username',(req,res)=>{
    let user = req.params;
    var sql = "Update users SET money = ? where username = ?";
    mysqlConnection.query(sql,[user.money,user.username],
        (err, rows, fields)=>{
            if(!err){
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ "success": 1 , "message" : " money added successfully" },undefined,2));
            }
            else{
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(err,undefined,2));
            }
        });
});

/*  Change User Name */
app.get('/setMoney/:username/ :id',(req,res)=>{
    let user = req.params;
    var sql = "Update users SET username = ? where id = ?";
    mysqlConnection.query(sql,[user.money,user.id],
        (err, rows, fields)=>{
            if(!err){
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ "success": 1 , "message" : " money added successfully" },undefined,2));
            }
            else{
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(err,undefined,2));
            }
        });
});

                                            /*Transaction FUNCTIONS*/

/* Create */
app.get('/Insert/:name/:image/:type/:category/:transaction_money/:userID',(req,res)=>{
    let transaction = req.params;
    var sql = "INSERT INTO transactions (name,image,type,category,transaction_money,userID) VALUES (?,?,?,?,?,?)";
    mysqlConnection.query(sql,[transaction.name,transaction.image,transaction.type,transaction.category,transaction.transaction_money, transaction.userID],
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

/ * Get transactions */ 
app.get('/getTransactions/:userID/:trType',(req,res)=>{
    let user = req.params;
    var sql = "SELECT * FROM  transactions WHERE userID = ? AND type = ? ";
    mysqlConnection.query(sql,[user.userID,user.trType],
    function(err, rows){
        if(!err){    

       res.send(JSON.stringify({"transactions" : rows}));
}
 else {
console.log(err)
         }
    });
});
/////
/ * Get transactions */ 
app.get('/setCurrentMoney/:money/:id/:userID',(req,res)=>{
    let user = req.params;
    var sql = "Update transactions SET currentMoney = ? where id = ? AND userID = ? ";
    mysqlConnection.query(sql,[user.money,user.id,user.userID],
    function(err, rows){
        if(!err){    

       res.send(JSON.stringify({"transactions" : rows}));
}
 else {
console.log(err)
         }
    });
});
/////
/* UPDATE */
app.get('/Update/:transaction_money /: id',(req,res)=>{
    let transaction = req.params;
    var sql = "Update transactions SET transaction_money = ? where id = ?";
    mysqlConnection.query(sql,[transaction.transaction_money,transaction.id],
        (err, rows, fields)=>{
            if(!err){
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ "success": 1 , "message" : " Transaction updated" },undefined,2));
            }
            else{
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(err,undefined,2));
            }
        });
});
/* DELETE */
app.get('/Delete/:id',(req,res)=>{
    let transaction = req.params;
    var sql = "DELETE FROM transactions WHERE id= ?";
    mysqlConnection.query(sql,[transaction.id],
        (err, rows, fields)=>{
            if(!err){
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ "success": 1 , "message" : " Transaction deleted" },undefined,2));
            }
            else{
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(err,undefined,2));
                }
            });
});
