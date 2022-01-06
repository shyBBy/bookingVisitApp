require('dotenv').config();
const cookieSession = require('cookie-session')
const express = require('express');
const exphbs = require('express-handlebars');
const {urlencoded} = require("express");
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const {pool} = require('./utils/db');
const {handleError} = require("./utils/errors");
const session = require('express-session');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {UserRecord} = require("./records/user.record");
// const {BookingRecord} = require("./records/booking.record");
const {placeRouter} = require('./routers/place');
const {userRouter} = require('./routers/user');
const {dashboardRouter} = require("./routers/dashboard");
const {sessionChecker} = require("./middleware/sessionChecker");



const app = express();
const hbs = exphbs.create({
    extname: '.hbs'
});

app.use(express.urlencoded({
    extended: true,
}));


app.use(methodOverride('_method'));

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');


app.use(cookieSession({
    name: 'session',
    keys: ['process.env.COOKIE_SESSION_SECRET'],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
// app.use(session({
//     secret: process.env.COOKIE_SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
// }))

app.get('/', sessionChecker, (req, res) => {
    res.redirect('/dashboard')
    });


// app.get('/test', async (req, res) => {
//     const saltRounds = 10;
//     const pwd = 'dupa2123';
//     const pwd2 = 'dupa2123';
//     const hash = await bcrypt.hash(pwd, saltRounds);
//     console.log(hash);
//     const result = await bcrypt.compare(pwd2, hash);
//     console.log(result);
// })

// app.all('/', (req, res) => {
//     if (req.cookies['logged'] === 'false') {
//         res.redirect('/login')
//     } else {
//         res.redirect('/dashboard')
//     }
// })

app.use('/place', placeRouter);
app.use('/user', userRouter);
app.use('/dashboard', dashboardRouter);



app.use(handleError);

app.listen(3000, 'localhost', () => {
    console.log('App started http://localhost:3000')
});