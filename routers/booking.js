const {Router} = require('express');
const bcrypt = require("bcrypt");
const bookingRouter = Router();
const userMiddleware = require("../middleware/user.middleware");
const {BookingRecord} = require("../records/booking.record");

bookingRouter.get('/', userMiddleware.checkSession, async (req, res, next) => {
    res.render('booking/main');
})

bookingRouter.get('/list', userMiddleware.checkSession, async (req, res) => {
    const results = await BookingRecord.getAllByUserId(req.session.user.id);
    console.log(results)
})

bookingRouter.post('/create', userMiddleware.checkSession, async (req, res) => {
    const newBooking = new BookingRecord(req.body);
    await newBooking.create(req.session.user.id);
    req.flash('successCreatedBooking', `Booking was created, please wait for changing status.`)
    res.redirected('/booking/list');
});

module.exports = {
    bookingRouter,
};
