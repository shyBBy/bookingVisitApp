const {Router} = require('express');
const bcrypt = require("bcrypt");
const bookingRouter = Router();
const userMiddleware = require("../middleware/user.middleware");
const {BookingRecord} = require("../records/booking.record");
const {UserRecord} = require("../records/user.record");

bookingRouter.get('/', userMiddleware.checkSession, async (req, res, next) => {
    const bookingResults = await BookingRecord.getAllByUserId(req.session.user.id);
    const booking = bookingResults[0]
    const userResults = await UserRecord.getOneById(req.session.user.id);
    const user = userResults[0]
    const usersList = await UserRecord.listAll();
    res.render('booking/main', {
        usersList,
        user,
        booking,
        message: {
            successCreatedBooking: req.flash('successCreatedBooking'),
        }
    });
})


bookingRouter.post('/create', userMiddleware.checkSession, async (req, res) => {
    const newBooking = new BookingRecord(req.body);
    await newBooking.create(req.session.user.id);
    req.flash('successCreatedBooking', `Booking was created, please wait for changing status.`)
    res.redirect('/booking');
});

module.exports = {
    bookingRouter,
};
