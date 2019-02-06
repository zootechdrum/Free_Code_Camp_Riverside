const express = require('express');
const mysql   = require('mysql')
const path    = require('path')

const app = express();

const connection = mysql.createConnection({
    host:'localhost',
    user: 'zootechdrum',
    database: "join_us"
})

app.use("/public", express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})


app.listen(8080, function(){
    console.log("Server running on 8080")
})