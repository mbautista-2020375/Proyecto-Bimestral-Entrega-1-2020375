'use strict';

import { Router } from 'express';
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from './category.controller.js';
import { validateJwt } from '../../middlewares/validate.jwt.js';
import { isAdmin } from '../../middlewares/is.admin.js';
import { createCategoryValidator, editCategoryValidator } from '../../validators/category.validators.js';
import { denyIfDefaultId } from '../../middlewares/is.default.category.js';

const api = Router();

// Necesitan token de administrador
api.post('/createcategory',[validateJwt, isAdmin, createCategoryValidator], createCategory);
api.get('/categories', [validateJwt, isAdmin],getAllCategories);
api.get('/searchcategory/:id',[validateJwt, isAdmin], getCategoryById);
api.put('/editcategory/:id',[validateJwt, denyIfDefaultId, isAdmin, editCategoryValidator], updateCategory);
api.put('/deletecategory/:id',[validateJwt, denyIfDefaultId, isAdmin], deleteCategory);

export default api;
