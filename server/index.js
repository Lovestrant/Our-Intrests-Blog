const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express();

dotenv.config({path: './.env'});
const port = process.env.PORT || 5000;

//sql connctions
sqldb = mysql.createConnection({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

//middlewares
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    key: "userId",
    secret: "mySecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24
    },
}))
//routes

//Check if user is logged in already
app.get("/Login", (req,res) => {
    if(req.session.user) {
        res.send({loggedIn: true, user: req.session.user});
    }else{
        res.send({loggedIn: false});
    }
})

//Post Text posts
app.post("/postText", (req, res) => {
    let postFromUser = req.body.textPost;
    let id = "";
    imageUrl = "";

    sqldb.query("INSERT INTO posts values(?,?,?)",[id,postFromUser,imageUrl], (error, result) => {
        if(error) {
            console.log(error);
        }
        if(result) {
            return res.send({postStatus: true});
        }
    });
})

//Post Image with Caption


//Handle logout
app.post("/Logout", (req,res) => {
    if(req.session) {
        req.session.destroy();
        res.send({status: true});
    }else{
        res.send({status: false});
    }
})
//reset route
app.post("/Reset",(req,res) => {
    let username = req.body.Username;
    let password = req.body.password;

    sqldb.query("SELECT * FROM auth WHERE username = ? Limit 1",username, (error,result) => {
        if(error) {
            console.log(error);
        }
        if(result.length > 0) {
            bcrypt.hash(password,saltRounds, (error, hashedPassword) => {
                sqldb.query("UPDATE auth SET password = ? WHERE username = ?",
                 [hashedPassword,username], (err, result) => {
                    if(err) {
                        console.log(err);
                    }
                    if(result) {
                        res.send({message: "Update Success", redirect: true});
                        
                    }
                 })
            })
        }else{
            res.send({message: "No such user in the System"});
        }
    })
})

//signup route
app.post("/Signup", (req,res) => {
    let username = req.body.username;
    let password = req.body.password;
    let id = "";

    //check if user exists
    sqldb.query("SELECT * from auth WHERE username = ? LIMIT 1",username,
    (err, result) => {
        if(err) {
            console.log(err);
        }
        if(result.length > 0) {
           res.send({message: 'User already exists' });          
        }else{
            //hash password
            bcrypt.hash(password, saltRounds, (err,hashedPassword) => {
                if(err) {
                    console.log(err);
                }
                sqldb.query("INSERT INTO auth values(?,?,?)",[id,username,hashedPassword]
                ,(error, result2) => {
                    if(error) {
                        console.log(error);
                    }
                    if(result2){
                    return res.send("Record inserted");
                        
                    }
                })

            })
        }

    })   
})


//Login route
app.post("/Signin", (req,res) => {
    let username = req.body.username;
    let password = req.body.password;
    
   
    sqldb.query("SELECT * FROM auth WHERE username=? Limit 1",username,
    (err,result) => {
        if(err) {
            console.log(err);
        }
        if(result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
                if(error) {
                    console.log(error);
                }
                if(response){
                    //Set session
                    req.session.user = username;
                    res.send({message: "success"});
                }else{
                    res.send({message: "Wrong combinations..." });
                }
            });

        }else{
            res.send( {message: "No such user in the system" });
        }
    })
})


app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});