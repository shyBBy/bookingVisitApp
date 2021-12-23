const express = require('express');
const exphbs = require('express-handlebars');
const {urlencoded} = require("express");
const methodOverride = require('method-override');
const {pool} = require('./utils/db');
const {UserRecord} = require("./records/user.record");
const {handleError} = require("./utils/errors");
// const {BookingRecord} = require("./records/booking.record");


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
    res.redirect('/user');
})

app.get('/user', (req, res) => {
    res.render('user/login');
})

app.use(handleError);

app.listen(3000, 'localhost', () => {
    console.log('App started http://localhost:3000')
});