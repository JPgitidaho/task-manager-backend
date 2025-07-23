import express from 'express'
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from '../controllers/taskController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import { taskValidator } from '../validators/taskValidator.js'
import handleValidation from '../middleware/handleValidation.js'

const router = express.Router()

router.use(authMiddleware)

router.post('/', taskValidator, handleValidation, createTask)
router.get('/', getTasks)
router.put('/:id', taskValidator, handleValidation, updateTask)
router.delete('/:id', deleteTask)

export default router
