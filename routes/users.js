import express from 'express';
const userRoutes = express.Router();
import passport from 'passport';
import catchAsync from '../utils/catchAsync.js';
import User from '../models/user.js';
import users from '../controllers/users.js';
import { validateSearch, validateLogIn ,validateRegister} from '../middleware.js';
import ExpressError from '../utils/ExpressError.js';


userRoutes.route('/register')
    .get(users.renderRegister)
    .post(validateRegister,catchAsync(users.register));

userRoutes.route('/login')
    .get(users.renderLogin)
    .post(validateLogIn,

        function (req, res, next) {
            passport.authenticate('local', function (err, user, info) {
                console.log(err)
                console.log(info)
                if (err) { console.log(err); return next(err); }
                if (!user) { console.log("error2"); throw new ExpressError(info.message, 401); }
                try {
                    req.logIn(user, function (err) {
                        if (err) { console.log("error3"); return next(err); }
                        next();
                    });
                }
                catch (e) {
                    console.log(e)
                }

            })(req, res, next);
        },
        users.login
    )

userRoutes.get('/logout', users.logout)

userRoutes.get('/profile/:id', catchAsync(users.index))

userRoutes.get('/profile/:id/search', validateSearch, catchAsync(users.search))

export default userRoutes;