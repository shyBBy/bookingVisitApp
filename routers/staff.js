const {Router} = require('express');
const {PlaceRecord} = require("../records/place.record");
const {UserRecord} = require("../records/user.record");
const userMiddleware = require("../middleware/user.middleware");
const {StaffRecord} = require("../records/staff.record");
const staffRouter = Router();

staffRouter.get('/list', userMiddleware.checkSession, userMiddleware.checkUserIsAdmin, async (req, res) => {
    const logedUserResults = await UserRecord.getOneById(req.session.user.id);
    const user = logedUserResults[0]
   const usersList = await UserRecord.listAll();
   const placesList = await PlaceRecord.listAll();
    
    //@TODO: Zrobic do konca liste wszystkich doktorow
    res.render('staff/list', {
    user,
    usersList,
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
    //@TODO: przechodzimy tu po kliknieciu na opcje w liscie uzytkownikow
    res.render('staff/add', {
        userLogged,
        place,
        user,
    })
})

staffRouter.post('/create/:userId', userMiddleware.checkSession, userMiddleware.checkUserIsAdmin, async (req, res) => {

    const newStaff = new StaffRecord(req.body);
    console.log(`ID z params: ${req.params['userId']}`)
    console.log(`placeId: ${req.body.placeId}`)
    console.log(` staff name: ${req.body.name}`)
    console.log(`staff surname: ${req.body.surname}`)
    console.log(`staff email: ${req.body.email}`)
    console.log(`staff phone ${req.body.staffPhoneNumber}`)
    console.log(`staff photo ${req.body.staffPhoto}`)
    console.log(`zwykle id ${req.body.dew}`)
    //@TODO: blad z dodawaniem. Sprawdzic o co chodzi.
    await newStaff.create()
} )


module.exports = {
    staffRouter,
};
