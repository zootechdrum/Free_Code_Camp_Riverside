const express = require('express');
const mysql   = require('mysql')
const bodyParser = require("body-parser")
const path    = require('path')

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


const connection = mysql.createConnection({
    host :   "m7wltxurw8d2n21q.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user:    "j0v4kxhchh9pskju",
    database: "lj6tv4ctmyt1bpzv",
    password: "re0xaprashhokixq"
});

connection.connect()

app.use("/public", express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.post('/register', function(req,res){
    const person = {
            email_id:"rkr@gmail.com",
            name:"Luz",
            message:"FUCK me "
    };

    connection.query('INSERT INTO userTable SET ?', person, (err, result) => {
        if(err){
            res.send("Hey, that email already exists. Try again with a new email")
        }
        res.send("Thanks for joining FreeCodeCamp Riverside!")
    })
})


app.listen(8080, function(){
    console.log("Server running on 8080")
})