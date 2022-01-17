require('dotenv').config();
const {Router} = require('express');
const {UserRecord} = require("../records/user.record");
const bcrypt = require("bcrypt");
const userRouter = Router();

userRouter
    .get('/', (req, res) => {
        res.redirect('/user/login')
    });

userRouter.get('/login', (req, res) => {
    res.render('user/login');
});

userRouter.get('/:id', async (req, res) => {
    const data = await UserRecord.getOne(req.session.userId);
    const userData = data[0]
    res.render('user/profile', {
        userData,
    });
})


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
        console.log('Succes');
        res.redirect('/dashboard');
    } else {
        console.log('Wrong password or e-mail');
        return res.redirect('/user/login');
    }
});

userRouter.get('/logout', (req, res) => {
    // if (req.session.login) {
    //     req.session.login = null
    //     req.session.userId = null
    //     res.redirect('/user/login');
    // }
})

module.exports = {
    userRouter,
};
