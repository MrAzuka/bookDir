require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const flash = require('express-flash')
const { PORT, SESSION_SECRET_KEY } = process.env
const { connectDB } = require('./DB/connectDB')
const authRoutes = require('./routes/authRoutes')
const profileRoutes = require('./routes/profileRoutes')
const homeRoutes = require('./routes/homeRoutes')
const { store } = require('./sessions/sessionsConfig')


const app = express()

// Database Connection
connectDB()


// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(flash())
// NOTE: Always put session before passport.session
app.use(session({
    secret: SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: store
}))
app.use(methodOveride('_method'))


// Routes
app.use('/auth', authRoutes)
app.use(homeRoutes)
app.use(profileRoutes)


app.listen(PORT, () => {
    console.log('Server running on PORT 8000')
})