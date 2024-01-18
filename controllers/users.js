import User from '../models/user.js';
import Internship from '../models/internship.js';
import ExpressError from '../utils/ExpressError.js';
import mongoose from 'mongoose';
import { cloudinary } from "../cloudinary/index.js";
import avatar from "../Unsplash/avatar.js";


const deletingImages = async (files) => {
    files.map(async (f) => {
        await cloudinary.uploader.destroy(f.filename);
    })
}


const renderRegister = (req, res) => {
    res.status(200).json({ message: "Render the register in React side" })
}


const register = async (req, res, next) => {
    try {
        const { email, username, password, location } = req.body;
        const user = new User({ email, username, location });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            res.json({ username: username })
        })
    } catch (e) {
        throw new ExpressError(e.message, 400);
    }
}



const renderLogin = (req, res) => {
    res.status(200).json({ message: "Render the loggin in React side" })
}

const login = (req, res) => {
    const redirectUrl = req.session.returnTo;
    const username = req.user.username;
    res.status(200).json({ redirectUrl: redirectUrl, username: username });
}

const logout = (req, res) => {
    req.logout();
    res.send("You are now logged out!");
}

const index = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        throw new ExpressError('Invalid ID', 400);
    }
    const author = await User.findById(id);
    if (!author) {
        throw new ExpressError('User not found', 404);
    }
    if(req.user && req.user.id==author.id){
        res.status(200).json({ author: author, isOwner: true, user: req.user });
        return;
    }
    res.status(200).json({ author: author });
}



const setting = async (req, res) => {
    // const currentUser = await User.findByUsername(req.user.username);
    // try{
    //     currentUser.username= "hung1234"
    //     currentUser.email = "hungngo1504@gmail.com"
    //     await currentUser.save();
    // }
    // catch(e){
    //     throw new ExpressError(e.message, 400);
    // }
    res.json({ user: req.user })
}

const editSetting = async (req, res) => {
    const { username, NewPassword, email, description, location, phoneNumber, proNoun, imageLink, image,generate} = req.body;
    const currentUser = await User.findByUsername(req.user.username);
    currentUser.description = description;
    currentUser.location = location;
    currentUser.phoneNumber = phoneNumber;
    currentUser.proNoun = proNoun;
    if (req.files.length > 0) {
        if (currentUser.imageFileName!="") {
            await cloudinary.uploader.destroy(currentUser.imageFileName);
        }
        currentUser.image = req.files[0].path;
        currentUser.imageFileName = req.files[0].filename;
    }
    else if (imageLink && imageLink != "") {
        if (currentUser.imageFileName!="") {
            await cloudinary.uploader.destroy(currentUser.imageFileName);
        }
        currentUser.image = imageLink;
        currentUser.imageFileName = ""
    }
    else if (imageLink == "" && req.files.length == 0 && generate == "on") {
        if (currentUser.imageFileName!="") {
            await cloudinary.uploader.destroy(currentUser.imageFileName);
        }
        const query =["avatar", "nature","abstract"]
        let imageURL = await avatar({query: query[Math.floor(Math.random() * query.length)]});
        currentUser.image = imageURL;
        currentUser.imageFileName = "";
    }
    try {
        currentUser.username = username;
        currentUser.email = email;
        await currentUser.save();

    }
    catch (e) {
        await deletingImages(req.files);
        if (e.keyValue.email != null && e.name === "MongoError" && e.code === 11000) {
            throw new ExpressError("Email already existed", 400);
        } else if (e.keyValue.username != null && e.name === "MongoError" && e.code === 11000) {
            throw new ExpressError("Username has been used! Try another", 400);
        } else {
            throw new ExpressError(e.message, 400);
        }
    }
    try{
        if (NewPassword && NewPassword !="") {
            await currentUser.setPassword(NewPassword);
            await currentUser.save();
        }
    }
    catch(e){
        deletingImages(req.files);
        throw new ExpressError(e.message, 400);
    }
    await currentUser.save();
    res.status(200).json({ message: "Updated successfully" });
}
const users = {
    renderRegister,
    register,
    renderLogin,
    login,
    logout,
    index,
    editSetting,
    setting
}
export default users;