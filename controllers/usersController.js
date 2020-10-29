const bcrypt = require('bcrypt')
const express = require('express')
const fs = require('fs')
const multer = require('multer')
const router = express.Router()
const User = require('../models/users.js')
const Post = require('../models/posts.js')

const isAuthorized = (req, res, next) => {
	if (req.session.currentUser) {
		return next()
	} else {
		res.redirect('/sessions/new')
	}
}

// MULTER SETUP
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/uploads/users')
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + file.originalname)
	}
})

const fileFilter = (req, file, cb) => {

	if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/gif'){
		cb(null, true) //accept file
	} else {
	 cb(null, false) // reject file
	}

}

const upload = multer({
	storage: storage,
		limits: {
			fileSize: 1024 * 1024 * 20
				},
		fileFilter: fileFilter
 })


// ROUTES
router.get('/new', (req, res) => {
	res.render('users/new.ejs', {currentUser: req.session.currentUser})
})

router.get('/:username/edit', isAuthorized, (req, res) => {
	User.findOne({userName: req.params.username}, (err, foundUser) => {
		res.render('users/edit.ejs', {
			currentUser: req.session.currentUser,
			user: foundUser
		})
	})
})

router.get('/:username', isAuthorized, (req, res) => {
	User.findOne({userName: req.params.username}, (err, foundUser) => {
		Post.find( { author: req.params.username}, (err, foundPosts) => {
			res.render('users/show.ejs', {
				currentUser: req.session.currentUser,
				user: foundUser,
				posts: foundPosts

				})
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

router.delete('/:username', (req, res) => {
	User.find({userName: req.params.username}, (err, foundUser) => {
		fs.unlink('./' + foundUser.profilePic, (err) => {
			if (err) {
				console.log('ERROR_____', err)
			}
		})
	})
	User.findOneAndRemove({userName: req.params.username}, (err, data) => {
		res.redirect('/')
	})
})

router.put('/:username', upload.single('profilePic'), (req, res) => {
	const editedObj = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		bio: req.body.bio,
		profilePic: req.file.path

	}
	User.findOneAndUpdate({userName: req.params.username}, editedObj, (err, updatedUser) => {
		res.redirect('/users/' + req.params.username)
	})
})

module.exports = router
