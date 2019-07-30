import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import express from 'express'
import { Observable } from 'rxjs'
import { irisModuleOptions } from '../config-holder'
import { ClsProvider, LoggerProvider } from '../providers'

@Injectable()
export class TraceContextInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerProvider, private readonly clsManager: ClsProvider) {
  }

  public intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
    const request: express.Request = context.switchToHttp().getRequest()
    this.clsManager.bindEmitter(request)
    this.clsManager.bindEmitter(context.switchToHttp().getResponse())
    return this.clsManager.runPromise(() => {
      if (irisModuleOptions.traceIdHeader && request.headers && request.headers[irisModuleOptions.traceIdHeader.toLowerCase()]) {
        const headerFound = request.headers[irisModuleOptions.traceIdHeader.toLowerCase()]
        this.logger.setTraceId(Array.isArray(headerFound) ? (headerFound! as string[]).find(t => t !== undefined) as string : headerFound as string)
      }
      return Promise.resolve(next.handle())
    })

  }

}
