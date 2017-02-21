"use strict";
var chai_1 = require("chai");
var testmodel = require("../src/model/IWord");
describe("IWord", function () {
    it('getWordById', function () {
        var prom = new Promise(function (resolver, reject) {
        });
        testmodel.getWordById('58a5bd24bbe1c24472157e78', function (word) {
            chai_1.expect(word.word).to.be.equal('aceitoso');
        });
    });
});
