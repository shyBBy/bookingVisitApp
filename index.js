const express = require('express');
const exphbs = require('express-handlebars');
const {urlencoded} = require("express");
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const {pool} = require('./utils/db');
const {handleError} = require("./utils/errors");
const {UserRecord} = require("./records/user.record");
// const {BookingRecord} = require("./records/booking.record");
const {placeRouter} = require('./routers/place');
const {userRouter} = require('./routers/user');


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

// (async() => {
//     const firstUser = new UserRecord({
//         name: 'Dawid',
//         surname: 'Kolczak',
//         email: 'dawolc@gmail.com',
//     });
//     await firstUser.create();
//     console.log(firstUser);
//
//     await pool.end();
// })();

app.get('/', (req, res) => {
    res.redirect('/user')
    });


app.use('/place', placeRouter);
app.use('/user', userRouter);

app.use(handleError);

app.listen(3000, 'localhost', () => {
    console.log('App started http://localhost:3000')
});