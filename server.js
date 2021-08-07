const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const app = express()
const Post = require('./models/posts.js')
const User = require('./models/users.js')
require('dotenv').config()


const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI


// middleWare
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
app.use(express.static(process.cwd() + '/public'));
app.use('/public/', express.static('uploads'))


// SESSIONS
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
)

// mongoose connection code
mongoose.connect(mongodbURI, 
{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})


mongoose.connection.once('open', ()=> {
  console.log('connected to mongo');
});


mongoose.set('useUnifiedTopology', true)



// controllers
const usersController = require('./controllers/usersController.js')
app.use('/users', usersController)

const postsController = require('./controllers/postsController.js')
app.use('/posts', postsController)

const sessionsController = require('./controllers/sessionsController.js')
app.use('/sessions', sessionsController)


app.get('/', (req,res) => {
  Post.find( (err, foundPosts) => {
    res.render('home.ejs',
    {
      currentUser: req.session.currentUser,
      posts: foundPosts
    })
  })

})

app.listen(PORT, () => {
	console.log('Listening to port : ', PORT)
})
