const books = require('express').Router()
const db = require('../models')

books.get('/seed', (req, res) => {
    db.Book.insertMany([{
        "title": "The Shinobi Initiative",
        "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
        "year": 2014,
        "quantity": 10,
        "imageURL": "https://imgur.com/LEqsHy5.jpeg"
    },
    {
        "title": "Tess the Wonder Dog",
        "description": "The tale of a dog who gets super powers",
        "year": 2007,
        "quantity": 3,
        "imageURL": "https://imgur.com/cEJmGKV.jpg"
    },
    {
        "title": "The Annals of Arathrae",
        "description": "This anthology tells the intertwined narratives of six fairy tales.",
        "year": 2016,
        "quantity": 8,
        "imageURL": "https://imgur.com/VGyUtrr.jpeg"
    },
    {
        "title": "Wâˆ€RP",
        "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
        "year": 2010,
        "quantity": 4,
        "imageURL": "https://imgur.com/qYLKtPH.jpeg"
    }])
        .then(res.status(200).json({
            message: 'Seed successful'
        }))
        .catch(res.status(400).json({
            message: 'Seed unsuccessful'
        }))
})

// INDEX
books.get('/', (req, res) => {
    db.Book.find()
        .then(foundBooks => {
            res.json( {
                books: foundBooks,
                title: 'Index Page'
            })
        })
        .catch(err => {
            res.send('404')
        })
})

// SHOW
books.get('/:id', (req, res) => {
    db.Book.findById(req.params.id)
        .populate('book')
        .then(foundBook => {
            res.json({
                book: foundBook
            })
        })
        .catch(err => {
            res.send('404')
        })
})

// CREATE
books.post('/', (req, res) => {
    db.Book.create(req.body)
    res.redirect('/books')
})

// UPDATE
books.put('/:id', (req, res) => {

    db.Book.findByIdAndUpdate(req.params.id, req.body)
        .then(updatedBook => {
            res.json(`/books/${req.params.id}`)
        })
})

// DELETE
books.delete('/:id', (req, res) => {
    db.Book.findByIdAndDelete(req.params.id)
        .then(deletedBook => { res.status(303).redirect('/books') })

})

module.exports = books