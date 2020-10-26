const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
	firstName: String,
	lastName: String,
	userName: { type: String, unique: true, required: true },
	password: { type: String, required: true},
	bio: { type: String }

})

const User = mongoose.model('User', userSchema)

module.exports = User
