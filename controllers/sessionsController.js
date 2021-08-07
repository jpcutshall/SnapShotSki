const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const User = require('../models/users.js')


router.get('/new', (req, res) => {
	res.render('sessions/new.ejs', {currentUser: req.session.currentUser})
})

router.post('/', (req, res) => {
 	console.log(req.body)
	User.findOne({ username: req.body.username}, (err, foundUser) => {
		if (err) {
			console.log(err)
			res.send('oops there was an unexpected issue', err)
		} else if (!foundUser) {
			res.send('<a href="/sessions/new">Sorry, no user found </a>')
		} else {
			if (bcrypt.compareSync(req.body.password, foundUser.password)) {
			req.session.currentUser = foundUser
			res.redirect('/')
			} else {
			res.send('<a href="/sessions/new">Incorrect Password</a>')
			}
		}
	})
})

router.delete('/', (req, res) => {
	req.session.destroy(() => {
		res.redirect('/')
	})
})

module.exports = router
