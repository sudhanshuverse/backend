const { check, validationResult } = require("express-validator");
const User = require("../models/user");

exports.getLogin = (req, res) => {
    res.render("auth/login", {
        pageTitle: "Login",
        currentPage: "login",
        isLoggedIn: false
    });
};

exports.getSignup = (req, res) => {
    res.render("auth/signup", {
        pageTitle: "Signup",
        currentPage: "signup",
        isLoggedIn: false,
        errors: {},
        old: {}
    });
};

exports.postSignup = [

    check("firstName")
        .trim()
        .isLength({ min: 2 })
        .withMessage("First name must be at least 2 characters")
        .matches(/^[A-Za-z\s]+$/)
        .withMessage("First name should contain only letters"),

    check("lastName")
        .optional({ checkFalsy: true })
        .matches(/^[A-Za-z\s]+$/)
        .withMessage("Last name should contain only letters"),

    check("email")
        .isEmail()
        .withMessage("Enter a valid email")
        .normalizeEmail(),

    check("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters")
        .matches(/[a-z]/)
        .withMessage("Password must contain one lowercase letter")
        .matches(/[A-Z]/)
        .withMessage("Password must contain one uppercase letter")
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage("Password must contain one special character"),

    check("confirmPassword")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        }),

    check("userType")
        .notEmpty()
        .withMessage("User type required")
        .isIn(["guest", "host"])
        .withMessage("Invalid user type"),

    check("terms")
        .equals("on")
        .withMessage("Please accept the terms and conditions"),

    async (req, res) => {
        const { firstName, lastName, email, password, userType } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = {};
            errors.array().forEach(err => {
                formattedErrors[err.path] = err.msg;
            });
            return res.status(422).render("auth/signup", {
                pageTitle: "Signup",
                currentPage: "signup",
                isLoggedIn: false,
                errors: formattedErrors,
                old: req.body
            });
        }
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(422).render("auth/signup", {
                    pageTitle: "Signup",
                    currentPage: "signup",
                    isLoggedIn: false,
                    errors: { email: "Email already registered" },
                    old: req.body
                });
            }
            const user = new User({
                firstName,
                lastName,
                email,
                password,
                userType
            });
            await user.save();
            res.redirect("/login");
        } catch (err) {
            console.log(err);
            return res.status(500).render("auth/signup", {
                pageTitle: "Signup",
                currentPage: "signup",
                isLoggedIn: false,
                errors: { general: "Something went wrong. Please try again." },
                old: req.body
            });
        }
    }
];

exports.postLogin = (req, res) => {
    req.session.isLoggedIn = true;
    req.session.save(err => {
        if (err) {
            console.log(err);
        }
        res.redirect("/");
    });
};

exports.postLogout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        }
        res.redirect("/login");
    });

};