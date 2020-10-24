const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
	username: { type: String, unique: true, required: true },
	password: { type: Password, required: true},
	bio: { type: String },
	website: {type: Url}
})
