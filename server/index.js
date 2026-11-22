
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Backend is Running Successfully")
})

app.post('/createUser', (req, res) => {
    const { name, email, age } = req.body

    if (!name || !email || !age) {
        return res.status(400).json({
            message: "Please fill all fields"
        })
    }

    res.status(200).json({
        message: "Your data has been received successfully!",
        user: { name, email, age }
    })
})

if (require.main === module) {
    app.listen(3001, () => {
        console.log("Server is Running")
    })
}

module.exports = app
