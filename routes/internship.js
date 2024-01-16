import express from 'express';
import multer from 'multer';

import internships from '../controllers/internships.js';
import catchAsync from '../utils/catchAsync.js';
import { isLoggedIn, isAuthor, validateInternship, validateSearch,validateId } from '../middleware.js';
import { storage } from '../cloudinary/index.js';


const internshipRoutes = express.Router();

const upload = multer({ storage });

internshipRoutes.route('/')
    .get(validateSearch,catchAsync(internships.index))
    .post(isLoggedIn, upload.array('image'), validateInternship, catchAsync(internships.createInternship))

internshipRoutes.get('/new', isLoggedIn, internships.renderNewForm)

internshipRoutes.route('/:id')
    .get(validateId, catchAsync(internships.showInternship))
    .put(validateId,isLoggedIn, isAuthor, upload.array('image'), validateInternship, catchAsync(internships.updateInternship))
    .delete(validateId, isLoggedIn, isAuthor, catchAsync(internships.deleteInternship));

internshipRoutes.get('/:id/edit',validateId, isLoggedIn, isAuthor, catchAsync(internships.renderEditForm))



export default internshipRoutes;