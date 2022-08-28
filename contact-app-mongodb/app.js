const express = require('express')
const expressLayouts = require('express-ejs-layouts')
require('./utils/db')

const {body, validationResult, check} = require('express-validator')
const Contact = require('./model/contact')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const methodOverride = require('method-override')

const app = express()
const port = 3000

// setup method override
app.use(methodOverride('_method'))

app.set('view engine', 'ejs') // use view engine EJS
app.set('layout', 'layouts/main-layout') // for include to all routes with main-layouts.ejs file
app.use(expressLayouts) // third-party middleware
app.use(express.static('public')) // built-in middleware
app.use(express.urlencoded({extended: true}))

app.use(cookieParser('secret'))
app.use(session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())


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

// route to about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
    })
})

// route contact page
app.get('/contact', async (req, res) => {
    const contacts = await Contact.find()
    res.render('contact', {
        title: 'Contact Page',
        contacts,
        message: req.flash('message')
    })
})

// route to add new contact page
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title: 'Form Add New Contact',

    })
})

// route to process add post data
app.post('/contact', [
    body('name').custom( async (value) => {
        const duplicate = await Contact.findOne({name: value})
        if (duplicate) {
            throw new Error('Contact name has been registered!')
        }
        return true
    }),
    check('email', 'Email is not valid!').isEmail(),
    check('phoneNumber', 'Phone Number not valid with ID format').isMobilePhone('id-ID')
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        res.render('add-contact', {
            title: 'Form Add New Contact',
            errors: errors.array()
        })
    }else{
        Contact.insertMany(req.body, (error, result) => {
            req.flash('message', 'New Contact sucessfully added!')
            res.redirect('/contact')
        })
    }
})

// route to delete contact
app.delete('/contact', (req, res) => {
    Contact.deleteOne({ name: req.body.name }).then((result) => {
        req.flash('message', 'Delete Contact sucessfully!')
        res.redirect('/contact')
    })
})

// route to edit data page
app.get('/contact/edit/:name', async (req, res) => {
    const contact = await Contact.findOne({ name: req.params.name })

    res.render('edit-contact', {
        title: 'Form Update Contact',
        contact
    })
})

// route to process update data
app.put('/contact', [
    body('name').custom( async (value, { req }) => {
        const duplicate = await Contact.findOne({name: value })
        if (value !== req.body.oldName && duplicate) {
            throw new Error('Contact name has been registered!')
        }
        return true
    }),
    check('email', 'Email is not valid!').isEmail(),
    check('phoneNumber', 'Phone Number not valid with ID format').isMobilePhone('id-ID')
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        res.render('edit-contact', {
            title: 'Form Edit Contact',
            errors: errors.array(),
            contact: req.body
        })
    }else{
        Contact.updateOne(
            { 
                _id: req.body._id 
            },
            { $set: {
                name: req.body.name,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber
            }}
            ).then((result) => {
                req.flash('message', 'New Contact sucessfully update!')
                res.redirect('/contact')
            })
    }
})


// route to detail a contact
app.get('/contact/:name', async (req, res) => {
    const contact = await Contact.findOne({name: req.params.name})

    res.render('detail', {
        title: 'Detail Contact Page',
        contact
    })
})

app.listen(port, () => {
    console.log(`Mongo Contact App || listening at port ${port}`)
})