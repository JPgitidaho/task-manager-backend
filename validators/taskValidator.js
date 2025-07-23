import { body } from 'express-validator'

export const taskValidator = [
  body('title')
    .notEmpty()
    .withMessage('El título es obligatorio')
    .isLength({ max: 100 })
    .withMessage('El título no puede tener más de 100 caracteres'),

  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('La descripción no puede tener más de 500 caracteres'),

  body('completed')
    .optional()
    .isBoolean()
    .withMessage('El campo completed debe ser true o false')
]
