/// <reference path="../../typings/browser.d.ts" />
/// <reference path="../../typings/index.d.ts" />
var expect = chai.expect;
describe('Extract data attributes', function () {
    // inject the HTML fixture for the tests
    describe("1. Switch on", function () {
        before(function () {
            var fixture = $("<select id=\"elem1\" data-opt-prefix-param=\"someParam\"></select>");
            $(document.body).append(fixture);
        });
        it('1.1. Exists in context', function () {
            expect(jQInitializer.getDataOptions).be.a("function");
        });
        it('1.2. Exists in jQuery', function () {
            expect($.fn.getDataOptions).be.a("function");
        });
        it('1.3. Extract "param" for "prefix" by context', function () {
            var element = $("#elem1");
            var params = jQInitializer.getDataOptions(element, "prefix");
            expect(params.param).to.equal("someParam");
        });
        it('1.4. Extract "param" for "prefix" with jquery', function () {
            var params = $("#elem1").getDataOptions("prefix");
            expect(params.param).to.equal("someParam");
        });
    });
    describe("2. Extract params with types", function () {
        before(function () {
            var fixture = $("<select id=\"elem2\" data-opt-prefix-bool=\"true\" data-opt-prefix-num=\"1\" data-opt-prefix-array=\"[1,2]\" data-opt-prefix-obj='{\"a\":1}'></select>");
            $(document.body).append(fixture);
        });
        it('2.1. Boolean', function () {
            var params = $("#elem2").getDataOptions("prefix");
            expect(params.bool).to.be.a("boolean");
        });
        it('2.2. Number', function () {
            var params = $("#elem2").getDataOptions("prefix");
            expect(params.num).to.be.a("number");
        });
        it('2.3. Array', function () {
            var params = $("#elem2").getDataOptions("prefix");
            expect(params.array).is.an("array");
        });
        it('2.4. Object', function () {
            var params = $("#elem2").getDataOptions("prefix");
            expect(params.obj).is.an("object");
        });
    });
});
