import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding.js";

import Internship from '../models/internship.js';
import Review from '../models/review.js';
import { cloudinary } from "../cloudinary/index.js";
import searchingForImageAI from '../BING/images.js';

const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

const index = async (req, res) => {
    console.log(req.query)
    let { search, sort, option ,order} = req.query;
    search = search ? search : "";
    const queryObject = {}
    if (search) {
        // queryObject.$text = {$search: search}
        if (option==="true") {
            queryObject.$text = { $search: search }
        }
        else {
            queryObject.$or = [
                { company: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } },
                { area: { $regex: search, $options: 'i' } },
                { title: { $regex: search, $options: 'i' } }
            ]
        }
    }
    const internships = await Internship.find(queryObject).populate('popupText').populate('reviews');
    sortFunction(internships,sort,order);
    let message = internships.length > 0 ? `Search results for "${search}"` : `No results for "${search}"`;
    res.json({ internships: internships,token: mapBoxToken })

}


const search = async (req, res) => {
    const query = req.query.q;
    const internships = await Internship.find({ $text: { $search: query } })
        .sort({ lastModified: 1 })
        .populate('popupText').populate('reviews');
    let message = internships.length > 0 ? `Search results for "${query}"` : `No results for "${query}"`;
    res.render('internships/index', { data: { internships: internships, message: message, mapBoxToken: mapBoxToken } })

}

const renderNewForm = (req, res) => {
    res.render('internships/new');
}

const createInternship = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.internship.location,
        limit: 1
    }).send()
    const internship = new Internship(req.body.internship);
    // const user = User.findById(req.user._id);
    internship.geometry = geoData.body.features[0].geometry;
    internship.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    internship.author = req.user._id;
    internship.lastModified = new Date();
    internship.link = isUrl(internship.link) ? internship.link : `https://google.com/search?q=${internship.company}+${internship.location}`;
    if (req.body.generate == "yes") {
        let AI = await searchingForImageAI(internship.company, internship.location);
        internship.imagesURL.push(...AI);
    }
    // user.post.push(internship);
    // await user.save();
    await internship.save();
    req.flash('success', 'Successfully made a new internship!');
    res.redirect(`/internships/${internship._id}`)
}

const showInternship = async (req, res,) => {
    const internship = await Internship.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!internship) {
        req.flash('error', 'Cannot find that internship!');
        return res.redirect('/internships');
    }
    res.render('internships/show', { internship });
}

const renderEditForm = async (req, res) => {
    const { id } = req.params;
    const internship = await Internship.findById(id)
    if (!internship) {
        req.flash('error', 'Cannot find that internship!');
        return res.redirect('/internships');
    }
    res.render('internships/edit', { internship });
}

const updateInternship = async (req, res) => {
    const { id } = req.params;
    const internship = await Internship.findByIdAndUpdate(id, { ...req.body.internship });
    internship.link = isUrl(internship.link) ? internship.link : `https://google.com/search?q=${internship.company}+${internship.location}`;
    internship.lastModified = new Date();
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    internship.images.push(...imgs);
    await internship.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await internship.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    if (req.body.deleteImagesURL) {
        await internship.updateOne({ $pull: { imagesURL: { $in: req.body.deleteImagesURL } } })
    }
    req.flash('success', 'Successfully updated internship!');
    res.redirect(`/internships/${internship._id}`)
}


const deleteInternship = async (req, res) => {
    const { id } = req.params;
    // const internship = await Internship.findById(req.params.id).populate({
    //     path: 'reviews',
    //     populate: {
    //         path: 'author'
    //     }
    // }).populate('author');
    // const author = User.findById(internship.author._id);
    // await author.updateOne({ $pull: { post: internship._id } });
    // for (let review of internship.reviews) {
    //     const authorReview = User.findById(review.author._id);
    //     await authorReview.updateOne({ $pull: { reviews: review._id } });
    //     await Review.findByIdAndDelete(review._id);
    // }
    const internship = await Internship.findById(id);
    for (let review of internship.reviews) {
        await Review.findByIdAndDelete(review._id);
    }
    const images = internship.images.map(i => i.filename);
    console.log(images)
    for (let filename of images) {
        await cloudinary.uploader.destroy(filename);
    }
    await Internship.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted internship')
    res.redirect('/internships');
}
const internships = {
    index,
    search,
    renderNewForm,
    createInternship,
    showInternship,
    renderEditForm,
    updateInternship,
    deleteInternship
}
export default internships;

function sortFunction(object,sort,order){
    function calculateDistance(geo1, geo2) {
        const R = 6371; // Radius of the Earth in kilometers
        const [lat1, lon1] = geo1;
        const [lat2, lon2] = geo2;
      
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers
        return distance;
      }
      
      // Function to sort locations by distance from a given geolocation (ascending or descending)
      function sortLocationsByDistance(locations, givenGeolocation, order = 'asc') {
        locations.sort((a, b) => {
          const distanceA = calculateDistance(givenGeolocation, a.geolocation);
          const distanceB = calculateDistance(givenGeolocation, b.geolocation);
          if (order === 'asc') {
            return distanceA - distanceB;
          } else if (order === 'desc') {
            return distanceB - distanceA;
          } else {
            throw new Error('Invalid order. Please use "asc" or "desc".');
          }
        });
      }

      function calculateAverageRating(reviews) {
        const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
        return totalRatings / reviews.length;
      }
      
      // Function to sort the array of objects based on the average rating (ascending or descending)
      function sortDataByAverageRating(data, order = 'asc') {
        data.sort((a, b) => {
          const averageRatingA = calculateAverageRating(a.reviews);
          const averageRatingB = calculateAverageRating(b.reviews);
          if (order === 'asc') {
            return averageRatingA - averageRatingB;
          } else if (order === 'desc') {
            return averageRatingB - averageRatingA;
          } else {
            throw new Error('Invalid order. Please use "asc" or "desc".');
          }
        });
      }
      let order2= order==="asc"?1:-1;
      if (sort==="lastModified") {object.sort((a,b)=>order2*(a.lastModified-b.lastModified))}
      if (sort==="salary") {object.sort((a,b)=>order2*(a.salary-b.salary))}
      if (sort ==="location") {sortLocationsByDistance(object, [39.8333, -98.5855],order)}
      if (sort==="rating") {sortDataByAverageRating(object,order)}
}