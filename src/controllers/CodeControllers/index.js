import services from '../../services'
import { handleError } from '../../helpers/error'
import { validationResult } from 'express-validator'

const {
  CodeServices: { GenerateNewCode, ListCodes },
} = services

const controller = {
  generateCodeHandler: async (req, res) => {
    const { codeId } = req.params
    const validationError = validationResult(req)
    if (validationError.errors.length) {
      handleError(
        {
          statusCode: 400,
          message: 'Input error',
          errors: validationError.errors,
        },
        res
      )
    } else {
      const { playDate, time } = req.body
      const payload = {
        playDate,
        time,
      }
      const query = await GenerateNewCode(codeId, payload)
      if (query) {
        if (!query.success) {
          handleError(query, res)
        } else {
          res.status(query.statusCode).json(query)
        }
      } else {
        handleError({ statusCode: 500, message: 'Internal server error' }, res)
      }
    }
  },
  listCodeHandler: async (req, res) => {
    const query = await ListCodes()
    if (query) {
      if (!query.success) {
        handleError(query, res)
      } else {
        res.status(query.statusCode).json(query)
      }
    } else {
      handleError({ statusCode: 500, message: 'Internal server error' }, res)
    }
  },
}

export { controller }
