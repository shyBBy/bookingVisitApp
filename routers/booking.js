const {Router} = require('express');
const bcrypt = require("bcrypt");
const bookingRouter = Router();
const userMiddleware = require("../middleware/user.middleware");
const {BookingRecord} = require("../records/booking.record");
const {UserRecord} = require("../records/user.record");
const {PlaceRecord} = require("../records/place.record");

bookingRouter.get('/', userMiddleware.checkSession, async (req, res, next) => {
    const bookingList = await BookingRecord.getAllByUserId(req.session.user.id);
    const userResults = await UserRecord.getOneById(req.session.user.id);
    const user = userResults[0]
    const usersList = await UserRecord.listAll();
    res.render('booking/main', {
        usersList,
        user,
        bookingList,
        message: {
            successCreatedBooking: req.flash('successCreatedBooking'),
        }
    });
})


bookingRouter.post('/create/:placeId', userMiddleware.checkSession, async (req, res) => {
    const placeResponse = await PlaceRecord.getOneById(req.params['placeId']);
    const place = placeResponse[0];
    const newBooking = new BookingRecord(req.body);
    await newBooking.create(req.session.user.id, req.params['placeId'], place.name);
    req.flash('successCreatedBooking', `Booking was created, please wait for changing status.`)
    res.redirect('/booking');
});

bookingRouter.get('/profile/:bookingId'), userMiddleware.checkSession, async (req,res) =>{
  const userResponse = await UserRecord.getOneById(req.session.user.id);
    const user = userResponse[0];
    const bookingResponse = await BookingRecord.getOneById(req.params['bookingId']);
    const booking = bookingResponse[0];
    res.render('booking/profile', {
      booking,
      user,
    })
}

module.exports = {
    bookingRouter,
};
