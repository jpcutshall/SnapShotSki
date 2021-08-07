const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
	firstName: { type: String, default: ' ' },
	lastName: { type: String, default: ' ' },
	userName: { type: String, unique: true, required: true },
	password: { type: String, required: true},
	bio: { type: String, default: ' ' },
	profilePic: {
		data: Buffer,
        contentType: String, 
	},
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post'
		}
	]
}, { timestamps: { createdAt: 'created_at' } })

const User = mongoose.model('User', userSchema)

module.exports = User
