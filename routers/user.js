require('dotenv').config();
const {Router} = require('express');
const {UserRecord} = require("../records/user.record");
const userMiddleware = require('../middleware/user.middleware');
const {URLSearchParams} = require('url');
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const fs = require('fs')
const path = require('path')
const mailContent = fs.readFileSync(path.resolve(__dirname, '../utils/mailContent.html'), 'utf8')
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
        }
    });
});

userRouter.get('/profile/:id',userMiddleware.checkSession, async (req, res, next) => {
    //dodac weryfikacje poprawnego ID i obsługe błedu jesli nie znajdzie uzytkownika o takim ID
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
    req.flash('successRegister', 'Account was created. Please confirm your e-mail.');
    res.redirect('/user/login');

});

userRouter.post('/login',  async (req, res,) => {
    if (req.body.email.length <= 0 || req.body.password.length <= 0) {
        req.flash('emptyField', 'Please insert the requested information.');
        return res.redirect('/user/login');
    }
    const activationCode = crypto.randomBytes(32).toString("hex")
    const results = await UserRecord.getOneByEmail(req.body.email, activationCode);
    const user = results[0];
    try {
        const check = await bcrypt.compare(req.body.password, results[0].password);
        if (check) {
            if (user.active === 'false') {
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
                    html: `<!DOCTYPE html>
<html>

<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
        @media screen {
            @font-face {
                font-family: 'Lato';
                font-style: normal;
                font-weight: 400;
                src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
            }

            @font-face {
                font-family: 'Lato';
                font-style: normal;
                font-weight: 700;
                src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
            }

            @font-face {
                font-family: 'Lato';
                font-style: italic;
                font-weight: 400;
                src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
            }

            @font-face {
                font-family: 'Lato';
                font-style: italic;
                font-weight: 700;
                src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
            }
        }

        /* CLIENT-SPECIFIC STYLES */
        body,
        table,
        td,
        a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table,
        td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            -ms-interpolation-mode: bicubic;
        }

        /* RESET STYLES */
        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }

        table {
            border-collapse: collapse !important;
        }

        body {
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
        }

        /* iOS BLUE LINKS */
        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        /* MOBILE STYLES */
        @media screen and (max-width:600px) {
            h1 {
                font-size: 32px !important;
                line-height: 32px !important;
            }
        }

        /* ANDROID CENTER FIX */
        div[style*="margin: 16px 0;"] {
            margin: 0 !important;
        }
    </style>
</head>

<body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
<!-- HIDDEN PREHEADER TEXT -->
<div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <!-- LOGO -->
    <tr>
        <td bgcolor="#FFA73B" align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                    <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                    <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                        <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                    <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                        <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p>
                    </td>
                </tr>
                <br>
                <br>
                <br>
                <tr>
                    <td bgcolor="#ffffff" align="left">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                    <table border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href="http://localhost:3000/user/${user.id}/activation/${activationCode}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">jesli odpalasz LOKALNIE to kliknij aby aktywowac konto</a></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#ffffff" align="left">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                    <table border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href="http://146.59.16.216:3000/user/${user.id}/activation/${activationCode}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">jesli odpalasz na VPS to kliknij aby aktywowac konto</a></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr><!-- COPY -->
                <tr>
                    <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                        <p style="margin: 0;">If that doesn't work, just send me a message https://github.com/shyBBy </p>
                    </td>
                </tr> <!-- COPY -->
           
                <tr>
                    <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                        <p style="margin: 0;">bookingVisitApp<br>Dawid Olczak</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>

</html>`,
                };
                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('OK, send');
                    };
                })
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

module.exports = {
    userRouter,
};
