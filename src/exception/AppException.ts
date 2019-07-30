import {ErrorDO} from "./ErrorDO";

export class AppException extends Error {
    public errors: ErrorDO[]

    constructor(errors: ErrorDO[] | ErrorDO) {
        super((Array.isArray(errors) ? errors : [errors]).map(e => e.label).join(' and '))
        this.errors = Array.isArray(errors) ? errors : [errors]

        Object.setPrototypeOf(this, AppException.prototype)
    }
}
