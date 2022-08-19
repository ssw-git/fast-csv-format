"use strict";
exports.__esModule = true;
var csv = require("../../src");
var __fixtures__1 = require("../__fixtures__");
describe('Issue #158 - https://github.com/C2FO/fast-csv/issues/158', function () {
    var Place = /** @class */ (function () {
        function Place(id, name) {
            this.id = id;
            this.name = name;
            this.calculatedValue = 0;
        }
        Place.prototype.calculateSomething = function () {
            this.calculatedValue = this.id * 2;
            return this;
        };
        return Place;
    }());
    it('should not write prototype methods in csv', function () {
        return new Promise(function (res, rej) {
            var rs = new __fixtures__1.RecordingStream();
            csv.write([
                new Place(1, 'a').calculateSomething(),
                new Place(2, 'b').calculateSomething(),
                new Place(3, 'c').calculateSomething(),
            ], { headers: true })
                .pipe(rs)
                .on('error', rej)
                .on('finish', function () {
                expect(rs.data.join('')).toBe('id,name,calculatedValue\n1,a,2\n2,b,4\n3,c,6');
                res();
            });
        });
    });
});
