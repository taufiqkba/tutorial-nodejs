const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { loadContact, findContact, addContact, checkDuplicate, deleteContact, updateContacts } = require('./utils/contacts')
const {body, check, validationResult} = require('express-validator')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const app = express()
const port = 3000

app.set('view engine', 'ejs') // use view engine EJS
app.set('layout', 'layouts/main-layout') // for include to all routes with main-layouts.ejs file
app.use(expressLayouts) // third-party middleware
app.use(express.static('public')) // built-in middleware
app.use(express.urlencoded({extended: true}))

// config flash message

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

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        
    })
})

app.get('/contact', (req, res) => {
    const contacts = loadContact()
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

// route to process post data
app.post('/contact', [
    body('name').custom((value) => {
        const duplicate = checkDuplicate(value)
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
        // return res.status(400).json({errors: errors.array()})
        res.render('add-contact', {
            title: 'Form Add New Contact',
            errors: errors.array()
        })
    }else{
        addContact(req.body)
        req.flash('message', 'New Contact sucessfully added!')
        res.redirect('/contact')
    }
})

// route to delete contact
app.get('/contact/delete/:name', (req, res) => {
    const contact = findContact(req.params.name)

    // if contact not found
    if (!contact) {
        res.status(404)
        res.send('404 Not Found!')
    }else{
        deleteContact(req.params.name)
        req.flash('message', 'Delete Contact sucessfully !')
        res.redirect('/contact')
    }
})

// route to edit data page
app.get('/contact/edit/:name', (req, res) => {
    const contact = findContact(req.params.name)
    res.render('edit-contact', {
        title: 'Form Update Contact',
        contact
    })
})

// route to process update data
app.post('/contact/update', [
    body('name').custom((value, { req }) => {
        const duplicate = checkDuplicate(value)
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
        // return res.status(400).json({errors: errors.array()})
        res.render('edit-contact', {
            title: 'Form Edit Contact',
            errors: errors.array(),
            contact: req.body
        })
    }else{
        updateContacts(req.body)
        req.flash('message', 'New Contact sucessfully update!')
        res.redirect('/contact')
    }
})



// route to detail contact
app.get('/contact/:name', (req, res) => {
    const contact = findContact(req.params.name)

    res.render('detail', {
        title: 'Detail Contact Page',
        contact
    })
})

app.use('/', (req, res) => {
    res.status(404)
    res.send('<h1> 404 Not Found! </h1>')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})