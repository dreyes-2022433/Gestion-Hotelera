import { Router } from "express"
import {  getFactureById, getAllFactures, updateFacture,deleteFacture } from "./facture.controller.js"

const api = Router()

api.get(
    '/:id',
    getFactureById
)

api.get(
    '/',
    getAllFactures
)

api.put(
    '/:id',
    updateFacture
)

api.delete(
    '/:id',
    deleteFacture
)

export default api