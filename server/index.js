
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err))

// Get All Users
app.get('/createUser', (req, res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err))
})

// Get Single User
app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;

    UserModel.findById(id)
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err))
})

// Update User
app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;

    UserModel.findByIdAndUpdate(id, {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    }, { new: true })
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err))
})

// Delete User
app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;

    UserModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err))
})

// Create User
app.post("/createUser", (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err))
})

if (require.main === module) {
    app.listen(3001, () => {
        console.log("Server is Running")
    })
}

module.exports = app
