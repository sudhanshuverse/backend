exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: "Login",
        currentPage: "Login",
        isLoggedIn: false
    });
};

exports.postLogin = (req, res, next) => {
    const { username, password } = req.body;
    console.log({ username, password });
    req.session.isLoggedIn = true;
    req.session.save(err => {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });

};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        }
        res.redirect('/login');
    });

};