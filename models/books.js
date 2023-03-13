const mongoose = require('mongoose')
const { Schema } = mongoose

// SCHEMA
const bookSchema = new Schema({
    title: { type: String, required: true},
    description: {type: String, default: false},
    year: {type: Number},
    quantity: { type: Number},
    imageURL: { type: String}

})

const Book = mongoose.model('Book', bookSchema)
module.exports = Book