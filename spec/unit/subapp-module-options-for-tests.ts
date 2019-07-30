import path from 'path'
import {SubappModuleOptions} from "../../src/config-holder";

// tslint:disable-next-line:no-var-requires
const pkg = require('../../package.json')

export const subappModuleOptionsForTests: SubappModuleOptions = {
    logger: {
        appName: pkg.name,
        appVersion: pkg.version,
        level: 'debug',
        enableConsole: true
    },
    messagesSources: path.resolve(__dirname, '../resources/i18n-test.properties')
}
