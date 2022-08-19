"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var csv = require("../../src");
describe('Issue #77 - https://github.com/C2FO/fast-csv/issues/77', function () {
    it('should sort columns by order of headers defined when formatting a csv', function () {
        return new Promise(function (res, rej) {
            var writable = fs.createWriteStream(path.resolve(__dirname, '__fixtures__/test.csv'), {
                encoding: 'utf8'
            });
            var csvStream = csv.format({ headers: ['second', 'first'] }).on('error', rej);
            writable.on('finish', function () {
                expect(fs.readFileSync(path.resolve(__dirname, '__fixtures__', 'test.csv'))).toEqual(Buffer.from('second,first\n2,1'));
                fs.unlinkSync(path.resolve(__dirname, '__fixtures__', 'test.csv'));
                res();
            });
            csvStream.pipe(writable);
            [{ first: '1', second: '2' }].forEach(function (item) { return csvStream.write(item); });
            csvStream.end();
        });
    });
    it('should write headers even with no data when formatting a csv', function () {
        return new Promise(function (res, rej) {
            var writable = fs.createWriteStream(path.resolve(__dirname, '__fixtures__/test.csv'), {
                encoding: 'utf8'
            });
            var csvStream = csv.format({ headers: ['first', 'second'] }).on('error', rej);
            writable.on('finish', function () {
                expect(fs.readFileSync(path.resolve(__dirname, '__fixtures__/test.csv'))).toEqual(Buffer.from('first,second\n,'));
                fs.unlinkSync(path.resolve(__dirname, '__fixtures__/test.csv'));
                res();
            });
            csvStream.pipe(writable);
            [{}].forEach(function (item) { return csvStream.write(item); });
            csvStream.end();
        });
    });
});
