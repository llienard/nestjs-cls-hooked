import path from 'path'
import PropertiesReader from 'properties-reader'

export interface MessageFactoryOptions {
  resources?: string | string[]
}

export class MessageFactory {
  private messages: PropertiesReader

  constructor(options?: MessageFactoryOptions) {
    this.loadConfig(options)
  }

  public has(key: string): boolean {
    return this.get(key) !== null
  }

  public get(key: string, datas?: object): string {
    let result = this.messages.get(key)
    if (result && datas && typeof datas === 'object') {
      Object.keys(datas).forEach(k => {
          result = result.replace('${' + k + '}', datas[k], 'g')
          result = result.replace('$' + k + '', datas[k], 'g')
        }
      )
    }
    return result
  }

  private loadConfig(options?: MessageFactoryOptions): void {
    this.messages = new PropertiesReader(path.resolve(__dirname + '../../../resources/i18n.properties'))
    if (options && options.resources) {
      for (const resourcePath of (Array.isArray(options.resources) ? options.resources : [options.resources])) {
        this.messages.append(resourcePath)
      }
    }

  }
}
