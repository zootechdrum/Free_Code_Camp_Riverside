const express = require('express');
const mysql   = require('mysql')
const bodyParser = require("body-parser")
const path    = require('path')

//heroku
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


const connection = mysql.createConnection({
    host:'localhost',
    user: 'zootechdrum',
    database: "join_us"
})

app.use("/public", express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.post('/register', function(req,res){
    console.log("Post request sent to /register :email is " + req.body.email)
})


app.listen(port, function(){
    console.log("Server running on 8080")
});