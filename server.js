const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path')
require('dotenv').config()
const session = require('express-session')
const {v4:uuidv4} = require('uuid')
const PORT = process.env.PORT || 5000
const router = require('./router');
const { Router } = require('express');
app.set('view engine', 'ejs');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// static assets
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))
app.use(session({
    secret: uuidv4(),
    resave:false,
    saveUninitialized:true
}));

app.use('/route', router);

// home route
app.get('/', (req,res) => {
    res.render('base',{title: "Login System"});
})

app.listen(PORT, () => {
    console.log(`server is up and running in ${PORT}`)
})

