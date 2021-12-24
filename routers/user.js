const {Router} = require('express');
const {UserRecord} = require("../records/user.record");

const userRouter = Router();


userRouter
    .get('/', (req, res) => {
        res

            .cookie('logged', 'false', {
            maxAge: 24 * 60 * 60 * 1000, // 24h
            httpOnly: true,
        });
        res.render('user/register')
        const ciastko = req.cookies['logged'];
        console.log(ciastko)

        if (req.cookies['logged'] === 'false') {
            res.redirect('/login')
        }
    });

userRouter.get('/login', (req, res) => {
    res.render('user/login');
});


module.exports = {
    userRouter,
};
