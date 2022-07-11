const {Router} = require('express');
const {PlaceRecord} = require("../records/place.record");
const {UserRecord} = require("../records/user.record");
const userMiddleware = require("../middleware/user.middleware");
const {StaffRecord} = require("../records/staff.record");
const staffRouter = Router();

staffRouter.get('/list', userMiddleware.checkSession, userMiddleware.checkUserIsAdmin, async (req, res) => {
    const loggedUserResults = await UserRecord.getOneById(req.session.user.id);
    const user = loggedUserResults[0]
   const staffList = await StaffRecord.listAll();
   const placesList = await PlaceRecord.listAll();
    res.render('staff/list', {
    user,
    staffList,
    placesList,
})

})

staffRouter.get('/add/:userId/:placeId', userMiddleware.checkSession, userMiddleware.checkUserIsAdmin, async (req, res) => {
    const resultsLoggedUser = await UserRecord.getOneById(req.session.user.id);
    const userLogged = resultsLoggedUser[0];
    const resultsPlace = await PlaceRecord.getOneById(req.params['placeId']);
    const place = resultsPlace[0];
    const resultsUser = await UserRecord.getOneById(req.params['userId']);
    const user = resultsUser[0];
    res.render('staff/add', {
        userLogged,
        place,
        user,
    })
})

staffRouter.post('/create/:userId', userMiddleware.checkSession, userMiddleware.checkUserIsAdmin, async (req, res) => {
    if (req.body.title === 'Select title' || req.body.staffPhoneNumber === '' || req.body.staffPhoto === '' || req.body.placeId === 'Choose a place'){
        req.flash('emptyField', 'Please insert the requested information.');
        return res.redirect(`/user/profile/${req.params['userId']}`);
    }
    const newStaff = new StaffRecord(req.body);
    await newStaff.create(req.params['userId'])
    res.redirect('/staff/list');
} )



module.exports = {
    staffRouter,
};
