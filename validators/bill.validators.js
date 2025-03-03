import { body } from "express-validator";
import { validateErrors } from "../helpers/validate.errors.js";

export const createBillValidator = [
    body('cartId', 'Cart ID cannot be empty and must be a valid Mongo ID')
        .notEmpty()
        .isMongoId()
        .withMessage('Invalid cart ID format'),
    validateErrors
];

export const updateBillValidator = [
    body('cartId', 'Cart ID must be a valid Mongo ID')
        .optional()
        .isMongoId()
        .withMessage('Invalid cart ID format'),
    body('total', 'Total must be a positive number')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Total must be at least 0'),
    body('status', 'Invalid status')
        .optional()
        .isIn(["completed", "pending", "canceled"])
        .withMessage('Status must be one of: completed, pending, canceled'),
    validateErrors
];
