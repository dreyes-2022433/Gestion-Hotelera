import { body } from "express-validator";
import { validateErrorWithoutImg } from "./validate.error.js";

/*----------------------------- HOTEL -------------------------------------*/
export const validRegisterHotel = [
    body('name', 'Name cannot be empty, and can´t be overcome 50 characters')
        .notEmpty()
        .isLength({max: 50}),
    body('direction', 'Direction cannot ve empty, and can´t be overcome 100 characters')
        .notEmpty()
        .isLength({max: 100}),
    body('category', 'Category cannot be empty, and can´t be overcome 20 characters')
        .notEmpty()
        .isLength({max: 20}),
    body('phone', 'Phone cannot ve empty, and can´t be overcome 14 characters')
        .notEmpty()
        .isLength({max: 14}),
    body('email', 'Email cannot be empty, and can´t be overcome 50 characters')
        .notEmpty()
        .isLength({max: 50}),
    body('description', 'Description cannot be empty, and can´t be overcome 150 characters')
        .notEmpty()
        .isLength({max: 150}),
    body('amenities', 'Amenities cannot be empty, and can´t be overcome 100 characters')
        .notEmpty()
        .isLength({max: 100}),
    validateErrorWithoutImg
]

export const validUpdateHotel = [
    body('name', 'Name is optional but can´t be overcome 50 characters')
        .optional()
        .isLength({max: 50}),
    body('direction', 'Direction is optional but can´t be overcome 100 characters')
        .optional()
        .isLength({max: 100}),
    body('category', 'Category is optional but can´t be overcome 20 characters')
        .optional()
        .isLength({max: 20}),
    body('phone', 'Phone is optional but can´t be overcome 14 characters')
        .optional()
        .isLength({max: 14}),
    body('email', 'Email is optional but can´t be overcome 50 characters')
        .optional()
        .isLength({max: 50}),
    body('description', 'Description is optional but can´t be overcome 150 characters')
        .optional()
        .isLength({max: 150}),
    body('amenities', 'Amenities is optional but can´t be overcome 100 characters')
        .optional()
        .isLength({max: 100}),
    validateErrorWithoutImg
]



