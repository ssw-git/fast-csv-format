"use strict";
exports.__esModule = true;
var src_1 = require("../../src");
var formatter_1 = require("../../src/formatter");
describe('FieldFormatter', function () {
    var createFormatter = function (formatterOptions) {
        if (formatterOptions === void 0) { formatterOptions = {}; }
        return new formatter_1.FieldFormatter(new src_1.FormatterOptions(formatterOptions));
    };
    describe('#format', function () {
        describe('header columns', function () {
            it('should return the field not quoted if it contains no quotes', function () {
                var formatter = createFormatter();
                expect(formatter.format('header', 0, true)).toEqual('header');
            });
            it('should quote the field and escape quotes if it contains a quote character', function () {
                var formatter = createFormatter();
                expect(formatter.format('hea"d"er', 0, true)).toEqual('"hea""d""er"');
            });
            it('should quote the field and if it contains a rowDelimiter', function () {
                var formatter = createFormatter({ rowDelimiter: '\r\n' });
                expect(formatter.format('hea\r\nder', 0, true)).toEqual('"hea\r\nder"');
            });
            it('should quote the field and if it contains a CR', function () {
                // set row delimiter to something else to ensure it will still quote
                var formatter = createFormatter({ rowDelimiter: '#' });
                expect(formatter.format('hea\rder', 0, true)).toEqual('"hea\rder"');
            });
            it('should quote the field and if it contains a LF', function () {
                // set row delimiter to something else to ensure it will still quote
                var formatter = createFormatter({ rowDelimiter: '#' });
                expect(formatter.format('hea\nder', 0, true)).toEqual('"hea\nder"');
            });
            it('should quote the field and if it contains a CRLF', function () {
                // set row delimiter to something else to ensure it will still quote
                var formatter = createFormatter({ rowDelimiter: '#' });
                expect(formatter.format('hea\r\nder', 0, true)).toEqual('"hea\r\nder"');
            });
            it('should quote the field if quoteHeaders is true', function () {
                var formatter = createFormatter({ quoteHeaders: true });
                expect(formatter.format('header', 0, true)).toEqual('"header"');
            });
            it('should quote the header if quote headers is an array and the index of the header is true in the quoteHeaders array', function () {
                var formatter = createFormatter({ quoteHeaders: [true] });
                expect(formatter.format('header', 0, true)).toEqual('"header"');
            });
            it('should not quote the header if quote headers is an array and the index of the header is false in the quoteHeaders array', function () {
                var formatter = createFormatter({ quoteHeaders: [false] });
                expect(formatter.format('header', 0, true)).toEqual('header');
            });
            it('should quote the header if quoteHeaders is an object and quoteHeaders object has true for the column name', function () {
                var formatter = createFormatter({ quoteHeaders: { header: true }, headers: ['header'] });
                expect(formatter.format('header', 0, true)).toEqual('"header"');
            });
            it('should not quote the header if quoteHeaders is an object and quoteHeaders object has false for the column nam', function () {
                var formatter = createFormatter({ quoteHeaders: { header: false }, headers: ['header'] });
                expect(formatter.format('header', 0, true)).toEqual('header');
            });
            it('should not quote the header if quoteHeaders is an object and quoteHeaders object does not contain the header', function () {
                var formatter = createFormatter({ quoteHeaders: { header2: true }, headers: ['header'] });
                expect(formatter.format('header', 0, true)).toEqual('header');
            });
        });
        describe('non-header columns', function () {
            it('should return the field not quoted if it contains no quotes', function () {
                var formatter = createFormatter();
                expect(formatter.format('col', 0, false)).toEqual('col');
            });
            it('should quote the field and escape quotes if it contains a quote character', function () {
                var formatter = createFormatter();
                expect(formatter.format('c"o"l', 0, false)).toEqual('"c""o""l"');
            });
            it('should quote the field if it contains a rowDelimiter', function () {
                var formatter = createFormatter({ rowDelimiter: '\r\n' });
                expect(formatter.format('col\r\n', 0, false)).toEqual('"col\r\n"');
            });
            it('should quote the field if quoteColumns is true', function () {
                var formatter = createFormatter({ quoteColumns: true });
                expect(formatter.format('col', 0, false)).toEqual('"col"');
            });
            it('should quote the header if quote headers is an array and the index of the header is true in the quoteColumns array', function () {
                var formatter = createFormatter({ quoteColumns: [true] });
                expect(formatter.format('col', 0, false)).toEqual('"col"');
            });
            it('should not quote the header if quote headers is an array and the index of the header is false in the quoteColumns array', function () {
                var formatter = createFormatter({ quoteColumns: [false] });
                expect(formatter.format('col', 0, false)).toEqual('col');
            });
            it('should quote the header if quoteColumns is an object and quoteColumns object has true for the column name', function () {
                var formatter = createFormatter({ quoteColumns: { header: true }, headers: ['header'] });
                expect(formatter.format('col', 0, false)).toEqual('"col"');
            });
            it('should not quote the header if quoteColumns is an object and quoteColumns object has false for the column nam', function () {
                var formatter = createFormatter({ quoteColumns: { header: false }, headers: ['header'] });
                expect(formatter.format('col', 0, false)).toEqual('col');
            });
            it('should not quote the header if quoteColumns is an object and quoteColumns object does not contain the header', function () {
                var formatter = createFormatter({ quoteColumns: { header2: true }, headers: ['header'] });
                expect(formatter.format('col', 0, false)).toEqual('col');
            });
        });
    });
});
