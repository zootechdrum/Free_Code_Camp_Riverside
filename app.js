const express = require('express');
const mysql   = require('mysql')
const bodyParser = require("body-parser")
const path    = require('path')

//heroku
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


const connection = mysql.createConnection({
    host : "m7wltxurw8d2n21q.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user:"j0v4kxhchh9pskju",
    database:"lj6tv4ctmyt1bpzv",
    password:"re0xaprashhokixq"

})
connection.connect()


app.use("/public", express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.post('/register', function(req,res){
    var person = {
        email_id: "zootechdrum",
        name:"cesar",
        message:"hello"
    };

    connection.query('INSERT INTO userTable SET ?', person, function(err, result){
        if(err){
            throw err;
        }
        res.send("Thanks for joining our wait list!")
    })
})

// connection.end();

app.listen(3030,() => {
    console.log("Server running on 8080")
});