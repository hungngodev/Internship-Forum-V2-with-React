import e from 'connect-flash';

import Internship from '../models/internship.js';
import Review from '../models/review.js';


const createReview = async (req, res) => {
    const internship = await Internship.findById(req.params.id);
    const review = new Review(req.body.review);
    // const user = User.findById(req.user._id);
    review.author = req.user._id;
    // user.reviews.push(review);
    internship.reviews.push(review);
    // await user.save();
    await review.save();
    await internship.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/internships/${internship._id}`);
}

const deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    // const review= Review.findById(reviewId);
    // const author = User.findById(review.author._id);
    await Internship.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    // await author.updateOne({ $pull: { reviews: review._id } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/internships/${id}`);
}
const reviews = {
    createReview,
    deleteReview}
export default reviews;