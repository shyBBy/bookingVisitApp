const sessionChecker = (req, res, next) => {
    if (!req.session.login) {
        res.redirect('/user/login');
        console.log(req.session.login);
    } else {
        console.log(req.session.login);
        next();
    }
}

module.exports = {
    sessionChecker,
}