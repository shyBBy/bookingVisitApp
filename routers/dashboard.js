const {Router} = require('express');
const dashboardRouter = Router();
const {UserRecord} = require("../records/user.record");
const userMiddleware = require("../middleware/user.middleware");

dashboardRouter.get('/', userMiddleware.checkSession, async(req, res, next) => {
    req.flash('message', 'Test flash')
    const results = await UserRecord.getOneById(req.session.user.id);
    const user = results[0]
    res.render('dashboard/main', {
        user,
        message: req.flash('message'),
    });
});


module.exports = {
    dashboardRouter,
};
