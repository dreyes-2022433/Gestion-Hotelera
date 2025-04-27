import { body } from "express-validator";
import { validateErrorWithoutImg } from "./validate.error.js";
import { objectIdValid } from "./db.validators.js";

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

/*----------------------------- EVENT -------------------------------------*/
export const validAddEvent = [
    body('eventType', 'Event Type cannot be empty')
        .notEmpty()
        .isIn(['CONFERENCE', 'BUSINESS MEETING', 'MARRIAGE', 'BIRTHDAY PARTY', 'ANNIVERSARY', 'BABY SHOWER', 'FAMILY REUNION', 'CULTURA FESTIVAL', 'RELIGIOUS EVENTS'])
        .withMessage('Event type must be valid'),
    body('hotel', 'Hotel cannot be empty')
        .notEmpty()
        .custom(objectIdValid),
    body('booker', 'Booker cannot be empty')
        .notEmpty()
        .custom(objectIdValid),
    body('guests', 'Guests cannot be empty')
        .notEmpty()
        .isInt({ min: 0 })
        .withMessage('Guests cannot be negative'),
    validateErrorWithoutImg
]

export const validAddService = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('price', 'Price cannot be empty')
        .notEmpty()
        .isInt({ min: 0 })
        .withMessage('Price cannot be negative'),
    body('description', 'Description cannot be empty')
        .notEmpty(),
    validateErrorWithoutImg
]

export const validUpdateEvent = [
    body('eventType', 'Event Type cannot be empty')
        .optional()
        .notEmpty()
        .isIn(['CONFERENCE', 'BUSINESS MEETING', 'MARRIAGE', 'BIRTHDAY PARTY', 'ANNIVERSARY', 'BABY SHOWER', 'FAMILY REUNION', 'CULTURA FESTIVAL', 'RELIGIOUS EVENTS'])
        .withMessage('Event type must be valid'),
    body('hotel', 'Hotel cannot be empty')
        .optional()
        .notEmpty()
        .custom(objectIdValid),
    body('booker', 'Booker cannot be empty')
        .optional()
        .notEmpty()
        .custom(objectIdValid),
    body('guests', 'Guests cannot be empty')
        .optional()
        .notEmpty()
        .isInt({ min: 0 })
        .withMessage('Guests cannot be negative'),
    body('status', 'Status cannot be empty')
        .optional()
        .notEmpty(),
    validateErrorWithoutImg
]