// if (process.env.NODE_ENV !== "production") {
//     require('dotenv').config();
// }

// const internshipData= require('./file');
// const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
// const mapBoxToken = process.env.MAPBOX_TOKEN;
// const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

// const seedDB = async () => {
//     geodata=[];
//     for (let i = 0; i < internshipData.length; i++) {
//         nestedArray=[];
//         for (let j=0; j<internshipData[i].location.length; j++){
//             try {
//                 const geoData = await geocoder.forwardGeocode({
//                     query: internshipData[i].location[j],
//                     limit: 1
//                 }).send()
    
//                 // geodata[i][j]=geoData.body.features[0].geometry;
//                 nestedArray.push(geoData.body.features[0].geometry.coordinates);
       
//             } catch (error) {
//                 console.log(i,j);
//                 console.log(internshipData[i].location)
//                 console.log(internshipData[i].company)
//             }
//         }
//         geodata.push(nestedArray);
//     }
//     return geodata;
// }
// console.log("Done");
// seedDB().then((geodata) => {
//     console.log(geodata);
// })
// const geometry = [
//     [[-71.195611, 42.504817]],
//     [[-97.9222112121185, 39.3812661305678]],
//     [[-121.97468, 37.226611]],
//     [[-71.074108, 42.348692]],
//     [[-122.159847, 37.444329]],
//     [[-122.410907, 37.766659]],
//     [
//       [-72.878294, 41.600544],
//       [-72.830654, 41.809821],
//       [-72.639259, 41.664822]
//     ],
//     [[-122.159847, 37.444329]],
//     [[-104.809267, 39.631539]],
//     [
//       [-93.23874, 45.019099],
//       [-105.604997408086, 39.1902459990462],
//       [-89.7639108198947, 44.7131688504626]
//     ],
//     [[-122.392177, 37.792129]],
//     [[-77.48749, 39.043719]],
//     [[-73.9826608125, 40.76872225]],
//     [[-73.979642, 40.752964]],
//     [[-122.123877, 47.669414]],
//     [[-77.168295, 38.870132]],
//     [[-77.357981, 38.958374]],
//     [[-97.9222112121185, 39.3812661305678]],
//     [[-74.060773, 40.754513]],
//     [[-117.780311, 33.662852]],
//     [[-96.944218, 32.829518]],
//     [[-77.385948, 38.969532]],
//     [[-117.162773, 32.71742]],
//     [[-73.754968, 42.651167]],
//     [[-87.854457, 42.526972]],
//     [[-121.890583, 37.336191]],
//     [[-122.03229, 37.322893]],
//     [[-71.612991, 42.269431]],
//     [[-71.058291, 42.360253]],
//     [[-6.372104, 39.471529]],
//     [[-122.177993, 37.451967]],
//     [[-2.224216, 52.196754]],
//     [[-122.159847, 37.444329]],
//     [[-71.072831, 42.506484]],
//     [[-122.306678, 37.543968]],
//     [[-71.173667, 42.546483]],
//     [[-121.890583, 37.336191]],
//     [[-6.372104, 39.471529]],
//     [[-71.552287, 42.345927]],
//     [[-121.890583, 37.336191]],
//     [[-122.08321, 37.389389], [-73.9826608125, 40.76872225]],
//     [[-122.123877, 47.669414]],
//     [[-122.177993, 37.451967], [-122.330062, 47.603832]],
//     [[-122.330062, 47.603832]],
//     [[-122.03229, 37.322893]],
//     [[-73.713978, 41.126485], [-6.366583, 39.465862]],
//     [[-121.890583, 37.336191], [-122.330062, 47.603832]],
//     [[-122.159847, 37.444329]],
//     [[-121.97468, 37.226611]],
//     [
//       [-71.058291, 42.360253],
//       [-79.383935, 43.653482],
//       [-122.330062, 47.603832]
//     ],
//     [[-71.44131, 42.30957]],
//     [[-122.306678, 37.543968]],
//     [[-121.890583, 37.336191]],
//     [[-6.366583, 39.465862]],
//     [[-122.177993, 37.451967]],
//     [[-71.2358, 42.37564]],
//     [[-122.03229, 37.322893]],
//     [[-122.395921, 37.779057]],
//     [[-122.306678, 37.543968]],
//     [[-122.036349, 37.36883]],
//     [
//       [-117.825982, 33.685697],
//       [-118.491227, 34.01947],
//       [-118.448987, 34.150872],
//       [-97.7437, 30.271129],
//       [-118.605838, 34.168436]
//     ],
//     [[-73.9826608125, 40.76872225]],
//     [[-118.242766, 34.053691]],
//     [[-122.293277, 47.597494]],
//     [[-73.994497, 40.75184]],
//     [
//       [-117.825982, 33.685697],
//       [-118.491227, 34.01947],
//       [-118.448987, 34.150872],
//       [-97.7437, 30.271129],
//       [-118.605838, 34.168436]
//     ],
//     [[-122.159847, 37.444329]],
//     [[-71.231347, 42.43422]],
//     [[-71.195611, 42.504817]],
//     [
//       [-73.994497, 40.75184],
//       [-6.366583, 39.465862],
//       [-105.270545, 40.014986]
//     ],
//     [[-118.41946, 34.0595]],
//     [[-73.714575, 41.040931]],
//     [[-97.7437, 30.271129], [-104.984862, 39.739236]],
//     [[-80.42626, 25.64809], [-122.674195, 45.520247]],
//     [[-84.390264, 33.748992], [-93.265469, 44.9773]],
//     [
//       [-118.191604, 33.769016],
//       [-105.01665, 39.613321],
//       [-106.6509448, 35.0881915],
//       [-88.807175, 30.418878],
//       [-77.027623, 38.995946],
//       [-75.478923, 37.925134],
//       [-79.383935, 43.653482]
//     ],
//     [[-122.08321, 37.389389]]
//   ]