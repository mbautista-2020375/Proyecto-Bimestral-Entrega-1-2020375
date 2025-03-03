'use strict';

import { Router } from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, listTopSellers, listAvailableProducts, listUnavailableProducts } from './product.controller.js';
import { validateJwt } from '../../middlewares/validate.jwt.js'; // Ajusta la ruta si es necesario
import { isAdmin } from '../../middlewares/is.admin.js';
import { createProductValidator, editProductValidator } from '../../validators/product.validators.js';

const api = Router();

api.post('/createproduct/', [validateJwt, isAdmin, createProductValidator], createProduct); 

api.get('/products/allproducts', [validateJwt], getAllProducts);
api.get("/products/topsellers", [validateJwt], listTopSellers)
api.get("/products/availableproducts", [validateJwt], listAvailableProducts) 
api.get("/products/unavailableproducts", [validateJwt], listUnavailableProducts)
api.get('/product/:id', [validateJwt], getProductById); 

api.put('/editproduct/:id', [validateJwt, isAdmin, editProductValidator], updateProduct); 
api.delete('/deleteproduct/:id', [validateJwt, isAdmin], deleteProduct); 

export default api;
