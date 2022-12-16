const express = require('express')

const bodyParser = require('body-parser')

const app = express()

const bcrypt = require('bcrypt');

const userModel = require('../models/userSchema')

var jwt = require('jsonwebtoken');

app.use(bodyParser.json())

app.post('/', async (req, res) => {
    const { email, password } = req.body
    // console.log(req.body)
    try {
        const data = await userModel.findOne({ email: email })
        console.log(data)
        // console.log(req.body)
        // console.log(data)
        if (data) {

            bcrypt.compare(password, data.password, (err, result) => {

                if (err) {
                    return res.status(200).json({

                        failure: "failed"
                    })
                }
                // console.log(result)
                if (result) {
                    const token = jwt.sign({

                        exp: Math.floor(Date.now() / 1000) + (60 * 60),

                        data: data

                    }, 'secret');

                    res.status(200).json({
                        status: "success",
                        token: token
                    })
                    // console.log(d)
                }
            });
        } else {
            res.status(400).json({
                failure: "data is not there"
            })
        }
    } catch (e) {

        return res.json({

            failure: e.message
        })
    }
});

module.exports = app