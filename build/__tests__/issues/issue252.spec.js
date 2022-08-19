"use strict";
exports.__esModule = true;
var csv = require("../../src");
var __fixtures__1 = require("../__fixtures__");
describe('Issue #252 - https://github.com/C2FO/fast-csv/issues/252', function () {
    it('should keep the original row', function () {
        return new Promise(function (res, rej) {
            var rs = new __fixtures__1.RecordingStream();
            var data = [
                ['a', 'b', 'c'],
                ['d', 'e', 'f'],
            ];
            csv.write(data, {
                headers: ['header1', 'header2', 'header3']
            })
                .pipe(rs)
                .on('error', rej)
                .on('finish', function () {
                expect(rs.data.join('')).toBe('header1,header2,header3\na,b,c\nd,e,f');
                res();
            });
        });
    });
});
