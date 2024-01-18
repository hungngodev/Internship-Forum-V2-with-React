import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        default: "",
    },
    location: {
        type: String,
        default: ""
    },
    phoneNumber: {
        type: String,
        default: ""
    },
    proNoun: {
        type: String,
        default: ""         
    },

    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    imageFileName: {
        type: String,
        default:"",
    }, 
    // post:[{
    //     type: Schema.Types.ObjectId,
    //     ref:'Internship'
    // }],
    // reviews:[{
    //     type: Schema.Types.ObjectId,
    //     ref:'Review'
    // }]
});

UserSchema.plugin(passportLocalMongoose, {
    lastLoginField: 'last',
    attemptsField: 'attempts',
});


export default mongoose.model('User', UserSchema);