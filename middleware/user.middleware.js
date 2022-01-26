// middleware/user.middleware.js
require('dotenv').config();

module.exports = {
    checkSession: async (req, res, next) => {
        if (!req.session.user) {
            console.log('not logged');
            return res.redirect('/user/login');
        }
        next();
    },
    checkUserIsActive: async (req,res,next) => {
        if(req.session.user.isActive === "false") {
            console.log('Account is not active, check your e-mail box')
            // return res.redirect('/user/login');
        }
        next();
    }
};





