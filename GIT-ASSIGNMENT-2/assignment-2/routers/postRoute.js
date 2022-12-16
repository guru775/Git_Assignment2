const express = require('express')

const app = express()

const bodyParser = require('body-parser')

const postSchema = require('../models/postShcema')

app.use(bodyParser.json())
app.get('/', async (req, res) => {
    const data = await postSchema.find()
    // console.log(data)
    if (data.length !== 0) {
        res.status(200).json({
            posts: [data]
        })
    } else {
        res.json({
            message: "nothing to fetch"
        })
    }
})
app.post('/', async (req, res) => {
    // console.log(req.user)
    try {
        if (req.body.title && req.body.body) {
            const data = await postSchema.create({
                title: req.body.title,
                body: req.body.body,
                user: req.user

            })
            res.status(200).json({
                status: "post created",
                data: data
            })
        } else {
            res.json({
                failure: "please enter title and body ",
            })
        }

    } catch (e) {
        res.status(400).json({
            status: e.message
        })
    }

})

app.put('/:postsId', async (req, res) => {
    // console.log(req.user)
    try {

        const data = await postSchema.updateOne({ _id: req.params.postsId }, { ...req.body })
        res.status(200).json({
            status: "success",
        })

    } catch (e) {
        res.status(400).json({
            status: e.message
        })
    }

})

app.delete('/:postsId', async (req, res) => {
    // console.log(req.user)
    try {

        const data = await postSchema.deleteOne({ _id: req.params.postsId })
        if (data) {
            res.status(200).json({
                status: "successfully deleted",
            })
        } else {
            res.json({
                message: "nothing to delete"
            })
        }

    } catch (e) {
        res.status(400).json({
            status: e.message
        })
    }

})
module.exports = app