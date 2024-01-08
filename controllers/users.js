import User from '../models/user.js';
import Internship from '../models/internship.js';
import ExpressError from '../utils/ExpressError.js';


const renderRegister = (req, res) => {
    res.render('users/register');
}

const register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            res.json({username: username})
        })
    } catch (e) {
        throw new ExpressError(e.message, 400);
    }
}



const renderLogin = (req, res) => {
    res.render('users/login');
}

const login = (req, res) => {
    const redirectUrl = req.session.returnTo ;
    const username= req.user.username;
    res.json({redirectUrl:redirectUrl,username:username});
}

const logout = (req, res) => {
    req.logout();
    res.send("You are now logged out!");
}

const index = async (req, res) => {
    const {id} = req.params;
    const author = await User.findById(id);
    const internships = await Internship.find({author: id}).populate('popupText');
    res.render('users/profile', { data: {internships: internships, author: author, profile: true, id: id}})
}

const search = async (req, res) => {
    const {id} = req.params;
    const author = await User.findById(id);
    const query = req.query.q;
    const internships = await Internship.find({ $text: { $search: query },author:id })
        .populate('popupText').populate('reviews');
    let message = internships.length>0?`Search results for "${query}" from posts of ${author.username}`:`No results for "${query}" from posts of ${author.username}`;
    res.render('users/profile', { data: { internships: internships ,message:message} })

}
const users = {
    renderRegister,
    register,
    renderLogin,
    login,
    logout,
    index,
    search
}
export default users;