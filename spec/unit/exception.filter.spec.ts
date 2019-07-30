import {Controller, Get, INestApplication} from '@nestjs/common'
import request from 'supertest'
import {TestUtils} from "./test.utils";
import {SubappModule} from "../../src/subapp.module";
import {subappModuleOptionsForTests} from "./subapp-module-options-for-tests";
import {getErrorProvider} from "../../src/subapp.context";

@Controller('/default')
class DefaultEBS {

    @Get('/business')
    public businessException() {
        throw getErrorProvider().createBusinessException('field', 'code')
    }
}

describe('Exception filter', () => {
    let app: INestApplication

    beforeAll(async () => {
        const bootstraped = await TestUtils.bootstrapNestJS({
            imports: [
                SubappModule.forRoot(subappModuleOptionsForTests),
            ],
            controllers: [
                DefaultEBS,
            ],
            providers: [],
        })

        app = bootstraped.app
        await app.init()
    })

    afterAll(async () => {
        await app.close()
        TestUtils.cleanApplication()
    })

    it('should return error 404', () => {
        return request(app.getHttpServer())
            .get('/unknown')
            .expect(404)
    })

    it('should return business error', () => {
        return request(app.getHttpServer())
            .get('/default/business')
            .expect(400)
            .expect(response => {
                TestUtils.expectErreurReturned(response, {field: 'field', code: 'code'})
            })
    })
})
