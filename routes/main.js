var express = require('express')
var router = express.Router()
var conn = require('../database')

router.get('/form', function (req, res, next) {
    if (req.session.loggedinUser) {
        res.render('voter-registration.ejs')
    } else {
        res.redirect('/login')
    }
})

var getAge = require('get-age')

var nodemailer = require('nodemailer')
var rand = Math.floor(Math.random() * 10000 + 54)
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rahulvarshney8816@gmail.com',
        pass: 'opfcycdqubbrngnn',
    },
})

var account_address
var data

router.post('/registerdata', function (req, res) {
    var dob = []
    data = req.body.aadharno
    console.log(data)
    account_address = req.body.account_address
    let sql = 'SELECT * FROM aadhar_info WHERE Aadharno = ?'
    try {
        conn.query(sql, data, (error, results, fields) => {
            if (error) {
                return console.error(error.message)
            }
            if (results.length > 0) {
                dob = results[0].Dob
                var email = results[0].Email
                var age = 2022 - dob.slice(6);
                is_registerd = results[0].is_registerd
                if (is_registerd != 'YES') {
                    if (age >= 18) {
                        var mailOptions = {
                            from: 'eblockchain@gmail.com',
                            to: email,
                            subject: 'Please confirm your Email account',
                            text: 'Hello, Your otp is ' + rand,
                        }
                        transporter.sendMail(
                            mailOptions,
                            function (error, info) {
                                if (error) {
                                    console.log(error)
                                } else {
                                    console.log('Email sent: ' + info.response)
                                }
                            }
                        )
                        res.render('emailverify.ejs')
                    } else {
                        res.send('You cannot vote as your age is less than 18')
                    }
                } else {
                    res.render('voter-registration.ejs', {
                        alertMsg:
                            'You are already registered. You cannot register again',
                    })
                }
            } else {
                res.render('voter-registration.ejs', {
                    alertMsg:
                        "Couldn't find your aadhar number. Please enter a valid aadhar number",
                })
            }
        })
    } catch (err) {
        console.log(err)
    }
})

router.post('/otpverify', (req, res) => {
    var otp = req.body.otp
    if (otp == rand) {
        var record = { Account_address: account_address, Is_registered: 'Yes' }
        var sql = 'INSERT INTO registered_users SET ?'
        conn.query(sql, record, function (err, res2) {
            if (err) {
                console.log(err)
            } else {
                var sql1 =
                    'Update aadhar_info set Is_registerd=? Where Aadharno=?'
                var record1 = ['YES', data]
                conn.query(sql1, record1, function (err1, res1) {
                    if (err1) {
                        res.render('voter-registration.ejs')
                    } else {
                        var msg = 'You are successfully registered'
                        res.render('voter-registration.ejs', { alertMsg: msg })
                    }
                })
            }
        })
    } else {
        res.render('voter-registration.ejs', {
            alertMsg: 'Session Expired! , You have entered wrong OTP ',
        })
    }
})

module.exports = router
