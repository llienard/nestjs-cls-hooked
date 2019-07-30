import {Injectable} from '@nestjs/common'
import {MessageProvider} from './message.provider'
import {
    AppException,
    BusinessException,
    EntityNotFoundBusinessException,
    ErrorDO,
    SecurityException,
    TechnicalException
} from "../exception";

@Injectable()
export class ErrorProvider {
    constructor(private readonly messageProvider: MessageProvider) {

    }

    public createBusinessException(field: string, key: string, datas?: object): BusinessException {
        return this.createIrisException(BusinessException, field, key, datas)
    }

    public createSecurityException(field: string, key: string, datas?: object): BusinessException {
        return this.createIrisException(SecurityException, field, key, datas)
    }

    public createEntityNotFoundBusinessException(field: string, id: any, key: string = 'entity.not.found', datas?: object): BusinessException {
        return this.createIrisException(EntityNotFoundBusinessException, field, key, {id, ...datas})
    }

    public createTechnicalException(field: string, key: string, e: Error, datas?: object): BusinessException {
        datas = {field, ...datas}
        return new TechnicalException(new ErrorDO(field, key, this.messageProvider.has(`${key}.${field}`) ? this.messageProvider.get(`${key}.${field}`, datas) : this.messageProvider.get(key, datas)), e)
    }

    private createIrisException<T extends AppException>(exceptionClass: new(erreurs: ErrorDO[] | ErrorDO) => T, field: string, key: string, datas?: object): T {
        datas = {field, ...datas}
        return new exceptionClass(new ErrorDO(field, key, this.messageProvider.has(`${key}.${field}`) ? this.messageProvider.get(`${key}.${field}`, datas) : this.messageProvider.get(key, datas)))
    }
}
