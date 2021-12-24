const {Router} = require('express');
const {PlaceRecord} = require("../records/place.record");

const placeRouter = Router();

placeRouter
    .get('/list',  async (req, res) => {
        const placesList = await PlaceRecord.listAll();
        console.log(placesList);
        res.render('places/list', {
            placesList,
            number: 1,
        });
    });

module.exports = {
    placeRouter,
};