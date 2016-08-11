/// <reference path="../../typings/browser.d.ts" />
/// <reference path="../../typings/index.d.ts" />
var expect = chai.expect;
describe('JQuery UI', function () {
    describe("Selectmenu", function () {
    });
    // inject the HTML fixture for the tests
    before(function () {
        var fixture = $("<select id=\"selectmenu\" data-jq-initialize=\"selectmenu\">\n                            <option>A</option>\n                            <option>B</option>\n                        </select>");
        $(document.body).append(fixture);
    });
    it('1. Initialize with jquery', function () {
        var element = $("#selectmenu");
        element.jqInit();
        expect(element.data("ui-selectmenu")).not.to.be.undefined;
    });
});
