const {Router} = require('express');
const dashboardRouter = Router();
const {UserRecord} = require("../records/user.record");

dashboardRouter.get('/', async(req, res, next) => {
    if (!req.session.login) {
        res.redirect('/user/login');
        console.log(req.session.login);
    }
    const data = await UserRecord.getOne(req.session.userId);
    const userData = data[0]
    console.log(userData);
    res.render('dashboard/main', {
        userData,
    });
});


module.exports = {
    dashboardRouter,
};
