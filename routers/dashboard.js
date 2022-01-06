const {Router} = require('express');
const {UserRecord} = require("../records/user.record");
const {sessionChecker} = require("../middleware/sessionChecker");

const dashboardRouter = Router();




dashboardRouter.get('/', sessionChecker, (req, res, next) => {
    // if (req.session.login === null) {
    //     res.redirect('user/register');
    // } else {
    //     res.redirect('user/login');
    // }
    res.render('dashboard/main', {

    });
});


module.exports = {
    dashboardRouter,
};
