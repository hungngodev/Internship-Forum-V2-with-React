
import Internship from '../models/internship.js';
import Review from '../models/review.js';
import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';
import user from '../models/user.js';

const createReview = async (req, res) => {
    const internship = await Internship.findById(req.params.id);
    const review = new Review(req.body);
    // const user = User.findById(req.user._id);
    review.author = req.user._id;
    // user.reviews.push(review);
    internship.reviews.push(review);
    // await user.save();
    await review.save();
    await internship.save();
    // req.flash('success', 'Created new review!');
    // res.redirect(`/internships/${internship._id}`);
    res.status(StatusCodes.OK).json({ internship: internship });
}

const deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    console.log(id, reviewId)
    try {
        await Internship.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);
    }
    catch (e) {
        throw new ExpressError('Invalid ID', 400)
    }
    res.status(StatusCodes.OK).json({ msg: "Deleted" });
}
const reviews = {
    createReview,
    deleteReview
}
export default reviews;