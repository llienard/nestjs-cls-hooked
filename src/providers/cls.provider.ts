import { Injectable } from '@nestjs/common'
import cls from 'cls-hooked'
import { EventEmitter } from 'events'
import uuid from 'uuid'
import { irisModuleOptions } from '../config-holder'

@Injectable()
export class ClsProvider implements cls.Namespace {


  private static TRACE_ID = 'trace-id'
  private static SPAN_ID = 'span-id'

  private cls: cls.Namespace

  private readonly namespace?: string

  constructor() {
    this.namespace = irisModuleOptions && irisModuleOptions.logger && irisModuleOptions.logger.appName ? irisModuleOptions.logger.appName : `namespace${uuid.v4()}`
    this.cls = cls.createNamespace(this.namespace)
  }

  public get(key: string) {
    return this.cls.get(key)
  }

  public set<T>(key: string, value: T): T {
    return this.cls.set(key, value)
  }

  public getTraceId() {
    return this.get(ClsProvider.TRACE_ID)
  }

  public setTraceId(traceId: string) {
    return this.set(ClsProvider.TRACE_ID, traceId)
  }

  public getSpanId() {
    return this.get(ClsProvider.SPAN_ID)
  }

  public setSpanId(spanId: string) {
    return this.set(ClsProvider.SPAN_ID, spanId)
  }

  public run(cb: (...args: any[]) => void) {
    this.cls.run(cb)
  }

  public bindEmitter(emitter: EventEmitter) {
    this.cls.bindEmitter(emitter)
  }

  public runAndReturn<T>(fn: (...args: any[]) => T): T {
    return this.cls.runAndReturn(fn)
  }

  public runPromise<T>(fn: (...args: any[]) => Promise<T>): Promise<T> {
    return this.cls.runPromise(fn)
  }

  // tslint:disable-next-line:ban-types
  public bind<F extends Function>(fn: F, context?: any): F {
    return this.cls.bind(fn, context)
  }

  public createContext() {
    return this.cls.createContext()
  }

  public enter(context: any): void {
    return this.cls.enter(context)
  }

  public exit(context: any): void {
    return this.cls.exit(context)
  }

  get active() {
    return this.cls.active
  }
}
