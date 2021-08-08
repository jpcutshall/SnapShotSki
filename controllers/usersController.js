const bcrypt = require('bcrypt')
const express = require('express')
const multer = require('multer')
const fs = require('fs')

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



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now())
    }
})

const upload = multer({ storage })


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
		
		foundUser.profilePic.data = 
		new Buffer.from(foundUser.profilePic.data.buffer).toString('base64')

		Post.find( { author: req.params.username}, (err, foundPosts) => {

			for (let i = 0; i < foundPosts.length; i++) {
				foundPosts[i].image.data = 
				new Buffer.from(foundPosts[i].image.data.buffer).toString('base64')
			}

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
		profilePic: {
			data: fs.readFileSync('./uploads/' + req.file?.filename) ?? '',
			contentType: 'image/jpeg'
		}
	}

	User.create(obj, (err, createdUser) => {
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
		profilePic: {
			data: fs.readFileSync('./uploads/' + req.file?.filename) ?? '',
			contentType: 'image/jpeg'
		}
	}
	User.findOneAndUpdate({userName: req.params.username}, editedObj, (err, updatedUser) => {
		res.redirect('/users/' + req.params.username)
	})
})

module.exports = router
