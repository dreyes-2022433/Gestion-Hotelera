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

/*----------------------------- RESERVATION -------------------------------------*/

export const validRegisterReservation = [
    body('type', 'Reservation type cannot be empty')
        .notEmpty()
        .isIn(['Habitacion', 'Hotel']).withMessage('Reservation type must be valid'),
    body('user', 'User cannot be empty')
        .notEmpty()
        .custom(objectIdValid),
    body('startDate', 'Start date cannot be empty')
        .notEmpty()
        .isISO8601().withMessage('Start date must be a valid date'),
    
    body('endDate', 'End date cannot be empty')
        .notEmpty()
        .isISO8601().withMessage('End date must be a valid date'),
    body('description', 'Description cannot be empty')
        .notEmpty()
        .isLength({ max: 300 }).withMessage('Description cannot be longer than 300 characters'),
    validateErrorWithoutImg
]

export const validUpdateReservation = [
    body('startDate', 'Start date cannot be empty')
        .optional()
        .isISO8601().withMessage('Start date must be a valid date'),
    body('endDate', 'End date cannot be empty')
        .optional()
        .isISO8601().withMessage('End date must be a valid date'),
    body('description', 'Description cannot be empty')
        .optional()
        .isLength({ max: 300 }).withMessage('Description cannot be longer than 300 characters'),
    validateErrorWithoutImg
]

/*--------------------------------------FACTURA--------------------------- */

export const validFactura = [
    body('user', 'User cannot be empty')
        .notEmpty()
        .custom(objectIdValid),
    body('hotel', 'Hotel cannot be empty')
        .notEmpty()
        .custom(objectIdValid),
    body('event', 'Event cannot be empty')
        .notEmpty()
        .custom(objectIdValid),
    body('reservation', 'Reservation cannot be empty')
        .notEmpty()
        .custom(objectIdValid),
    validateErrorWithoutImg
]

export const validUpdateFactura = [
    body('user', 'User cannot be empty')
        .optional()
        .notEmpty()
        .custom(objectIdValid),
    body('hotel', 'Hotel cannot be empty')
        .optional()
        .notEmpty()
        .custom(objectIdValid),
    body('event', 'Event cannot be empty')
        .optional()
        .notEmpty()
        .custom(objectIdValid),
    body('reservation', 'Reservation cannot be empty')
        .optional()
        .notEmpty()
        .custom(objectIdValid),
    validateErrorWithoutImg
]

/*----------------------------- USER -------------------------------------*/
export const validRegisterUser = [
    body('name', 'Name cannot be empty and must not exceed 25 characters')
        .notEmpty()
        .isLength({ max: 25 }),
    body('surname', 'Surname cannot be empty and must not exceed 25 characters')
        .notEmpty()
        .isLength({ max: 25 }),
    body('username', 'Username cannot be empty and must not exceed 25 characters')
        .notEmpty()
        .isLength({ max: 25 }),
    body('email', 'Email cannot be empty and must not exceed 50 characters')
        .notEmpty()
        .isLength({ max: 50 }),
    body('phone', 'Phone cannot be empty and must not exceed 15 characters')
        .notEmpty()
        .isLength({ max: 15 }),
    body('password', 'Password must be at least 8 characters long')
        .notEmpty()
        .isLength({ min: 8 }),
    body('role', 'Role must be CLIENT or ADMIN')
        .notEmpty()
        .isIn(['CLIENT', 'ADMIN']),
    validateErrorWithoutImg
]

export const validUpdateUser = [
    body('name', 'Name must not exceed 25 characters')
        .optional()
        .isLength({ max: 25 }),
    body('surname', 'Surname must not exceed 25 characters')
        .optional()
        .isLength({ max: 25 }),
    body('username', 'Username must not exceed 25 characters')
        .optional()
        .isLength({ max: 25 }),
    body('email', 'Email must not exceed 50 characters')
        .optional()
        .isLength({ max: 50 }),
    body('phone', 'Phone must not exceed 15 characters')
        .optional()
        .isLength({ max: 15 }),
    body('password', 'Password must be at least 8 characters long')
        .optional()
        .isLength({ min: 8 }),
    body('role', 'Role must be CLIENT or ADMIN')
        .optional()
        .isIn(['CLIENT', 'ADMIN']),
    validateErrorWithoutImg
]

/*----------------------------- ROOM -------------------------------------*/
export const validRegisterRoom = [
    body('number', 'Room number cannot be empty and must not exceed 10 characters')
        .notEmpty()
        .isLength({ max: 10 }),
    body('capacity', 'Capacity must be a number between 1 and 20')
        .notEmpty()
        .isInt({ min: 1, max: 20 }),
    body('stars', 'Stars must be between 1 and 5')
        .notEmpty()
        .isIn(['1', '2', '3', '4', '5']),
    body('price', 'Price must be a positive number and can have up to 2 decimals')
        .notEmpty()
        .matches(/^\d+(\.\d{1,2})?$/),
    body('description', 'Description must be between 10 and 500 characters')
        .notEmpty()
        .isLength({ min: 10, max: 500 }),
    validateErrorWithoutImg
]

export const validUpdateRoom = [
    body('number', 'Room number is optional but must not exceed 10 characters')
        .optional()
        .isLength({ max: 10 }),
    body('capacity', 'Capacity is optional and must be a number between 1 and 20')
        .optional()
        .isInt({ min: 1, max: 20 }),
    body('stars', 'Stars is optional but must be between 1 and 5')
        .optional()
        .isIn(['1', '2', '3', '4', '5']),
    body('price', 'Price is optional, must be positive and can have up to 2 decimals')
        .optional()
        .matches(/^\d+(\.\d{1,2})?$/),
    body('description', 'Description is optional and must be between 10 and 500 characters')
        .optional()
        .isLength({ min: 10, max: 500 }),
    validateErrorWithoutImg
]
