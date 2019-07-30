import {BusinessException} from './BusinessException'
import {ErrorDO} from "./ErrorDO";

export class EntityNotFoundBusinessException extends BusinessException {

    constructor(errors: ErrorDO[] | ErrorDO) {
        super(errors)
        Object.setPrototypeOf(this, EntityNotFoundBusinessException.prototype)
    }
}
