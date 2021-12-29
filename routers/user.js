const {Router} = require('express');
const {UserRecord} = require("../records/user.record");
const {PlaceRecord} = require("../records/place.record");

const userRouter = Router();


userRouter
    .get('/', (req, res) => {
        res.cookie('logged', 'false', {
            maxAge: 24 * 60 * 60 * 1000, // 24h
            httpOnly: true,
        });
        res.render('user/register')
        const ciastko = req.cookies['logged'];
        console.log(ciastko)

        if (req.cookies['logged'] === 'false') {
            res.redirect('/user/login')
        } else {
            res.redirect('/dashboard')
        }
    });



userRouter.get('/login', (req, res) => {
    res.render('user/login');
});


userRouter.get('/register', (req, res) => {
    res.render('user/register');
});

userRouter.post('/add', async (req, res) => {
    const newUser = new UserRecord(req.body);
    await newUser.insert();
    res.redirect('/user/login');

});

// userRouter.post('/login', async(req, res) => {
//     const dataFromLoginForm = new UserRecord(req.body);
//     await dataFromLoginForm.getUser();
//     res.cookie('logged', 'true', {
//         maxAge: 24 * 60 * 60 * 1000, // 24h
//         httpOnly: true,
//     });
//     res.redirect('/dashboard');
// });


module.exports = {
    userRouter,
};
