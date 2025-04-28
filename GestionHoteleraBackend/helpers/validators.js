import { body } from "express-validator";
import { validateErrorWithoutImg } from "./validate.error.js";
import { existUsername, existEmail, existPhone } from './db.validators.js';


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

/*----------------------------- USER -------------------------------------*/
export const validRegisterUser = [
    body('name', 'Name cannot be empty, must have between 3 and 25 characters')
        .notEmpty()
        .isLength({ min: 3, max: 25 }),
    body('surname', 'Surname cannot be empty, must have between 3 and 25 characters')
        .notEmpty()
        .isLength({ min: 3, max: 25 }),
    body('username', 'Username cannot be empty, must have between 3 and 25 characters')
        .notEmpty()
        .isLength({ min: 3, max: 25 })
        .custom(existUsername),
    body('email', 'Email cannot be empty and must be a valid email')
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('password', 'Password must have at least 8 characters, one uppercase, one lowercase and one number')
        .notEmpty()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
    body('phone', 'Phone cannot be empty, must have between 3 and 15 characters')
        .notEmpty()
        .isLength({ min: 3, max: 15 })
        .isNumeric().withMessage('Phone must contain only numbers')
        .custom(existPhone),
    body('role', 'Role cannot be empty and must be ADMIN or CLIENT')
        .notEmpty()
        .isIn(['ADMIN', 'CLIENT']),
    validateErrorWithoutImg
]

export const validUpdateUser = [
    body('name', 'Name must have between 3 and 25 characters')
        .optional()
        .isLength({ min: 3, max: 25 }),
    body('surname', 'Surname must have between 3 and 25 characters')
        .optional()
        .isLength({ min: 3, max: 25 }),
    body('username', 'Username must have between 3 and 25 characters')
        .optional()
        .isLength({ min: 3, max: 25 }),
    body('email', 'Must be a valid email')
        .optional()
        .isEmail(),
    body('password', 'Password must have at least 8 characters, one uppercase, one lowercase and one number')
        .optional()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
    body('phone', 'Phone must have between 3 and 15 characters')
        .optional()
        .isLength({ min: 3, max: 15 }),
    body('role', 'Role must be ADMIN or CLIENT')
        .optional()
        .isIn(['ADMIN', 'CLIENT']),
    validateErrorWithoutImg
]

/*----------------------------- ROOM -------------------------------------*/
export const validRegisterRoom = [
    body('number', 'Room number cannot be empty, must be alphanumeric with hyphens and between 1 and 10 characters')
        .notEmpty()
        .matches(/^[A-Za-z0-9-]+$/)
        .isLength({ min: 1, max: 10 }),
    body('hotel', 'Hotel id cannot be empty')
        .notEmpty()
        .isMongoId(),
    body('capacity', 'Capacity must be an integer between 1 and 20')
        .notEmpty()
        .isInt({ min: 1, max: 20 }),
    body('reserved', 'Reserved must be a boolean')
        .optional()
        .isBoolean(),
    body('stars', 'Stars must be between 1 and 5')
        .notEmpty()
        .isIn(['1', '2', '3', '4', '5']),
    body('price', 'Price must be a positive number with up to 2 decimal places')
        .notEmpty()
        .matches(/^\d+(\.\d{1,2})?$/),
    body('description', 'Description cannot be empty and must have between 10 and 500 characters')
        .notEmpty()
        .isLength({ min: 10, max: 500 }),
    validateErrorWithoutImg
]

export const validUpdateRoom = [
    body('number', 'Room number must be alphanumeric with hyphens and between 1 and 10 characters')
        .optional()
        .matches(/^[A-Za-z0-9-]+$/)
        .isLength({ min: 1, max: 10 }),
    body('hotel', 'Hotel id must be valid')
        .optional()
        .isMongoId(),
    body('capacity', 'Capacity must be an integer between 1 and 20')
        .optional()
        .isInt({ min: 1, max: 20 }),
    body('reserved', 'Reserved must be a boolean')
        .optional()
        .isBoolean(),
    body('stars', 'Stars must be between 1 and 5')
        .optional()
        .isIn(['1', '2', '3', '4', '5']),
    body('price', 'Price must be a positive number with up to 2 decimal places')
        .optional()
        .matches(/^\d+(\.\d{1,2})?$/),
    body('description', 'Description must have between 10 and 500 characters')
        .optional()
        .isLength({ min: 10, max: 500 }),
    validateErrorWithoutImg
]

