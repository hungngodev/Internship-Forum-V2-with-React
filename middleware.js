import mongoose from 'mongoose';
import isUrl from "is-url";
import dotenv from 'dotenv';
import { validateImage } from "image-validator";

import { internshipSchema, reviewSchema, searchSchema, LogInSchema, RegisterSchema,SettingSchema } from './schemas.js';
import ExpressError from './utils/ExpressError.js';
import Internship from './models/internship.js';
import Review from './models/review.js';
import { cloudinary } from "./cloudinary/index.js";
if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding.js";
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

const deletingImages = async (files) => {
    files.map(async (f) => {
        await cloudinary.uploader.destroy(f.filename);
    })
}

const validateLogIn = (req, res, next) => {
    if (req.body.demo  === "true" || req.body.demo === true) {
        req.body.username= process.env.DEMO_USERNAME;
        req.body.password= process.env.DEMO_PASSWORD;
        next();
        return; 
    }
    const { error } = LogInSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        next(new ExpressError(msg, 400));
    } else {
        next();
    }

}
const validateRegister = (req, res, next) => {
    const { error } = RegisterSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        next(new ExpressError(msg, 400));
    } else {
        next();
    }
}
const validateSetting = async (req, res, next) => {
    const { error } = SettingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        await deletingImages(req.files);
        next(new ExpressError(msg, 400));
    } else {
        next();
    }
}
const validateSearch = (req, res, next) => {
    let { search, sort, option, order, id } = req.query;
    const QueryObject = { search, sort, option, order, id };
    const { error } = searchSchema.validate(QueryObject);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        next(new ExpressError(msg, 400))
    } else {
        next();
    }
}
const validateInternship = async (req, res, next) => {
    const { error } = internshipSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        await deletingImages(req.files);
        next(new ExpressError(msg, 400));
    } else {
        const { link } = req.body;
        if (!isUrl(link)) {
            await deletingImages(req.files);
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
        }
        catch (e) {
            await deletingImages(req.files);
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
        next(new ExpressError(msg, 400));
    } else {
        next();
    }
}

const isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const internship = await Internship.findById(id);
    if (!internship.author.equals(req.user._id)) {
        next(new ExpressError('You are not the author of that post!', 401));
        return;
    }
    next();
}

const isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        next(new ExpressError('You are not the author of that review!', 401));
        return;
    }
    next();
}
const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next(new ExpressError("You must be signed in first!", 401));
        return
    }
    next();
}
const alreadyLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next(new ExpressError("You have already logged in!", 401));
        return
    }
    next();
}
const validateId = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        next(new ExpressError('Invalid ID', 400));
        return;
    }
    next();
}
export {
    isLoggedIn, validateInternship, isAuthor, validateReview, isReviewAuthor, validateSearch,
    validateLogIn, alreadyLoggedIn, validateRegister,
    validateId,validateSetting
};