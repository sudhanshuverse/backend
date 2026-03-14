const { check, validationResult } = require('express-validator');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: "Login",
        currentPage: "Login",
        isLoggedIn: false
    });
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        pageTitle: "Signup",
        currentPage: "signup",
        isLoggedIn: false,
        errors: 0,
        oldInput: {
            firstName: "", lastName: "", email: "", password: "",
            userType: ""
        }
    });
};

exports.postSignup = [
    // FIRST NAME VALIDATION
    check('firstName')
        .notEmpty()
        .withMessage('First name is required')
        .trim()
        .isLength({ min: 2 })
        .withMessage('First name must be at least 2 characters long')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('First name can only contain letters'),

    // Last Name validation
    check('lastName')
        .matches(/^[a-zA-Z\s]*$/)
        .withMessage('Last name can only contain letters'),

    // Email validation
    check('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),


    // Password validation
    check('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/[a-z]/)
        .withMessage('Password must contain at least one lowercase letter')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/[!@#$%^&*(), .? ":{}|<>]/)
        .withMessage('Password must contain at least one special character')
        .trim(),

    // Confirm password validation
    check('confirmPassword')
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),

    // User Type validation
    check('userType')
        .notEmpty()
        .withMessage('User type is required')
        .isIn(['guest', 'host'])
        .withMessage('Invalid user type'),


    // Terms Accepted validation
    check('terms')
        .notEmpty()
        .withMessage('You must accept the terms ')
        .custom((value) => {
            if (value !== 'on') {
                throw new Error('You must accept terms')
            }
            return true;
        }),

    (req, res, next) => {
        const { firstName, lastName, email, password, userType } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(404)
                .render('auth/signup', {
                    pageTitle: 'Sign Up',
                    isLoggedIn: false,
                    errors: errors.array().map(error => error.msg),
                    oldInput: { firstName, lastName, email, password, userType }
                })
        }
        res.redirect('/login');
    }];

exports.postLogin = (req, res, next) => {
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