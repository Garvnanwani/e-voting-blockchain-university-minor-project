var express = require('express')

var router = express.Router()
var db = require('../database')
var app = express()
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))

router.get('/adlogin', function (req, res, next) {
    res.render('admin_login.ejs')
})

router.post('/adlogin', function (req, res) {
    var emailAddress = req.body.email_address
    var password = req.body.password

    if (emailAddress === 'garvwashere@gmail.com' && password === 'test@123') {
        req.session.loggedinUser = true
        req.session.emailAddress = emailAddress
        res.redirect('/addCandidate')
    } else {
        res.render('admin_login.ejs', {
            alertMsg: 'Your Email Address or password is wrong',
        })
    }
})

module.exports = router
