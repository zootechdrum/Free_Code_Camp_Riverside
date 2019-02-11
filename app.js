const express = require('express');
const mysql   = require('mysql')
const bodyParser = require("body-parser")
const path    = require('path')

//heroku
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


const connection = mysql.createConnection(process.env.JAWSDB_URL)
connection.connect()



app.use("/public", express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.post('/register', function(req,res){
    const person = {
        email: req.body.email
    };

    connection.query('INSERT INTO userTable SET ?', person, function(err, result){
        if(err){
            throw error;
        }
        res.send("Thanks for joining our wait list!")
    })
})

connection.end();

app.listen(port, function(){
    console.log("Server running on 8080")
});