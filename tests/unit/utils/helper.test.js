const { expect } = require('chai')
const helper = require('../../../utils/helper')

//TDD TEST
describe("utils/helper", () => {
    before(async () => {

    })

    describe("#add", () => {
        it("should return number and equal 2",  ()=> {
            let value = helper.add(1, 1)
            expect(value).to.be.a('number')
            expect(value).to.be.equal(2)
        })
    })


})



//running test file
//  windows
//  SET NODE_ENV=test&&mocha --timeout 30000 tests/unit/utils/helper.test.js --exit
//  linux
//  export NODE_ENV=test&&mocha --timeout 30000 tests/unit/utils/helper.test.js --exit
