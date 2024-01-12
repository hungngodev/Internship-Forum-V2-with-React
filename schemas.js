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
    q: Joi.string().required().escapeHTML()
})
let internshipSchema = Joi.object({
    title: Joi.string().required().escapeHTML(),
    salary: Joi.number().required().min(0),
    area: Joi.string().required().escapeHTML(),
    location: Joi.string().required().escapeHTML(),
    company: Joi.string().required().escapeHTML(),
    link: Joi.string().required(),
    description: Joi.string().required().escapeHTML(),
    state: Joi.string().required().escapeHTML(),
    image: Joi.any(),
    deleteImages: Joi.array(),
    deleteImagesURL: Joi.array(),
    generate: Joi.any(),
});

let reviewSchema = Joi.object({
    rating: Joi.number().required().min(1).max(5),
    body: Joi.string().required().escapeHTML()
})
let LogInSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required().escapeHTML(),
    password: Joi.string().min(3).max(20).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).message({
        "string.pattern.base": ' \"password\"doesn\'t allow special characters, spaces, or symbols other than letters and numbers',
        "string.min": "minimum 10 character required",
        "string.max": "maximum 20 characters allowed"
    }).escapeHTML(),
})
let RegisterSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required().escapeHTML(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().escapeHTML(),
    password: Joi.string().min(5).max(20).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).message({
        "string.pattern.base": ' \"password\"doesn\'t allow special characters, spaces, or symbols other than letters and numbers',
        "string.min": "minimum 10 character required",
        "string.max": "maximum 20 characters allowed"
    }).escapeHTML(),
})
export { searchSchema, internshipSchema, reviewSchema, LogInSchema, RegisterSchema };
