import mongoose from 'mongoose';

import Review from './review.js';


const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } };

const InternshipSchema = new Schema({
    title: String,
    images: [ImageSchema],
    imagesURL: [String],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    salary: Number,
    description: String,
    company: String,
    link: String,
    area:String,
    location: String,
    state: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    lastModified: {
        type: Date,
        default: Date.now
    }
}, opts);


InternshipSchema.virtual('properties.popUpMarkup').get(function () {
    const {title, salary, company, images, imagesURL} = this;
    const urlImage = images.length? images[0].url : (imagesURL.length? imagesURL[[Math.floor(Math.random() * (5 - 1 + 1)) + 1]] :         "https://files.nc.gov/dhhs/styles/event_image/public/images/2023-04/Internship1.jpg?VersionId=wj4ZEZG.nM0C8BQ9a2PZLY0_Bk_PFjuC&itok=bFGXPWTV");
    return {title,salary,company, urlImage};
});



InternshipSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

InternshipSchema.index({'$**': 'text'});

export default mongoose.model('Internship', InternshipSchema);