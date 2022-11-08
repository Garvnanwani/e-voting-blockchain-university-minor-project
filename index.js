const express = require('express')
const app = express()
const ejs = require('ejs')
const session = require('express-session')
const dotenv = require('dotenv')
dotenv.config()

app.use(express.json({}))
app.use(express.urlencoded())

// fetching table
const path = require('path')
app.set('views', path.join(__dirname, '/src/views'))
app.set('view engine', 'ejs')

app.use(express.static('src'))

// web-portion --------------------------------->
app.use(
    session({
        secret: '123456cat',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 * 300 },
    })
)

const registrationRouter = require('./routes/registration-route')
const loginRouter = require('./routes/login-route')
const dashboardRouter = require('./routes/dashboard-route')
const logoutRouter = require('./routes/logout-route')
const RegisterRouter = require('./routes/main')
const AdminLogin = require('./routes/admin_login')
const Tableview = require('./routes/table_view')

app.use('/', registrationRouter)
app.use('/', loginRouter)
app.use('/', dashboardRouter)
app.use('/', logoutRouter)
app.use('/', RegisterRouter)
app.use('/', AdminLogin)
app.use('/', Tableview)

app.get('/vote_area', function (req, res) {
    res.sendFile(__dirname + '/src/vote_area.html')
})

app.get('/candidateDetails', function (req, res) {
    res.sendFile(__dirname + '/src/adminCandidateDetails.html')
})

app.get('/userInfo', function (req, res) {
    res.sendFile(__dirname + '/src/userInfo.html')
})

app.get('/result', function (req, res) {
    res.sendFile(__dirname + '/src/result.html')
})

app.get('/addCandidate', function (req, res) {
    res.sendFile(__dirname + '/src/adminAddCandidate.html')
})

app.get('/changePhase', function (req, res) {
    res.sendFile(__dirname + '/src/adminChangePhase.html')
})

app.get('/voting', function (req, res) {
    res.sendFile(__dirname + '/src/voting.html')
})

app.get('/hello', function (req, res) {
    res.send('hello')
})

module.exports = {
    server: {
        baseDir: ['./src', './build/contracts'],
        routes: {
            '/node_modules': 'node_modules',
        },
        middleware: {
            1: app,
        },
    },
    port: 3000,
}
