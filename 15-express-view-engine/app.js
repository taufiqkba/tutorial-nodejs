const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000

// user view engine EJS

app.set('view engine', 'ejs')
app.set('layout', 'layouts/main-layout')
app.use(expressLayouts)

app.get('/', (req, res) => {
    const students = [
        {
            name: 'taufiqkba',
            email: 'taufiqkba@gmail.com'
        },
        {
            name: 'Erique',
            email: 'erique@gmail.com'
        },
        {
            name: 'Dody',
            email: 'dody@gmail.com'
        },
    ]
    res.render('index', {
        name: 'Taufiq Kurniawan',
        title: 'Home Page',
        students,
        
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        
    })
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact Page',
        
    })
})

app.get('/product/:id', (req, res) => {
    res.send(`Product ID: ${req.params.id} <br> Category: ${req.query.category}`)
})

app.use('/', (req, res) => {
    res.status(404)
    res.send('<h1> 404 Not Found! </h1>')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})