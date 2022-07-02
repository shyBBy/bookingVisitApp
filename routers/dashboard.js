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
    const userBookingTotalCount = userBookingList.length
    const userBookingActiveCount = activeVisits(userBookingList);
    const userBookingPendingCount = pendingVisits(userBookingList);
    const userBookingEndedCount = endedVisits(userBookingList);
    console.log(typeof activeVisits(userBookingList));

    const results = await UserRecord.getOneById(req.session.user.id);
    const user = results[0]
    const isAdminLoggedUser = req.session.user.isAdmin;
    // console.log(isAdminLoggedUser)
    res.render('dashboard/main', {
        user,
        isAdminLoggedUser,
        userBookingTotalCount,
        userBookingActiveCount,
        userBookingPendingCount,
        userBookingEndedCount,
        message: {
            unauthorisedAccess: req.flash('unauthorisedAccess'),
            emptyUserBookingList: req.flash('emptyUserBookingList'),
        }
    });
});


module.exports = {
    dashboardRouter,
};
