"use strict";
exports.__esModule = true;
var __fixtures__1 = require("../__fixtures__");
var src_1 = require("../../src");
describe('Issue #97 - https://github.com/C2FO/fast-csv/issues/97', function () {
    it('should keep the original row', function () {
        return new Promise(function (res, rej) {
            var rs = new __fixtures__1.RecordingStream();
            var data = [
                { field1: 'a1"a', field2: 'b1"b' },
                { field1: 'a2"a', field2: 'b2"b' },
            ];
            (0, src_1.write)(data, { quote: false, headers: true })
                .pipe(rs)
                .on('error', rej)
                .on('finish', function () {
                expect(rs.data.join('')).toBe('field1,field2\na1"a,b1"b\na2"a,b2"b');
                res();
            });
        });
    });
});
