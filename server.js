const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const app = express()
require('dotenv').config()

const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI


// middleWare
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'));


// SESSIONS
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialiazed: false
  })
)

// mongoose connection code
mongoose.connect(mongodbURI, { useNewUrlParser: true})
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

// controllers


app.get('/', (req,res) => {
	res.render('home.ejs')   // pass collection of posts
})

app.listen(PORT, () => {
	console.log('Listening to port : ', PORT)
})
