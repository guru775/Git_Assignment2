const mongoose = require('mongoose')

const Schema = mongoose.Schema

const id = Schema.ObjectId

const userSchemas = new Schema({
    title: { type: String },
    body: { type: String },
    image: { data: Buffer },
    user: { type: id, ref: "User" }
});

const posts = mongoose.model('Post', userSchemas)

module.exports = posts