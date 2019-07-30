import { DynamicModule, Module } from '@nestjs/common'
import {SubappModuleOptions, irisModuleOptions, setIrisModuleOptions} from './config-holder'
import { LoggingInterceptor, TraceContextInterceptor } from './interceptors'
import { ClsProvider, ErrorProvider, LoggerProvider, MessageProvider } from './providers'

@Module({
  imports: [],
  providers: [
    MessageProvider,
    ErrorProvider,
    LoggerProvider,
    ClsProvider,
    TraceContextInterceptor,
    LoggingInterceptor
  ],
  exports: [
    MessageProvider,
    ErrorProvider,
    LoggerProvider,
    ClsProvider,
    TraceContextInterceptor,
    LoggingInterceptor
  ]
})
export class SubappModule {
  public static forRoot(options: SubappModuleOptions): DynamicModule {
    setIrisModuleOptions(options)
    return {
      module: SubappModule,
      providers: [
        MessageProvider,
        ErrorProvider,
        LoggerProvider,
        ClsProvider,
        TraceContextInterceptor,
        LoggingInterceptor
      ],
      exports: [
        MessageProvider,
        ErrorProvider,
        LoggerProvider,
        ClsProvider,
        TraceContextInterceptor,
        LoggingInterceptor
      ]
    }
  }

  constructor() {
    if (!irisModuleOptions) {
      throw new Error('You must import AppModule by using AppModule.forRoot()')
    }
  }
}
