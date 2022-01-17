const {Router} = require('express');
const dashboardRouter = Router();
const {UserRecord} = require("../records/user.record");

dashboardRouter.get('/', async(req, res, next) => {
    const userData = {
        name: 'test',
    };
    res.render('dashboard/main', {
        userData,
    });
});


module.exports = {
    dashboardRouter,
};
