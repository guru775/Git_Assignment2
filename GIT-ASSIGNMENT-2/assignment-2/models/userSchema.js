const mongoose = require('mongoose')

const Schema = mongoose.Schema

// const id =Schema.ObjectId

const userSchemas = new Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String }
})

const models = mongoose.model('User', userSchemas)

module.exports = models