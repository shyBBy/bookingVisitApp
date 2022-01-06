const {Router} = require('express');
const {PlaceRecord} = require("../records/place.record");
const {sessionChecker} = require("../middleware/sessionChecker");

const placeRouter = Router();

placeRouter
    .get('/list', sessionChecker,  async (req, res) => {
        const placesList = await PlaceRecord.listAll();
        console.log(placesList);
        res.render('places/list', {
            placesList,
            number: 1,
        });
    });

placeRouter.post('/add', sessionChecker, async (req, res) => {
    const newPlace = new PlaceRecord(req.body);
    await newPlace.insert();
    res.redirect('/place/list');
})

module.exports = {
    placeRouter,
};