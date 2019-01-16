const mysql = require('mysql');
const express = require('express');
const http = require('http');
var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('node'));
app.use('/Ressources/',express.static(__dirname + '/Ressources'));
app.set('view engine','ems');
let date = require('date-and-time');
let now = new Date();
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
app.get('/setMoney/:money/:username',(req,res)=>{
    let user = req.params;
    var sql = "Update users SET `money` = `money` + ? where id = ?";
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
	let date = require('date-and-time');
let my = date.format(now, 'YYYY-MM-DD');  
    var sql = "INSERT INTO transactions (name,image,type,category,transaction_money,userID,date) VALUES (?,?,?,?,?,?,?)";
    mysqlConnection.query(sql,[transaction.name,transaction.image,transaction.type,transaction.category,transaction.transaction_money, transaction.userID,my],
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
app.get('/Updatetype/:id/:userID',(req,res)=>{
    let transaction = req.params;
    var sql = "Update transactions SET  `type` = 'target' where id = ? AND userID = ?";
    mysqlConnection.query(sql,[transaction.id,transaction. userID],
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
/*  GETCOMPLETED */
app.get('/getCompletedTargets/:userID',(req,res)=>{
    let user = req.params;
    var sql = "Select * From transactions where  `currentMoney` = `transaction_money` AND userID = ? AND `type` = 'target'";
     mysqlConnection.query(sql,[user.userID],
        (err, rows, fields)=>{
            if(!err){
              res.send(JSON.stringify({"transactions" : rows}));
            }
            else{
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(err,undefined,2));
            }
        });
});
/*  GETCOMPLETED */
app.get('/getCurentTargets/:userID',(req,res)=>{
    let user = req.params;
    var sql = "Select * From transactions where  `currentMoney` < `transaction_money` AND userID = ? AND `type` = 'target'";
     mysqlConnection.query(sql,[user.userID],
        (err, rows, fields)=>{
            if(!err){
              res.send(JSON.stringify({"transactions" : rows}));
            }
            else{
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(err,undefined,2));
            }
        });
});


app.get('/getWhatWish/:userID',(req,res)=>{
    let user = req.params;
     var sql = "SELECT * FROM transactions JOIN users ON transactions.userID  = users.id  WHERE transactions.type = 'wish' and transactionS.userID = ? AND  transactions.transaction_money  < users.money ";
     mysqlConnection.query(sql,[user.userID],
        (err, rows, fields)=>{
            if(!err){
              res.send(JSON.stringify({"transactions" : rows}));
            }
            else{
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(err,undefined,2));
            }
        });
});
/*  GETCOMPLETED */
app.get('/getTodayTrans/:userID',(req,res)=>{
    let user = req.params;
	let date = require('date-and-time');
let my = date.format(now, 'YYYY-MM-DD');  
    var sql = "Select * From transactions where  date  = ? AND userID =  ?";
     mysqlConnection.query(sql,[my,user.userID],
        (err, rows, fields)=>{
            if(!err){
              res.send(JSON.stringify({"transactions" : rows}));
            }
            else{
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(err,undefined,2));
            }
        });
});
/*  GETCOMPLETED */
app.get('/getWeekTrans/:userID',(req,res)=>{
    let user = req.params;
	let date = require('date-and-time');
let my = date.format(now, 'YYYY-MM-DD');
let week = date.addDays(now, -7);
console.log(week);
    var sql = "Select * From transactions where (? < date) AND userID =  ?  ";
     mysqlConnection.query(sql,[week,user.userID],
        (err, rows, fields)=>{
            if(!err){
              res.send(JSON.stringify({"transactions" : rows}));
            }
            else{
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(err,undefined,2));
            }
        });
});
app.get('/getMonthTrans/:userID',(req,res)=>{
    let user = req.params;
	let date = require('date-and-time');
let my = date.format(now, 'YYYY-MM-DD');
let week = date.addDays(now, -30);
console.log(week);
    var sql = "Select * From transactions where (? < date) AND userID =  ? ";
     mysqlConnection.query(sql,[week,user.userID],
        (err, rows, fields)=>{
            if(!err){
              res.send(JSON.stringify({"transactions" : rows}));
            }
            else{
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(err,undefined,2));
            }
        });
});
