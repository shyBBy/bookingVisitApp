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
    },
    checkUserIsAdmin: async (req, res, next) => {
        if(req.session.user.role === 'admin'){
            next();
        } else {
            console.log('You are not admin.')
            req.flash('unauthorisedAccess', `You are not admin.`);
            return res.redirect('/dashboard/')
        }
    },
    checkUserIsStaff: async (req, res, next) => {
        if(req.session.user.role === 'staff'){
            next();
        } else {
            console.log('You are not in a staffs(doctors) group.');
            req.flash('unauthorisedAccess', `You are not a staff.`);
            return res.redirect('/dashboard/')
        }
    },
};





