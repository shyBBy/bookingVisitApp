const {Router} = require('express');
const {PlaceRecord} = require("../records/place.record");
const placeRouter = Router();

placeRouter
    .get('/list',  async (req, res) => {
        if (!req.session.login) {
            res.redirect('/user/login');
            console.log(req.session.login);
        }
        const placesList = await PlaceRecord.listAll();
        console.log(placesList);
        res.render('places/list', {
            placesList,
            number: 1,
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