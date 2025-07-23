import express from 'express'
import { register, login } from '../controllers/authController.js'
import { registerValidator, loginValidator } from '../validators/authValidator.js'
import handleValidation from '../middleware/handleValidation.js'

const router = express.Router()

router.post('/register', registerValidator, handleValidation, register)
router.post('/login', loginValidator, handleValidation, login)

export default router
