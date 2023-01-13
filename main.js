const express = require ("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productsRoutes = require('./routes/products');
const methodOverride = require("method-override");
const path = require('path');
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");


dotenv.config({path : './config.env'});

const dbPath = process.env.DB_PATH;
const dbOptions = {useNewUrlParser : true};
mongoose.connect(dbPath, dbOptions)
.then(()=>{console.log(`We are connected to our data ${dbPath}`);})
.catch(()=>{console.log("We are not connected");});

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));

app.set('views', 'views');
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(cookieParser("my_secret_passcode"));
app.use(expressSession({
    secret: "my_secret_passcode",
    cookie:{
        maxAge: 4000000
    }, 
    resave: false,
    saveUninitialized: false
}));
app.use(connectFlash());
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});

app.use(productsRoutes);

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log("Serveur listening on port " + port);
});