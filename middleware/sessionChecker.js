const sessionChecker = (req, res, next) => {
    if (!req.session.login) {
        res.redirect('/user/login');
    } else {
        next();
    }
}

module.exports = {
    sessionChecker,
}