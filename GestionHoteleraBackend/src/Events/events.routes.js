import { Router } from "express"
import { addEvent, addGuest, addService, deleteEvent, getEvents, updateEvent } from "./events.controller.js"

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

api.post(
    '/addGuest/:idEvent',
    addGuest
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