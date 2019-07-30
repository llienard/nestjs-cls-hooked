const jestExpect: jest.Expect = (global as any).expect

if (jestExpect !== undefined) {
    jestExpect.extend({
        toContainObjectLike(received: any[], argument: any) {
            const pass = this.equals(received,
                expect.arrayContaining([
                    expect.objectContaining(argument)
                ])
            )

            if (pass) {
                return {
                    message: () => (`expected ${this.utils.printReceived(received)} not to contain object ${this.utils.printExpected(argument)}`),
                    pass: true
                }
            } else {
                return {
                    message: () => (`expected ${this.utils.printReceived(received)} to contain object ${this.utils.printExpected(argument)}`),
                    pass: false
                }
            }
        }

    })
} else {
    // tslint:disable-next-line:no-console
    console.error(
        'Unable to find Jest\'s global expect.' +
        '\nPlease check you have added jest-extended correctly to your jest configuration.' +
        '\nSee https://github.com/jest-community/jest-extended#setup for help.'
    )
}
