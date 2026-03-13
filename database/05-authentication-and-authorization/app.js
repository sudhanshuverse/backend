// CORE MODULES
const path = require('path');

// EXTERNAL MODULES
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// LOCAL MODULES
const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/hostRouter');
const authRouter = require('./routes/authRouter');
const rootDir = require('./utils/pathUtil');
const { ErrorPage } = require('./controllers/error');

const app = express();

const DB_PATH = "mongodb://sudhanshu1:coding12345@ac-ixqd2yz-shard-00-00.8bpirzw.mongodb.net:27017,ac-ixqd2yz-shard-00-01.8bpirzw.mongodb.net:27017,ac-ixqd2yz-shard-00-02.8bpirzw.mongodb.net:27017/airbnb?ssl=true&replicaSet=atlas-s0hxc6-shard-0&authSource=admin&appName=FirstCluster";

const PORT = 8000;


// SESSION STORE
const store = new MongoDBStore({
    uri: DB_PATH,
    collection: 'sessions'
});

store.on('error', function (error) {
    console.log("Session Store Error:", error);
});


// VIEW ENGINE
app.set('view engine', 'ejs');
app.set('views', 'views');


// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));


// SESSION MIDDLEWARE
app.use(session({
    secret: "superSecretSessionKey",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));


// SESSION DEBUG
app.use((req, res, next) => {
    // console.log("Session ID:", req.sessionID);
    // console.log("Session:", req.session);
    next();
});


// LOGIN CHECK MIDDLEWARE
app.use((req, res, next) => {
    req.session.isLoggedIn = req.session.isLoggedIn;
    next();
});


// ROUTES
app.use(authRouter);
app.use(storeRouter);

app.use("/host", (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect("/login");
    }
    next();
});

app.use("/host", hostRouter);


// ERROR PAGE
app.use(ErrorPage);


// DATABASE CONNECTION
mongoose.connect(DB_PATH)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });

    })
    .catch(err => {
        console.log("MongoDB connection error:", err);
    });