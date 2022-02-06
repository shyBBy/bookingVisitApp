require('dotenv').config();
const {Router} = require('express');
const {UserRecord} = require("../records/user.record");
const userMiddleware = require('../middleware/user.middleware');
const {URLSearchParams} = require('url');
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const {UsersService} = require('../services/handleEmailVerification');
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
            successVerify: req.flash('successVerify'),
            unsuccessfulVerify: req.flash('unsuccessfulVerify'),
            successRegister: req.flash('successRegister'),
        }
    });
});

userRouter.get('/profile/:id',userMiddleware.checkSession, async (req, res, next) => {
  try {
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
  } catch(err) {
    console.log('users not found')
  }
  
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
    const activationCode = crypto.randomBytes(32).toString("hex")
    await newUser.create(hash, activationCode);
    const results = await UserRecord.getOneByEmail(req.body.email);
    const user = results[0];
    UsersService.handleEmailVerification(req.body.email, user.id, activationCode);
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
        console.log(e);
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
        message: {
            successfullUserRemoved: req.flash('successfullUserRemoved'),
            unSuccessfullUserRemoved: req.flash('unSuccessfullUserRemoved'),
            successfullUserActivated: req.flash('successfullUserActivated'),
            unSuccessfullUserActivated: req.flash('unSuccessfullUserActivated'),

        },

    });
})

userRouter.get('/:id/activation/:code', async (req,res,next) => {
    if (typeof req.url.split('/')[1] === "string") {
        try {
            const results = await UserRecord.getOneById(req.url.split('/')[1]);
            const user = results[0]
            if ( user.id === req.url.split('/')[1] || user.activation_code === req.url.split('/')[3]) {
                UserRecord.getOneByIdAndActivating(user.id)
                req.flash('successVerify', 'Account was activated, please log in.');
                return res.redirect('/user/login')
            } else {
                req.flash('unsuccessfulVerify', 'Something wrong, account is still unactive, please check your e-mail box.');
                return res.redirect('/user/login')
            }
        } catch (e) {
            console.log('nie ma takiego uzytkownika')
            req.flash('unsuccessfulVerify', 'Something wrong, account is still unactive, please check your e-mail box.');
            return res.redirect('/user/login')

        }


    }
})


userRouter.get('/remove/:id', async (req, res, next) => {
  const userId = req.url.split('/')[2];
  try {
    if (typeof userId === "string") {
        UserRecord.remove(userId);
        req.flash('successfullUserRemoved', `User was successful removed from database.`);
        return res.redirect('/user/list');
    }
    
  } catch(err) {
    req.flash('unSuccessfullUserRemoved', `User not found, something wrong.`);
    console.log('user not found')
  }
  
})

userRouter.get('/activate/:id', async (req, res, next) => {
    const userId = req.url.split('/')[2];
    try {
        if (typeof userId === "string") {
            UserRecord.activate(userId);
            req.flash('successfullUserActivated', `User was successful activated.`);
            return res.redirect('/user/list');
        }

    } catch(err) {
        req.flash('unSuccessfullUserActivated', `User not found, something wrong.`);
        console.log('user not found')
    }

})

module.exports = {
    userRouter,
};
