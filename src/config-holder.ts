import { LoggerOptions } from './interfaces/logger-options.interface'

export type ExtendedLoggerOptions = LoggerOptions & { level: 'debug' | 'warn' | 'info' | 'error' }

const DEFAULT_OPTIONS = {
  traceIdHeader: 'X-B3-TraceId',
}

export interface SubappModuleOptions {
  logger: ExtendedLoggerOptions
  traceIdHeader?: string
  messagesSources?: string | string[]
}

export let irisModuleOptions: SubappModuleOptions

export function setIrisModuleOptions(options: SubappModuleOptions) {
  irisModuleOptions = {...DEFAULT_OPTIONS, ...options}
}

