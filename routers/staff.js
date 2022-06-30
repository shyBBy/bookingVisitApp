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

staffRouter.get('/add', userMiddleware.checkSession, userMiddleware.checkUserIsAdmin, async (req, res) => {
    const results = await UserRecord.getOneById(req.session.user.id);
    const user = results[0]
    //@TODO: przechodzimy tu po kliknieciu na opcje w liscie uzytkownikow
    res.render('staff/add', {
    user,
    })
})

staffRouter.post('/add', userMiddleware.checkSession, userMiddleware.checkUserIsAdmin, async (req, res) => {
    const newStaff = new StaffRecord(req.body);
    newStaff.create()
} )


module.exports = {
    staffRouter,
};
