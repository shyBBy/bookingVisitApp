const {Router} = require('express');
const bcrypt = require("bcrypt");
const bookingRouter = Router();
const userMiddleware = require("../middleware/user.middleware");

bookingRouter.get('/', userMiddleware.checkSession, async (req, res, next) => {
    res.render('booking/main');
})

module.exports = {
    bookingRouter,
};
