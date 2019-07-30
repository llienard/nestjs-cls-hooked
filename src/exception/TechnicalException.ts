import {AppException} from './AppException'
import {ErrorDO} from "./ErrorDO";

export class TechnicalException extends AppException {
    constructor(errors: ErrorDO[] | ErrorDO, causedException: Error) {
        super(errors)
        Object.setPrototypeOf(this, TechnicalException.prototype)
        if (causedException) {
            this.stack += `\nCaused by : ${causedException.stack}`
        }
    }
}
