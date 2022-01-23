require('dotenv').config();
const {Router} = require('express');
const {UserRecord} = require("../records/user.record");
const userMiddleware = require('../middleware/user.middleware');
const {URLSearchParams} = require('url');
const bcrypt = require("bcrypt");
const userRouter = Router();

userRouter
    .get('/', (req, res) => {
        res.redirect('/user/login')
    });

userRouter.get('/login', (req, res) => {
    res.render('user/login');
});

userRouter.get('/profile/:id',userMiddleware.checkSession, async (req, res, next) => {
    if (typeof req.url.split('/')[2] === "string") {
        const results = await UserRecord.getOneById(req.url.split('/')[2]);
        const user = results[0]
        res.render('user/profile', {
            user,
        });
    }
    const results = await UserRecord.getOneById(req.session.user.id);
    const user = results[0]
    res.render('user/profile', {
        user,
    });
});


userRouter.get('/register', (req, res) => {
    res.render('user/register');
});

userRouter.post('/add', async  (req, res) => {
    const newUser = new UserRecord(req.body);
    const hash = await bcrypt.hash(req.body.password, 10);
    await newUser.insert(hash);
    res.redirect('/user/login');

});

userRouter.post('/login',  async (req, res,) => {
    if (req.body.email.length <= 0 || req.body.password.length <= 0) {
        console.log('Fields are empty');
        return res.redirect('/user/login');
    }
    const results = await UserRecord.getOneByEmail(req.body.email);
    const user = results[0];
    const check = await bcrypt.compare(req.body.password, results[0].password);
    if (check) {
        req.session.user = {
            id: user.id,
            isAdmin: user.admin,
        }
        console.log('Succes');
        console.log(req.session);
        console.log('S321321s');
        console.log(req.session.user);
        res.redirect('/dashboard');
    } else {
        console.log('Wrong password or e-mail');
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

userRouter.get('/list', userMiddleware.checkSession, async (req, res, next) => {
    const results = await UserRecord.getOneById(req.session.user.id);
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
