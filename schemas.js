import BaseJoi from 'joi';
import sanitizeHtml from 'sanitize-html';


let extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                let clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

let Joi = BaseJoi.extend(extension)
let searchSchema = Joi.object({
    search: Joi.string().max(100).escapeHTML().allow(""),
    sort: Joi.string().max(15).escapeHTML().allow(""),
    option: Joi.string().max(15).escapeHTML().allow(""),
    order: Joi.string().max(15).escapeHTML().allow(""),
    id: Joi.any().allow("").allow(null),
})
let internshipSchema = Joi.object({
    title: Joi.string().required().max(120).escapeHTML(),
    salary: Joi.number().required().min(0).max(150),
    area: Joi.string().required().max(35).escapeHTML(),
    location: Joi.string().max(35).required().escapeHTML(),
    company: Joi.string().max(35).required().escapeHTML(),
    link: Joi.string().max(200).required(),
    description: Joi.string().max(300).required().escapeHTML(),
    state: Joi.string().required().max(30).escapeHTML(),
    image: Joi.any(),
    deleteImages: Joi.array(),
    deleteImagesURL: Joi.array(),
    generate: Joi.any(),
});

let reviewSchema = Joi.object({
    rating: Joi.number().required().min(1).max(5),
    body: Joi.string().required().max(150).escapeHTML()
})
let LogInSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required().escapeHTML(),
    password: Joi.string().min(5).max(20).required().pattern(new RegExp('^[a-zA-Z0-9]{0,30}$')).message({
        "string.pattern.base": ' \"password\"doesn\'t allow special characters, spaces, or symbols other than letters and numbers',
        "string.min": "minimum 5 character required",
        "string.max": "maximum 20 characters allowed"
    }).escapeHTML(),
})
let RegisterSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required().escapeHTML(),
    email: Joi.string().max(30).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu',] } }).required().escapeHTML(),
    password: Joi.string().min(5).max(20).required().pattern(new RegExp('^[a-zA-Z0-9]{0,30}$')).message({
        "string.pattern.base": ' \"password\"doesn\'t allow special characters, spaces, or symbols other than letters and numbers',
        "string.min": "minimum 5 character required",
        "string.max": "maximum 20 characters allowed"
    }).escapeHTML(),
})
let SettingSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required().escapeHTML(),
    NewPassword: Joi.string().optional().min(5).max(20).pattern(new RegExp('^[a-zA-Z0-9]{0,30}$')).message({
        "string.min": "minimum 5 character required",
        "string.max": "maximum 20 characters allowed",
        "string.pattern.base": ' \"password\"doesn\'t allow special characters, spaces, or symbols other than letters and numbers',
    }).allow("").escapeHTML(),
    email: Joi.string().max(30).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu'] } }).required().escapeHTML(),

    description: Joi.string().max(300).escapeHTML().allow(''),
    location: Joi.string().max(30).escapeHTML().allow(''),
    phoneNumber: Joi.string().max(15).escapeHTML().allow(''),
    proNoun: Joi.string().max(15).escapeHTML().allow(''),
    generate: Joi.any(),
    image: Joi.any(),
    imageLink: Joi.string().allow(''),
})
export { searchSchema, internshipSchema, reviewSchema, LogInSchema, RegisterSchema, SettingSchema };
