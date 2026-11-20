
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')

const app = express()

app.use(cors())
app.use(express.json())

let connection

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return
    }

    if (!connection) {
        connection = mongoose.connect(process.env.MONGODB_URI)
            .catch(err => {
                connection = null
                throw err
            })
    }

    await connection
}

app.use(async (req, res, next) => {
    try {
        await connectDB()
        next()
    } catch (err) {
        res.status(500).json({ message: 'Database connection failed' })
    }
})

app.get('/', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.status(500).json(err))
})

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id

    UserModel.findById(id)
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err))
})

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id

    UserModel.findByIdAndUpdate(
        id,
        {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        },
        { new: true }
    )
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err))
})

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id

    UserModel.findByIdAndDelete(id)
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err))
})

app.post('/createUser', (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err))
})

module.exports = app
