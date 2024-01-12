import { internshipSchema, reviewSchema, searchSchema, LogInSchema, RegisterSchema } from './schemas.js';
import ExpressError from './utils/ExpressError.js';
import Internship from './models/internship.js';
import Review from './models/review.js';
import isUrl from "is-url";
import dotenv from 'dotenv';
import { cloudinary } from "./cloudinary/index.js";
dotenv.config();

import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding.js";
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

const validateLogIn = (req, res, next) => {
    const { error } = LogInSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400);
    } else {
        next();
    }

}
const validateRegister = (req, res, next) => {
    const { error } = RegisterSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}
const validateSearch = (req, res, next) => {
    const { error } = searchSchema.validate(req.query);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        res.send(msg);
    } else {
        next();
    }
}
const deletingImages = async (files) => {
    files.map(async (f) => {
        await cloudinary.uploader.destroy(f.filename);
    })
}
const validateInternship = async (req, res, next) => {
    console.log(req.files)
    const { error } = internshipSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        deletingImages(req.files);
        next(new ExpressError(msg, 400));
    } else {
        const { link } = req.body;
        if (!isUrl(link)) {
            deletingImages(req.files);
            next(new ExpressError('Invalid URL', 400));
            return;
        }

        const geoData = await geocoder.forwardGeocode({
            query: req.body.location,
            limit: 1
        }).send()
        try {
            const geometry = geoData.body.features[0].geometry;
            req.body.geometry = geometry;
            console.log(req.body)
        }
        catch (e) {
            deletingImages(req.files);
            next(new ExpressError('Invalid Location', 400));
            return;
        }
        next();
    }
}

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

const isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const internship = await Internship.findById(id);
    if (!internship.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/internships/${id}`);
    }
    next();
}

const isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        throw new ExpressError('You do not have permission to do that!', 401);
    }
    next();
}
const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        throw new ExpressError("You must be signed in first!", 401);
    }
    next();
}

export { isLoggedIn, validateInternship, isAuthor, validateReview, isReviewAuthor, validateSearch, validateLogIn, validateRegister };