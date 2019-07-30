import express from 'express'
import { Logger } from 'winston'
import {
  BusinessException,
  EntityNotFoundBusinessException,
  ErrorDO,
  SecurityException,
  TechnicalException
} from "../exception";


/**
 * Error handler, log the error and return the good status
 */
export const errorHandler = (logger: Logger) => {
  return (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (res.headersSent) {
      return next(err)
    }
    const msg = err.data || err.message
    logger.error(`${msg} : ${err.stack}`)
    let status = 500
    let result = {
      errors: err.errors,
    }

    // init status
    switch (err.constructor) {
      case EntityNotFoundBusinessException:
        status = 404
        break
      case BusinessException:
        status = 400
        break
      case TechnicalException:
        status = 500
        break
      case SecurityException:
        status = result.errors.find((e: ErrorDO) => e.field.startsWith('security.authentication')) !== undefined ? 401 : 403
        logger.error(JSON.stringify(result))
        break
      default:
        result = { errors: [new ErrorDO('', 'error', msg)] }
    }

    res.status(status).send(result)
  }
}
