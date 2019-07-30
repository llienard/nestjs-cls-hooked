/// <reference types="jest" />
declare namespace jest {
    interface Matchers<R> {
        /**
         * Ensures that an array contains an object like argument
         * @param argument
         */
        toContainObjectLike(argument: any): R
    }
}
