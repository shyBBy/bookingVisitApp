require('dotenv').config();
const cookieSession = require('cookie-session')
const express = require('express');
const exphbs = require('express-handlebars');
const {urlencoded} = require("express");
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const flash = require('connect-flash');
const cors = require('cors');
// ******* UTILS *******
const {handleError} = require("./utils/errors");
// ******* ROUTERS *******
const {placeRouter} = require('./routers/place');
const {userRouter} = require('./routers/user');
const {dashboardRouter} = require("./routers/dashboard");
// ******* MIDDLEWARES *******
const {sessionChecker} = require("./middleware/sessionChecker");
// ******* EXPRESS CFG *******
const app = express();
const hbs = exphbs.create({
    extname: '.hbs'
});
// ******* APP.USE *******
app.use(flash());
app.use(express.urlencoded({
    extended: true,
}));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.use(cors());
app.use(cookieSession({
    name: 'session',
    keys: ['process.env.COOKIE_SESSION_SECRET'],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use('/place', placeRouter);
app.use('/user', userRouter);
app.use('/dashboard', dashboardRouter);
// app.use(handleError);
// app.use(session({
//     secret: 'process.env.EXPRESS_SESSION_SECRET',
//     cookie: { maxAge : 60000},
//     resave: false,
//     saveUninitialized: false,
// }))



app.get('/', (req, res) => {
    res.redirect('/dashboard')
});

app.listen(3000, 'localhost', () => {
    console.log('App started http://localhost:3000')
});