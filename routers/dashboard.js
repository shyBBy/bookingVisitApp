const {Router} = require('express');
const {UserRecord} = require("../records/user.record");

const dashboardRouter = Router();


dashboardRouter.get('/', (req, res) => {
    res.render('dashboard/main');
});


module.exports = {
    dashboardRouter,
};
