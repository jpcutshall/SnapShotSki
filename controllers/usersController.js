const bcrypt = require('bcrypt')
const express = require('express')
const multer = require('multer')
const router = express.Router()
const User = require('../models/users.js')

// MULTER SETUP
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/uploads/')
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + file.originalname)
	}
})

const upload = multer({ storage: storage })


// ROUTES
router.get('/new', (req, res) => {
	res.render('users/new.ejs',{currentUser: req.session.currentUser})
})

router.get('/:id/edit', (req, res) => {
	User.findById(req.params.id, (err, foundUser) => {
		res.render('users/edit.ejs', {
			currentUser: req.session.currentUser
		})
	})
})

router.get('/:id', (req, res) => {
	User.findById(req.params.id, (err, foundUser) => {
		res.render('users/show.ejs', {
			currentUser: req.session.currentUser,
			user: foundUser
		})
	})
})

router.post('/', upload.single('profilePic'), (req, res) => {
	req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
	const obj = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		userName: req.body.userName,
		password: req.body.password,
		bio: req.body.bio,
		profilePic: req.file.path

	}
	console.log(req.file)
	User.create(obj, (err, createdUser) => {
		console.log('Account Created!', createdUser)
		res.redirect('/')
	})
})

module.exports = router
