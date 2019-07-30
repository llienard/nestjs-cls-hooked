import {AppException} from './AppException'
import {ErrorDO} from "./ErrorDO";

export class SecurityException extends AppException {
    constructor(errors: ErrorDO[] | ErrorDO) {
        super(errors)
        Object.setPrototypeOf(this, SecurityException.prototype)
    }
}
