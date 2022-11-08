var express = require('express')
var router = express.Router()

router.get('/dashboard', function (req, res, next) {
    if (req.session.loggedinUser) {
        res.render('dashboard.ejs', { email: req.session.emailAddress })
    } else {
        res.redirect('/login')
    }
})

module.exports = router
