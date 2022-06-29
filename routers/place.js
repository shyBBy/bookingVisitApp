const {Router} = require('express');
const {PlaceRecord} = require("../records/place.record");
const {UserRecord} = require("../records/user.record");
const userMiddleware = require("../middleware/user.middleware");
const placeRouter = Router();

placeRouter
    .get('/list', userMiddleware.checkSession, async (req, res) => {
        const results = await UserRecord.getOneById(req.session.user.id);
        const user = results[0]
        const usersList = await UserRecord.listAll();
        const placesList = await PlaceRecord.listAll();
        res.render('places/list', {
            placesList,
            usersList,
            user,
            message: {
                unSuccessfulPlaceId: req.flash('unSuccessfulPlaceId'),
            }
        });
    });

placeRouter.post('/add', userMiddleware.checkUserIsAdmin,  async (req, res) => {
    const newPlace = new PlaceRecord(req.body);
    await newPlace.insert();
    res.redirect('/place/list');
})

placeRouter.get('/profile/:placeId', userMiddleware.checkSession, async (req, res) => {
    const users = await UserRecord.getOneById(req.session.user.id);
    const user = users[0];
    const places = await PlaceRecord.getOneById(req.params['placeId']);
    const place = places[0];
    console.log(place)
    const assignedStaffs = await PlaceRecord.getAssignedStaffToThisPlace(req.params['placeId']);
    const assignedStaff = assignedStaffs[0]
    if(!place) {
        req.flash('unSuccessfulPlaceId', `Something wrong, place with this ID: ${req.params['placeId']}  never exist`);
        res.redirect('/place/list');
    } else {
        res.render('places/profile', {
            user,
            place,
            assignedStaff,
        })
    }

});

module.exports = {
    placeRouter,
};
