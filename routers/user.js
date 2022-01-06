const {Router} = require('express');
const {UserRecord} = require("../records/user.record");
const {PlaceRecord} = require("../records/place.record");
const {Validation} = require("../middleware/validation");
const bcrypt = require("bcrypt");
const session = require('express-session');
const {sessionChecker} = require("../middleware/sessionChecker");

const userRouter = Router();

userRouter
    .get('/', sessionChecker, (req, res) => {
        res.render('user/register')
    });



userRouter.get('/login', sessionChecker, (req, res) => {
    res.render('user/login');
});


userRouter.get('/register', sessionChecker, (req, res) => {
    res.render('user/register');
});

userRouter.post('/add', sessionChecker, async  (req, res, next) => {
    const newUser = new UserRecord(req.body);
    const hash = await bcrypt.hash(req.body.password, 10);
    await newUser.insert(hash);
    res.redirect('/user/login');

});

userRouter.post('/login', sessionChecker, async (req, res, next) => {
    const userData = new Validation(req.body);
    const validPassword = await userData.loginCheck(req.body.email);
    if (validPassword) {
        req.session.login = 1;
        // req.session.login = null
        res.status(200);
        res.redirect('/dashboard');
        console.log(req.session.login)

    } else{
        res.status(400);
    }

});

userRouter.get('/logout', sessionChecker, (req, res) => {
    if (req.session.login) {
        req.session.login = null
        res.redirect('/user/login');
    }
})

module.exports = {
    userRouter,
};
