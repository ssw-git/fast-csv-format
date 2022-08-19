"use strict";
exports.__esModule = true;
var __fixtures__1 = require("../__fixtures__");
var src_1 = require("../../src");
describe('Issue #503 - https://github.com/C2FO/fast-csv/issues/503', function () {
    it('should emit all columns after an empty row', function () {
        return new Promise(function (res, rej) {
            var rs = new __fixtures__1.RecordingStream();
            var data = [[], ['something']];
            (0, src_1.write)(data, { quote: false, headers: false, writeHeaders: false })
                .pipe(rs)
                .on('error', rej)
                .on('finish', function () {
                expect(rs.data).toEqual(['\nsomething']);
                res();
            });
        });
    });
    it('should not assume first row is a header if header = false', function () {
        return new Promise(function (res, rej) {
            var rs = new __fixtures__1.RecordingStream();
            var data = [['1'], [], ['1', '2', '3']];
            (0, src_1.write)(data, { quote: false, headers: false, writeHeaders: false })
                .pipe(rs)
                .on('error', rej)
                .on('finish', function () {
                expect(rs.data).toEqual(['1', '\n', '\n1,2,3']);
                res();
            });
        });
    });
});
