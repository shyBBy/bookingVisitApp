const {Router} = require('express');
const dashboardRouter = Router();
const {UserRecord} = require("../records/user.record");

dashboardRouter.get('/', (req, res, next) => {
    if (!req.session.login) {
        res.redirect('/user/login');
        console.log(req.session.login);
    }
    res.render('dashboard/main', {

    });
});


module.exports = {
    dashboardRouter,
};
