import {AppException} from './AppException'
import {ErrorDO} from "./ErrorDO";

export class BusinessException extends AppException {
    constructor(errors: ErrorDO[] | ErrorDO) {
        super(errors)
        Object.setPrototypeOf(this, BusinessException.prototype)
    }
}
