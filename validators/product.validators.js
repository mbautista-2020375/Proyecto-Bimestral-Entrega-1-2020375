import { body, param } from "express-validator"; // body para datos, param para el id de la URL
import { validateErrors } from "../helpers/validate.errors.js";

export const createProductValidator = [
    body('name', 'Product name is required')
        .notEmpty(),
    
    body('description', 'Invalid description')
        .optional()
        .isString()
        .withMessage('Description must be a text'),

    body('price', 'Product price is required and must be a positive number')
        .notEmpty()
        .isFloat({ min: 0.01 })
        .withMessage('Price must be a number greater than 0'),

    body('stock', 'Stock is required and must be a non-negative integer')
        .notEmpty()
        .isInt({ min: 0 })
        .withMessage('Stock must be 0 or greater'),

    body('category', 'Invalid category')
        .optional()
        .isMongoId()
        .withMessage('Category must be a valid MongoID'),

    body('status', 'Invalid status')
        .optional()
        .isBoolean()
        .withMessage('Status must be true or false'),

    validateErrors
];
export const editProductValidator = [
    body('name', 'Invalid product name')
        .optional(),

    body('description', 'Invalid description')
        .optional()
        .isString(),

    body('price', 'Invalid price')
        .optional()
        .if(body('price').notEmpty())
        .isFloat({ min: 0.01 })
        .withMessage('Price must be a number greater than 0'),

    body('stock', 'Invalid stock')
        .optional()
        .if(body('stock').notEmpty())
        .isInt({ min: 0 })
        .withMessage('Stock must be 0 or greater'),

    body('category', 'Invalid category')
        .optional()
        .if(body('category').notEmpty())
        .isMongoId()
        .withMessage('Category must be a valid MongoID'),

    body('status', 'Invalid status')
        .optional()
        .isBoolean(),

    validateErrors
];

