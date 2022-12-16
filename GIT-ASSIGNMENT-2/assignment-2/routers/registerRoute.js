const express = require('express')

const bodyParser = require('body-parser')

const app = express()

const bcrypt = require('bcrypt');

const userModel = require('../models/userSchema')

app.use(bodyParser.json())

app.post('/', async (req, res) => {
    const { name, email, password } = req.body
    console.log(req.body)
    try {
        // console.log(req.body)
        if (name && email && password) {
            bcrypt.hash(password, 10, async function (err, hash) {
                // Store hash in your password DB.
                if (err) {
                    return res.status(400).json({
                        failure: "error"
                    })
                }
                const datas = await userModel.create({
                    name: name,
                    email: email,
                    password: hash
                })
                return res.status(200).json({
                    data: datas
                })
            });
        }
    } catch (e) {
        return res.status(400).json({
            failure: e.message
        })
    }
});

module.exports = app