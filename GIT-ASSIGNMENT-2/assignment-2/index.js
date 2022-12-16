const express = require('express')

const mongoose = require('mongoose')

// const loginRoute=require('./routers/loginRoute')

const registerRoute = require('./routers/registerRoute')

const loginRoute = require('./routers/loginRoute')

const posts = require('./routers/postRoute')

var jwt = require('jsonwebtoken');

mongoose.connect('mongodb://localhost/assignment')

const app = express()

app.post('/posts', async (req, res, next) => {
    // res.send('ok')
    try {
        const token = req.headers.authorization
        // console.log(token)
        if (token) {
            jwt.verify(token, 'secret', function (err, decoded) {

                if (err) {
                    return res.json({
                        mess: err.message
                    })
                }
                // console.log(decoded.data)
                req.user = decoded.data

            });
            // console.log(token)
            next()
        } else {

            res.json({

                status: "token is not there"

            })
        }
    } catch (e) {

        res.json({

            failure: e.message

        })
    }
})
app.use('/posts', posts)

app.use('/register', registerRoute)

app.use('/login', loginRoute)

app.listen(3000, () => { console.log("server is running") })