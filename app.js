const express       = require("express")
    app             = express()
    bodyParser      = require("body-parser")
    mongoose        = require("mongoose")
    passport        = require("passport")
    LocalStrategy   = require("passport-local")
    LocalStrategy   = require("passport-local")
    Job             = require("./models/job")
    User            = require("./models/user")
    PORT            = 4000


mongoose.connect( "mongodb://nanaBee:nanabee123@ds145072.mlab.com:45072/job");
mongoose.connection.once("open", () => { console.log("DB connected")});

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Hey there lets get into coding!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(require("./routes/index"));
app.use(require('./routes/jobs'));

app.listen(PORT, () =>
    console.log(`JobBoaard APP is running on http://localhost:${PORT}`)
);