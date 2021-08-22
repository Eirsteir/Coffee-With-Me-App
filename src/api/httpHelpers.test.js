const rewire = require("rewire")
const httpHelpers = rewire("./httpHelpers")
const isValidStatus = httpHelpers.__get__("isValidStatus")
// @ponicode
describe("isValidStatus", () => {
    test("0", () => {
        let callFunction = () => {
            isValidStatus(199)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            isValidStatus(301)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            isValidStatus(200)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            isValidStatus(250.0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            isValidStatus(300)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            isValidStatus(NaN)
        }
    
        expect(callFunction).not.toThrow()
    })
})
