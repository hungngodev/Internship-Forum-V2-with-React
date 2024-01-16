import express from 'express';
import multer from 'multer';
import passport from 'passport';

import catchAsync from '../utils/catchAsync.js';
import User from '../models/user.js';
import users from '../controllers/users.js';
import { validateSearch, validateLogIn ,validateRegister, alreadyLoggedIn, isLoggedIn,validateId,validateSetting} from '../middleware.js';
import ExpressError from '../utils/ExpressError.js';
import { storage } from '../cloudinary/index.js';

const userRoutes = express.Router();
const upload = multer({ storage });

userRoutes.route('/register')
    .get(alreadyLoggedIn, users.renderRegister)
    .post(validateRegister,catchAsync(users.register));

userRoutes.route('/login')
    .get(alreadyLoggedIn,users.renderLogin)
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

userRoutes.get('/profile/:id',validateId, catchAsync(users.index))

userRoutes.get('/setting',isLoggedIn, catchAsync(users.setting))
userRoutes.post('/setting/edit',isLoggedIn, upload.array('image'), validateSetting,  catchAsync(users.editSetting))

export default userRoutes;