const express = require('express');
const path = require('path')

const app = express();

app.use("/public", express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})


app.listen(8080, function(){
    console.log("Server running on 8080")
})