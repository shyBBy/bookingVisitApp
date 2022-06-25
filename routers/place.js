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

placeRouter.get('/profile', userMiddleware.checkSession, async (req, res) => {
    const users = await UserRecord.getOneById(req.session.user.id);
    const user = users[0];
    const places = await PlaceRecord.getOneById();
    const place = places[0];
    //@TODO: Utworzyc metode getOneById w placeRecord, pobrac i wyswietlic dane dane o danym miejscu xD
    res.render('places/profile', {
        user,
        place,
    })
});

module.exports = {
    placeRouter,
};
