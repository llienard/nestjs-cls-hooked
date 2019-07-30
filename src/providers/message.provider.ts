import { Injectable } from '@nestjs/common'
import { MessageFactory } from '../commons'
import { irisModuleOptions } from '../config-holder'

export let messageSource: MessageProvider

@Injectable()
export class MessageProvider {
  private messageFactory: MessageFactory

  constructor() {
    this.messageFactory = new MessageFactory({ resources: irisModuleOptions.messagesSources })
    messageSource = this
  }

  public has(key: string): boolean {
    return this.messageFactory.has(key)
  }

  public get(key: string, datas?: object): string {
    return this.messageFactory.get(key, datas) || `missing key ${key} in properties`
  }

}
