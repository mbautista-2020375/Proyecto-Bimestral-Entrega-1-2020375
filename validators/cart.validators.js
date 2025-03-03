import { body } from "express-validator";
import { validateErrors } from "../helpers/validate.errors.js";

export const addProductToCartValidator = [
    body('productId', 'Product ID cannot be empty and must be a valid Mongo ID')
        .notEmpty()
        .isMongoId()
        .withMessage('Invalid product ID format'),
    body('quantity', 'Quantity must be a positive integer greater than 0')
        .notEmpty()
        .isInt({ min: 1 })
        .withMessage('Quantity must be at least 1'),
    validateErrors
];

export const updateProductQuantityValidator = [
    body('productId', 'Product ID cannot be empty and must be a valid Mongo ID')
        .notEmpty()
        .isMongoId()
        .withMessage('Invalid product ID format'),
    body('quantity', 'Quantity must be a positive integer greater than 0')
        .notEmpty()
        .isInt({ min: 1 })
        .withMessage('Quantity must be at least 1'),
    validateErrors
];

export const removeProductFromCartValidator = [
    body('productId', 'Product ID cannot be empty and must be a valid Mongo ID')
        .notEmpty()
        .isMongoId()
        .withMessage('Invalid product ID format'),
    validateErrors
];

