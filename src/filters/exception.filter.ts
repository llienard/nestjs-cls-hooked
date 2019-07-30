import { ArgumentsHost, Catch, ExceptionFilter as NestExceptionFilter } from '@nestjs/common'
import {errorHandler} from "../middlewares/error-handler.middleware";
import {getLogger} from "../subapp.context";

@Catch()
export class ExceptionFilter implements NestExceptionFilter {
  public catch(exception: unknown, host: ArgumentsHost): any {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    errorHandler(getLogger())(exception, request, response, () => {
      // to nothing
    })
  }

}
