import { Router } from 'express'
import {
  registerReport,
  getAllReports,
  getOneReport,
  updateReport,
  deleteReport
} from './report.controller.js'

const router = Router()

router.post(
    '/register',
     registerReport
)

router.get(
    '/', 
    getAllReports
)

router.get(
    '/:id',
     getOneReport
)

router.put(
    '/:id',
     updateReport
)

router.delete(
    '/:id',
     deleteReport
)

export default router
