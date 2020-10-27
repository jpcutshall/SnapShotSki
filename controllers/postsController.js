const express = require('express')
const multer = require('multer')
const router = express.Router()
const Post = require('../models/posts.js')

// MULTER SETUP
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/uploads/posts')
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
		limits:
		{
			fileSize: 1024 * 1024 * 50
		},
		fileFilter: fileFilter
	}
)

// ROUTES
router.get('/new', (req, res) => {
	res.render('posts/new.ejs',)
})
