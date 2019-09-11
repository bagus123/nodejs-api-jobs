const request = require("supertest")
const expect = require("chai").expect;
const app = require("../../../app")

//TDD TEST
describe("auth", () => {
    beforeEach(async () => {
        await MODELS.User.deleteMany({})
    })

    describe("POST /register", () => {
        it("should save to database and return user and token", async () => {
            const res = await request(app).post("/auth/register").send({
                name: "test", email: "test@gmail.com", password: "123"
            })
            expect(res.status).to.equal(200)
            expect(res.body.data).to.have.property("token")
            expect(res.body.data.user).to.have.property("_id")
            expect(res.body.data.user).to.have.property("name", "test")

            //check database
            const user = await MODELS.User.findOne({ email: "test@gmail.com"})
            expect(user).to.have.property("name", "test")
        })
    })

    describe("POST /login", () => {
        it("should return user and token", async () => {

            await MODELS.User.create({name: "test", email: "test@gmail.com", password: "123"})
            const res = await request(app).post("/auth/login").send({
                email: "test@gmail.com", password: "123"
            })

            expect(res.status).to.equal(200)
            expect(res.body.data).to.have.property("token")
            expect(res.body.data.user).to.have.property("_id")
            expect(res.body.data.user).to.have.property("name", "test")
        })
    })
})



//running test file
//  windows
//  SET NODE_ENV=test&&mocha --timeout 60000 tests/integration/auth/authController.test.js --exit
//  linux
//  export NODE_ENV=test&mocha --timeout 60000 tests/integration/auth/authController.test.js --exit