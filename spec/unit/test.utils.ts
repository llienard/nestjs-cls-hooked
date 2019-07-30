import {INestApplication} from '@nestjs/common'
import {ModuleMetadata} from '@nestjs/common/interfaces'
import {APP_INTERCEPTOR} from '@nestjs/core'
import {Test, TestingModule} from '@nestjs/testing'
import * as request from 'superagent'
import {LoggingInterceptor, TraceContextInterceptor} from "../../src/interceptors";
import {cleanApplicationContext, setApplicationContext} from "../../src/subapp.context";
import {ExceptionFilter} from "../../src/filters";
import './jest.extends'

export class TestUtils {

    public static expectErreurReturned(response: request.Response, ...erreurs: Array<{ field?: string, code?: string, label?: string }>) {
        expect(response.body).toBeDefined()
        expect(response.body.errors).toBeDefined()
        expect(response.body.errors).toBeInstanceOf(Array)
        expect(response.body.errors).toHaveLength(erreurs.length)
        for (const err of erreurs) {
            expect(response.body.errors).toContainObjectLike(err)
        }
    }

    public static async bootstrapNestJS(metadata: ModuleMetadata): Promise<{ app: INestApplication, module: TestingModule }> {
        if (!metadata.providers) {
            metadata.providers = []
        }
        metadata.providers.unshift({
            provide: APP_INTERCEPTOR,
            useClass: TraceContextInterceptor,
        }, {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        })
        const module: TestingModule = await Test.createTestingModule(metadata).compile()
        const app = TestUtils.constructApplicationFromModule(module)
        return {app, module}
    }

    public static constructApplicationFromModule(module: TestingModule) {
        const app = module.createNestApplication()
        setApplicationContext(app)
        app.useGlobalFilters(new ExceptionFilter())
        return app
    }

    public static cleanApplication() {
        cleanApplicationContext()
    }
}
