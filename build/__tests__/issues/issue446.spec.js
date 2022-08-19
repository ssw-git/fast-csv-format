"use strict";
exports.__esModule = true;
var csv = require("../../src");
var __fixtures__1 = require("../__fixtures__");
describe('Issue #446 - https://github.com/C2FO/fast-csv/issues/446', function () {
    it('should not quote a field that contains a single quote if it is not the quote character', function () {
        return new Promise(function (res, rej) {
            var rs = new __fixtures__1.RecordingStream();
            var data = [["a quick' brown fox", 'jumped', 'over the lazy brown "dog"']];
            csv.write(data, {
                headers: ['header1', 'header2', 'header3']
            })
                .pipe(rs)
                .on('error', rej)
                .on('finish', function () {
                expect(rs.data).toEqual([
                    'header1,header2,header3',
                    "\na quick' brown fox,jumped,\"over the lazy brown \"\"dog\"\"\"",
                ]);
                res();
            });
        });
    });
});
