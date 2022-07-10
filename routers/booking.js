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
            successfulChangingStatus: req.flash('successfulChangingStatus'),
            unSuccessfulChangingStatus: req.flash('unSuccessfulChangingStatus'),
            successfulChangingDate: req.flash('successfulChangingDate'),
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

bookingRouter.get('/cancel/:bookingId', userMiddleware.checkSession, async (req,res, next) => {
    try {
        const booking = await BookingRecord.getOneById(req.params['bookingId']);
        const tets = await BookingRecord.getOneByIdAndChangeStatus(req.params['bookingId'],'canceled')
        req.flash('successfulChangingStatus', 'Status was changed.')
        return res.redirect('/booking');
} catch(e) {
    req.flash('unSuccesfulChangingStatus', 'Something is wrong, try again later. Propably this id is incorrect.')
}
  //@TODO: Dokończyć endpoint zmiany statusu
})

bookingRouter.get('/status/:bookingId', userMiddleware.checkSession, async (req,res, next) => {
    const tets = await BookingRecord.getOneByIdAndChangeStatus(req.params['bookingId'],  )
  //@TODO: Dokończyć endpoint zmiany statusu
})

bookingRouter.get('/profile/:bookingId', userMiddleware.checkSession, async (req, res, next) => {
    const userResponse = await UserRecord.getOneById(req.session.user.id);
    const user = userResponse[0];
    const bookingResponse = await BookingRecord.getOneById(req.params['bookingId']);
    const booking = bookingResponse[0];
    res.render('booking/profile', {
        booking,
        user,
        message: {
            successCreatedBooking: req.flash('successCreatedBooking'),
            successfulChangingStatus: req.flash('successfulChangingStatus'),
            unSuccessfulChangingStatus: req.flash('unSuccessfulChangingStatus'),
            successfulChangingDate: req.flash('successfulChangingDate'),
            unSuccesfulChangingDate: req.flash('unSuccesfulChangingDate'),
        }
    });
})

bookingRouter.get('/:userId/booking/list', userMiddleware.checkSession, userMiddleware.checkUserIsStaff, async (req, res, next) => {
    const userResponse = await UserRecord.getOneById(req.session.user.id);
    const user = userResponse[0];
    const bookingList = await BookingRecord.getAllAssignedToUserId(req.params['userId']);
    // console.log(bookingResponse)
    // console.log(`--------------------`)
    // console.log(bookingList)
    res.render('staff/booking/list', {
        user,
        bookingList,
    })
})

bookingRouter.post('/changeDate/:bookingId', userMiddleware.checkSession, userMiddleware.checkUserIsStaff, async (req, res, next) => {
        const date = new Date();
        let myDate = (date.getUTCFullYear()) + "-" + "0" + (date.getMonth() + 1) + "-" + "0" + (date.getUTCDate());
        let currentDate = myDate;

        if(req.body.date <= currentDate) {
            req.flash('unSuccesfulChangingDate', `You can not change the date to something older than today. `)
        
            return res.redirect(`/booking/profile/${req.params['bookingId']}`);  
        }

    try {
        await BookingRecord.getOneByIdAndChangeDate(req.params['bookingId'], req.body.date);
        req.flash('successfulChangingDate', 'Date was changed to')
        return res.redirect(`/booking/profile/${req.params['bookingId']}`);
} catch(e) {
    req.flash('unSuccesfulChangingStatus', 'Something is wrong, try again later. Propably this id is incorrect.')
}
})

module.exports = {
    bookingRouter,
};
