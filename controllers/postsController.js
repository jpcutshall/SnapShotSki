const express = require('express')
const multer = require('multer')
const fs = require('fs')

const router = express.Router()
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
	res.render('posts/new.ejs', { currentUser: req.session.currentUser})
})

router.get('/:id', isAuthorized, (req, res) => {
	Post.findById(req.params.id, (err, foundPost) => {

		foundPost.image.data = new Buffer.from(foundPost.image.data.buffer).toString('base64')

		console.log(foundPost)
		res.render('posts/show.ejs', {
			currentUser: req.session.currentUser,
			post: foundPost
		})
	})
})

router.get('/:id/edit', (req, res) => {
	Post.findById(req.params.id, (err, foundPost) => {
		console.log(foundPost)
		res.render('posts/edit.ejs',
		{
			currentUser: req.session.currentUser,
			post: foundPost
		})
	})
})

router.put('/:id', (req, res) => {
	Post.findByIdAndUpdate(req.params.id, req.body,  (err, updatedPost) => {
		res.redirect('/users/' + req.session.currentUser.userName)
	})
})

router.delete('/:id', (req, res) => {
	Post.findById(req.params.id, (err, foundPost) => {
		fs.unlink(foundPost.image, (err) => {
			if (err) {
				console.log('ERROR_____', err)
			}
		})
	})
	Post.findByIdAndRemove(req.params.id, (err, data) => {
		res.redirect('/users/' + req.session.currentUser.userName)
	})
})


router.post('/', upload.single('image'), (req, res) => {
	const postObj = {
		title: req.body.title,
		description: req.body.description,
		image: {
			data: fs.readFileSync('./uploads/' + req.file?.filename) ?? '',
			contentType: 'image/jpeg'
		},
		author: req.session.currentUser.userName
	}
	Post.create(postObj, (err, createdPost) => {
		console.log('Post Posted! ', createdPost)
		res.redirect('/')
	})
})



module.exports = router
