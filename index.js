// DEPENDENCIES
const express = require('express')
const mongoose = require('mongoose')

// CONFIG
require('dotenv').config()
const PORT = process.env.PORT
const app = express()


mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('connected to mongo: ', process.env.MONGO_URI);
    }).catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }))

// CONTROLLERS
const bookController = require('./controllers/books-controller.js')
app.use('/books', bookController)

// INDEX   
app.get('/', (req, res) => {
    res.send('Books API project')
})

app.get('*', (req, res) => {
    res.render('error404')
})

// LISTEN
app.listen(process.env.PORT)