const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = Schema({
	title:  { type: String, required: true, unique: true},
	description: String,
	location: String,
	image: { type: String, required: true},
	likes: [
	{
		type: String,
		ref: 'User'
	}
],
	author:	{
			type: String,
			ref: 'User'
		}
}, { timestamps: { createdAt: 'created_at' } })

const Post = mongoose.model('Post', postSchema)

module.exports = Post
