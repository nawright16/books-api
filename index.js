// DEPENDENCIES
const express = require('express')
const mongoose = require('mongoose')

// CONFIG
require('dotenv').config()
const app = express()


// Express Settings
app.engine('jsx', require('express'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('connected to mongo: ', process.env.MONGO_URI);
    }).catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// INDEX   
app.get('/', (req, res) => {
    res.send('Hello world!')
})

// BOOKS
const booksController = require('./controllers/books-controller.js')
app.use('/books', booksController)

app.get('*', (req, res) => {
    res.render('error404')
})

app.listen(process.env.PORT)