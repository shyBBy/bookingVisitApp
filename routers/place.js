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
        });
    });

placeRouter.post('/add', async (req, res) => {
    const newPlace = new PlaceRecord(req.body);
    await newPlace.insert();
    res.redirect('/place/list');
})

module.exports = {
    placeRouter,
};