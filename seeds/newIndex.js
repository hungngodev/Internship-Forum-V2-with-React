import dotenv from 'dotenv';

if (process.env.NODE_ENV !== "production") {
    dotenv.config();//remember if it does not work 
}
import mongoose from 'mongoose';
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding.js";
import Fakerator from "fakerator";

import imagesURL from './images.js';
import internshipData from './file.js';
import Internship from '../models/internship.js';
import Review from '../models/review.js';
import { userData, numberOfUsers } from './user.js';
import User from '../models/user.js';


const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const fakerator = Fakerator();
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/internship';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const statesAbbreviations = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL',
    'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT',
    'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
    'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

function getStateFromLocation(location) {
    // Regular expression to match state abbreviations
    const stateAbbreviationRegex = /\b([A-Za-z]{2})\b/;

    // Extract state abbreviation from the location string
    const match = location.match(stateAbbreviationRegex);

    // Check if a match is found
    if (match && match[1]) {
        // If found, return the state abbreviation in uppercase
        return match[1].toUpperCase();
    } else {
        // If not found, return null or any default value as needed
        return null;
    }
}
const seedDBInternship = async () => {
    await Internship.deleteMany({});
    await User.deleteMany({});
    await Review.deleteMany({});
    await db.dropCollection('sessions');
    for (let i = 0; i < userData.length; i++) {//
        const { email, username, password,description, location,phoneNumber,proNoun,image } = userData[i];
        const user = new User({ email, username,description,location,phoneNumber,proNoun,image });
        const registeredUser = await User.register(user, password);
        userData[i].id = registeredUser._id;
    }
    for (let i = 0; i < internshipData.length; i++) {
        for (let j = 0; j < internshipData[i].location.length; j++) {
            const random = Math.floor(Math.random() * numberOfUsers);
            try {
                const reviews = internshipData[i].reviews;
                const internshipReview = [];
                for (let k = 0; k < reviews.length; k++) {
                    const random2 = Math.floor(Math.random() * numberOfUsers);
                    const review = new Review({
                        rating: Math.round(reviews[k].rating),
                        body: reviews[k].body,
                        author: userData[random2].id
                    });
                    // const authorReview = User.findById(userData[random2].id);
                    // console.dir(authorReview);
                    // await authorReview.updateOne({ $push: { reviews: review._id } });
                    // await authorReview.save();
                    await review.save();
                    internshipReview.push(review._id);
                }
                const geoData = await geocoder.forwardGeocode({
                    query: internshipData[i].location[j],
                    limit: 1
                }).send()
                const camp = new Internship({
                    author: userData[random].id,
                    location: internshipData[i].location[j],
                    title: internshipData[i].title,
                    description: internshipData[i].description,
                    salary: !(internshipData[i].salary == null) ? internshipData[i].salary.toFixed(1) : 0,
                    area: internshipData[i].area,
                    company: internshipData[i].company,
                    link: internshipData[i].link,
                    // geometry: {
                    //     type: "Point",
                    //     coordinates: [
                    //         parseInt(internshipData[i].geometry[j][1]),
                    //         parseInt(internshipData[i].geometry[j][0]),
                    //         // parseInt(geometry[i][j][0]),
                    //         // parseInt(geometry[i][j][1]),

                    //     ]
                    // },
                    state: getStateFromLocation(internshipData[i].location[j]) != null ? getStateFromLocation(internshipData[i].location[j]) : statesAbbreviations[Math.floor(Math.random() * statesAbbreviations.length)],
                    geometry: geoData.body.features[0].geometry,
                    imagesURL: imagesURL[i][j],
                    reviews: internshipReview,
                    lastModified: new Date(fakerator.date.past(2, new Date(2024, 0, 6))),
                })
                // const author = User.findById(userData[random].id);
                // await author.updateOne({ $push: { post: camp._id } });
                // await author.save();
                await camp.save();
            } catch (error) {
                console.log(i, j);
                console.log(internshipData[i].location)
                console.log(internshipData[i].geometry)
                console.log(error);
                break

            }
        }
    }
}



seedDBInternship().then(() => {
    mongoose.connection.close();
})