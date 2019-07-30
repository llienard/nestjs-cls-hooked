import {INestApplicationContext} from '@nestjs/common'
import winston from 'winston'
import {ErrorProvider, LoggerProvider} from './providers'
import {ErrorDO, TechnicalException} from "./exception";

/**
 * NestJS application context
 */
let applicationContext: INestApplicationContext | null

/**
 * Store NestJS application context globally
 */
export function setApplicationContext(context: INestApplicationContext) {
    if (applicationContext) {
        throw new Error('nestjs application context already exists ! Please use this method only one time')
    }
    applicationContext = context
}

export function cleanApplicationContext() {
    applicationContext = null
}

/**
 * Return NestJS application context
 */
export function getApplicationContext(): INestApplicationContext {
    if (!applicationContext) {
        throw new TechnicalException(new ErrorDO('applicationContext', 'null', 'setApplicationContext() has not been called'), new Error())
    }
    return applicationContext
}

export function getErrorProvider(): ErrorProvider {
    return getApplicationContext().get(ErrorProvider)
}

export function getLoggerProvider(): LoggerProvider {
    return getApplicationContext().get(LoggerProvider)
}

export function getLogger(): winston.Logger {
    return getLoggerProvider().logger
}
