const {Router} = require('express');
const {UserRecord} = require("../records/user.record");
const {Validation} = require("../middleware/validation");
const bcrypt = require("bcrypt");
const userRouter = Router();
const flash = require('connect-flash');

userRouter
    .get('/', (req, res) => {
        res.redirect('/user/login')
    });

userRouter.get('/login', (req, res) => {
    if (req.session.login) {
        res.redirect('/dashboard');
    }
    res.render('user/login', {
        message: req.flash('message')
    });
});

userRouter.get('/:id', async (req, res) => {
    if (!req.session.login) {
        res.redirect('/user/login');
    }
    const data = await UserRecord.getOne(req.session.userId);
    const userData = data[0]
    res.render('user/profile', {
        userData,
    });
})


userRouter.get('/register', (req, res) => {
    if (req.session.login) {
        res.redirect('/dashboard');
    }
    res.render('user/register');
});

userRouter.post('/add', async  (req, res, next) => {
    const newUser = new UserRecord(req.body);
    const hash = await bcrypt.hash(req.body.password, 10);
    await newUser.insert(hash);
    res.redirect('/user/login');

});

userRouter.post('/login', async (req, res, next) => {
    const userData = new Validation(req.body);
    const validPassword = await userData.loginCheck(req.body.email);
    const userId = validPassword[1];
    if (validPassword[0]) {
        req.session.login = 1;
        req.session.userId = userId;
        res.status(200)
        req.flash('message', 'Login Succes');
        res.redirect('/dashboard');
        console.log(req.session.login);
        console.log(`z users.js ${req.session.userId}`);

    } else{
        res.status(400)
        req.flash('message', 'Wrong e-mail or password');
        res.redirect('/user/login');
    }

});

userRouter.get('/logout', (req, res) => {
    if (req.session.login) {
        req.session.login = null
        res.redirect('/user/login');
    }
})

module.exports = {
    userRouter,
};
