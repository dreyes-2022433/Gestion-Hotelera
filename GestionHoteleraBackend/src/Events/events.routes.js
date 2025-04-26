import { Router } from "express"
import { addEvent, addService, deleteEvent, getEvents, updateEvent } from "./events.controller.js"

const api = Router()

api.get(
    '/getEvents',
    getEvents
)

api.post(
    '/addEvent',
    addEvent
)

api.post(
    '/addService/:idEvent',
    addService
)

api.delete(
    '/deleteEvent/:idEvent',
    deleteEvent
)

api.put(
    '/udpateEvent/:idEvent',
    updateEvent
)

export default api  