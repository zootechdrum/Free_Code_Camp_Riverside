const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash   = require("connect-flash")
const mysql   = require('mysql')
const bodyParser = require("body-parser")
const path    = require('path')

const port = process.env.PORT || 3000;



const app = express();
//Uses the ejs engine
app.set("view engine" , "ejs")

//Used to extract our data. ex. req.body
app.use(bodyParser.urlencoded({extended: true}));

//Used to create the connection for the Mysql database
const connection = mysql.createConnection({
    host :   "m7wltxurw8d2n21q.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user:    "j0v4kxhchh9pskju",
    database: "lj6tv4ctmyt1bpzv",
    password: "re0xaprashhokixq"
});

connection.connect()

//Serves static files like images and css. 
app.use("/public",express.static(path.join(__dirname,"public")));

app.use(cookieParser('keyboard cat'));
app.use(require("express-session")({
    //preventsn cookies from saving if not modification happens. 
    resave:false,
    //Used to identify recurring users.
    saveUninitialized:false,
   // max-age sets the expiration date of the cookie
   cookie: { maxAge: 60000 }
 }));
app.use(flash());

app.use((req, res, next) => {
    //Use res.locals is used to set intermediate data in middleware 
    //Enables us to use is in out view available on Render. 
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next()
})



//Renders our Home page in our views folder
app.get('/', (req,res) => {
    res.render("home")
});

//Extracts all the information in our form data. 
app.post('/register', function(req,res){
    const person = {
            email_id:req.body.email,
            name: req.body.name,
            message:req.body.message
    };
//MySQL code that will insert info in to userTable
// Also ships out what message will display in our home.ejs template. 
    connection.query('INSERT INTO userTable SET ?', person, (err, result) => {
        if(err){
            req.flash("error","That email already exists");
            res.redirect("/")
        }
        if(result){
            req.flash("success","Congrats, You have been registered!")
            res.redirect("/")
        }
    })

})

//What port to listen to on home computer. 
app.listen(8080, function(){
    console.log("Server running on 8080")
})