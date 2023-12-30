// import mongoose from 'mongoose';
// import cities from './cities';
// import { places, descriptors } from './seedHelpers';
// import Internship from '../models/internship';

// const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/internship';
// mongoose.connect(dbUrl, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// });

// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//     console.log("Database connected");
// });

// const sample = array => array[Math.floor(Math.random() * array.length)];

// function getInternshipLinks(internships) {
//     return internships.map(internship => [internship.company,internship.location]);
//   }

// const seedDB = async () => {
//     await Internship.deleteMany({});
//     for (let i = 0; i < 300; i++) {
//         const random1000 = Math.floor(Math.random() * 1000);
//         const salary = Math.floor(Math.random() * 50) + 10;
//         const camp = new Internship({
//             //YOUR USER ID
//             author: '655d255ce4296bf70020e31a',
//             location: `${cities[random1000].city}, ${cities[random1000].state}`,
//             title: `${sample(descriptors)} ${sample(places)}`,
//             description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
//             salary,
//             area: "Web developer",
//             company:"Google",
//             link:"https://www.google.com/",
//             geometry: {
//                 type: "Point",
//                 coordinates: [
//                     cities[random1000].longitude,
//                     cities[random1000].latitude,
//                 ]
//             },
//             images: [
//                 {
//                     url: 'https://res.cloudinary.com/dj6dtuqnr/image/upload/v1700518556/samples/landscapes/landscape-panorama.jpg',
//                     filename: 'samples/landscapes'
//                 },
//                 {
//                     url: 'https://res.cloudinary.com/dj6dtuqnr/image/upload/v1700518556/samples/landscapes/landscape-panorama.jpg',
//                     filename: 'samples/landscapes'
//                 }
//             ]
//         })
//         await camp.save();
//     }
// }

// seedDB().then(() => {
//     mongoose.connection.close();
// })