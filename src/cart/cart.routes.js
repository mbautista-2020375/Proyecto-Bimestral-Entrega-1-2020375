'use strict';

import { Router } from 'express';
import { addProductToCart, getUserCart, updateProductQuantity, removeProductFromCart, clearCart } from './cart.controller.js';
import { validateJwt } from '../../middlewares/validate.jwt.js';
import { isClient } from '../../middlewares/is.client.js';
import { addProductToCartValidator, removeProductFromCartValidator, updateProductQuantityValidator } from '../../validators/cart.validators.js';

const api = Router();

api.post('/addproduct/',[validateJwt, isClient, addProductToCartValidator] ,addProductToCart);
api.get('/mycart/',[validateJwt, isClient], getUserCart);
api.put('/mycart/updateproduct/',[validateJwt, isClient, updateProductQuantityValidator], updateProductQuantity);
api.delete('/mycart/removeproduct/',[validateJwt, isClient, removeProductFromCartValidator], removeProductFromCart);
api.delete('/mycart/clear/',[validateJwt, isClient] ,clearCart);

export default api;
