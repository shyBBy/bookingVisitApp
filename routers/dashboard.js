const {Router} = require('express');
const dashboardRouter = Router();
const {UserRecord} = require("../records/user.record");
const userMiddleware = require("../middleware/user.middleware");
const {BookingRecord} = require("../records/booking.record");
const {active, activeVisits, pendingVisits, endedVisits} = require("../utils/countUserVisits");

dashboardRouter.get('/', userMiddleware.checkSession, async(req, res, next) => {
    const userBookingList = await BookingRecord.getAllByUserId(req.session.user.id);
    if (typeof userBookingList === 'undefined'){
        req.flash('emptyUserBookingList',`You dont have any visit.`)
    }
    const pendingsBookings = [];
    const activesBookings = [];
    const endedBookings = [];

    for (let i = 0; i < userBookingList.length; i++){
        if (userBookingList[i].status === 'pending'){
          pendingsBookings.push('pending')
        } else if(userBookingList[i].status === 'active'){
          activesBookings.push('active')
        } else if(userBookingList[i].status === 'enden'){
            endedBookings.push('ended');
        } 
      }

    const pendingsBookingsCount = pendingsBookings.length
    const activesBookingsCount = activesBookings.length
    const endedBookingsCount = endedBookings.length
    const allBookingsCount = userBookingList.length
    const results = await UserRecord.getOneById(req.session.user.id);
    const user = results[0]
    const isAdminLoggedUser = req.session.user.isAdmin;
    console.log(pendingsBookingsCount)
    // console.log(isAdminLoggedUser)
    res.render('dashboard/main', {
        user,
        isAdminLoggedUser,
        endedBookingsCount,
        activesBookingsCount,
        pendingsBookingsCount,
        allBookingsCount,
        message: {
            unauthorisedAccess: req.flash('unauthorisedAccess'),
            emptyUserBookingList: req.flash('emptyUserBookingList'),
        }
    });
});


module.exports = {
    dashboardRouter,
};
