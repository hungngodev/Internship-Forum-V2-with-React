import dotenv from 'dotenv';

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import ejsMate from 'ejs-mate';
import session from 'express-session';
import flash from 'connect-flash';
import methodOverride from 'method-override';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import connectMongo from 'connect-mongo';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import { fileURLToPath } from 'url';

import User from './models/user.js';
import config from './helmet/index.js';
import userRoutes from './routes/users.js';
import internshipRoutes from './routes/internship.js';
import reviewRoutes from './routes/reviews.js';
import statisticsRoutes from './routes/statistics.js';
import ExpressError from './utils/ExpressError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 
const MongoDBStore = connectMongo(session);


const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/internship';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const app = express();

// app.engine('ejs', ejsMate)
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, './Client-side/dist')));
app.use(mongoSanitize({
    replaceWith: '_'
}))
const secret = process.env.SECRET || 'thisshouldbeabettersecret!';

const store = new MongoDBStore({
    url: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
});
const a665c63a69a6491e9a7c88d53b82ced47= process.env.MAPBOX_TOKEN;
store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());
app.use(helmet());

app.use(config);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/api', (req, res) => {
    const user = req.user;
    res.status(200).json(user);
});
app.get('/api/e0dca1652c5245168699e24a57e3a8d8',(req,res)=>{
    res.status(200).json({"b3c44b59965a12148f4e3a12757d4e2bc": a665c63a69a6491e9a7c88d53b82ced47 })
});
app.use('/api', userRoutes);
app.use('/api/internships', internshipRoutes)
app.use('/api/internships/:id/reviews', reviewRoutes)
app.use('/api/statistics', statisticsRoutes)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './Client-side/dist', 'index.html'));
  });

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const msg = err.message || 'something went wrong, try again later';
    console.log(err)
    console.log(msg)
    res.status(statusCode).json({ messageError: msg });
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})


