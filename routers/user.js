require('dotenv').config();
const {Router} = require('express');
const {UserRecord} = require("../records/user.record");
const userMiddleware = require('../middleware/user.middleware');
const {URLSearchParams} = require('url');
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const userRouter = Router();


userRouter
    .get('/', (req, res) => {
        res.redirect('/user/login')
    });

userRouter.get('/login', (req, res) => {
    res.render('user/login', {
        message: {
            emptyField: req.flash('emptyField'),
            successLogin: req.flash('successLogin'),
            inActiveAccount: req.flash('inActiveAccount'),
            wrongInformation: req.flash('wrongInformation'),
            userNotExist: req.flash('userNotExist'),
        }
    });
});

userRouter.get('/profile/:id',userMiddleware.checkSession, async (req, res, next) => {
    if (typeof req.url.split('/')[2] === "string") {
        const results = await UserRecord.getOneById(req.url.split('/')[2]);
        const user = results[0]
        res.render('user/profile', {
            user,
        });
        return
    }
    const results = await UserRecord.getOneById(req.session.user.id);
    const user = results[0]
    res.render('user/profile', {
        user,
    });
});


userRouter.get('/register', (req, res) => {
    res.render('user/register', {
        message: {
            emptyField: req.flash('emptyField'),
            successRegister: req.flash('successRegister')
        }
    });
});

userRouter.post('/add', async  (req, res) => {
    if (req.body.email.length <= 0 || req.body.password.length <= 0 || req.body.name.length <= 0 || req.body.surname.length <= 0){
        req.flash('emptyField', 'Please insert the requested information.');
        return res.redirect('/user/register');
    }
    const newUser = new UserRecord(req.body);
    const hash = await bcrypt.hash(req.body.password, 10);
    await newUser.insert(hash);
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    let mailOptions = {
        from: `verifymailfromapp@gmail.com`,
        to: req.body.email,
        subject: `Welcome, please confirm your e-mail`,
        html: `test html`,
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('OK, send');
        };
    })
    req.flash('successRegister', 'Account was created. Please confirm your e-mail.');
    res.redirect('/user/login');

});

userRouter.post('/login',  async (req, res,) => {
    if (req.body.email.length <= 0 || req.body.password.length <= 0) {
        req.flash('emptyField', 'Please insert the requested information.');
        return res.redirect('/user/login');
    }
    const results = await UserRecord.getOneByEmail(req.body.email);
    const user = results[0];
    try {
        const check = await bcrypt.compare(req.body.password, results[0].password);
        if (check) {
            if (user.active === 'false') {
                req.flash('inActiveAccount', 'Your account was not activated yet. Please check your e-mail box.');
                return res.redirect('/user/login');
            }
            req.session.user = {
                id: user.id,
                isAdmin: user.admin,
                isActive: user.active,
            }
            req.flash('successLogin', 'Success Login, welcome!');
            res.redirect('/dashboard');
        } else {
            req.flash('wrongInformation', 'Wrong password or e-mail');
            console.log('Wrong password or e-mail');
            return res.redirect('/user/login');
        }
    } catch(e){
        req.flash('userNotExist', 'The user does not exist');
        return res.redirect('/user/login');
    }
});


userRouter.get('/user/logout', async(req, res) => {
    req.session.destroy(function(err){
        if(err){
            console.log('Something wrong')
        } else {
            console.log('Succes LOGOUT');
           return res.redirect('/user/login')
        }
    })
})

userRouter.get('/list', userMiddleware.checkSession, userMiddleware.checkUserIsActive, async (req, res, next) => {
    const results = await UserRecord.getOneById(req.session.user.id);
    console.log(req.session.user.isActive);
    const user = results[0]
    const usersList = await UserRecord.listAll();
    res.render('user/list', {
        usersList,
        user,

    });
})

module.exports = {
    userRouter,
};
