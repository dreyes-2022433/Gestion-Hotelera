import { Router } from "express"
import { addEvent, addService, deleteEvent, getEvents, updateEvent } from "./events.controller.js"
import { validAddEvent, validAddService, validUpdateEvent } from "../../helpers/validators.js"

const api = Router()

api.get(
    '/getEvents',
    getEvents
)

api.post(
    '/addEvent',
    [
        validAddEvent
    ],
    addEvent
)

api.post(
    '/addService/:idEvent',
    [
        validAddService
    ],
    addService
)

api.delete(
    '/deleteEvent/:idEvent',
    deleteEvent
)

api.put(
    '/udpateEvent/:idEvent',
    [
        validUpdateEvent
    ],
    updateEvent
)

export default api  