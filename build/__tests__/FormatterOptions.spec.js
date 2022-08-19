"use strict";
exports.__esModule = true;
var FormatterOptions_1 = require("../src/FormatterOptions");
describe('FormatterOptions', function () {
    var createOptions = function (opts) {
        if (opts === void 0) { opts = {}; }
        return new FormatterOptions_1.FormatterOptions(opts);
    };
    describe('#objectMode', function () {
        it('should have default objectMode', function () {
            expect(createOptions().objectMode).toBe(true);
        });
        it('should accept a boolean objectMode', function () {
            expect(createOptions({ objectMode: true }).objectMode).toBe(true);
            expect(createOptions({ objectMode: false }).objectMode).toBe(false);
        });
    });
    describe('#delimiter', function () {
        it('should have default delimiter', function () {
            expect(createOptions().delimiter).toBe(',');
        });
        it('should accept a custom delimiter', function () {
            expect(createOptions({ delimiter: '\t' }).delimiter).toBe('\t');
        });
    });
    describe('#rowDelimiter', function () {
        it('should have default rowDelimiter', function () {
            expect(createOptions().rowDelimiter).toBe('\n');
        });
        it('should accept a custom rowDelimiter', function () {
            expect(createOptions({ rowDelimiter: '\r\n' }).rowDelimiter).toBe('\r\n');
        });
    });
    describe('#quote', function () {
        it('should set a default quote value', function () {
            expect(createOptions().quote).toBe('"');
        });
        it('should accept an alternate quote', function () {
            expect(createOptions({ quote: '$' }).quote).toBe('$');
        });
        it('if the set to true the default quote should be used', function () {
            expect(createOptions({ quote: true }).quote).toBe('"');
        });
        it('if the set to false the quote should be empty', function () {
            expect(createOptions({ quote: false }).quote).toBe('');
        });
    });
    describe('#escape', function () {
        it('should set the escape character to the default quote value if not specified', function () {
            expect(createOptions().escape).toBe('"');
        });
        it('should set the escape character to the quote value if specified', function () {
            expect(createOptions({ quote: '$' }).escape).toBe('$');
        });
        it('should accept an alternate escape', function () {
            expect(createOptions({ escape: '%' }).escape).toBe('%');
        });
    });
    describe('#quoteColumns', function () {
        it('should set the quoteColumns to false', function () {
            expect(createOptions().quoteColumns).toBe(false);
        });
        it('should set the quoteColumns to true if specified', function () {
            expect(createOptions({ quoteColumns: true }).quoteColumns).toBe(true);
        });
        it('should set the quoteColumns to an array if specified', function () {
            expect(createOptions({ quoteColumns: [true, true, true] }).quoteColumns).toEqual([true, true, true]);
        });
        it('should set the quoteColumns to an object if specified', function () {
            expect(createOptions({ quoteColumns: { a: true, b: false } }).quoteColumns).toEqual({
                a: true,
                b: false
            });
        });
        it('should set quoteHeaders to quoteColumns if quoteHeaders is not specified and quoteColumns is', function () {
            expect(createOptions({ quoteColumns: true }).quoteHeaders).toBe(true);
            expect(createOptions({ quoteColumns: [true, true, true] }).quoteHeaders).toEqual([true, true, true]);
            expect(createOptions({ quoteColumns: { a: true, b: false } }).quoteHeaders).toEqual({
                a: true,
                b: false
            });
        });
    });
    describe('#quoteHeaders', function () {
        it('should set the quoteHeaders to false', function () {
            expect(createOptions().quoteHeaders).toBe(false);
        });
        it('should set the quoteHeaders to true if specified', function () {
            expect(createOptions({ quoteHeaders: true }).quoteHeaders).toBe(true);
        });
        it('should set the quoteHeaders to an array if specified', function () {
            expect(createOptions({ quoteHeaders: [true, true, true] }).quoteHeaders).toEqual([true, true, true]);
        });
        it('should set the quoteHeaders to an object if specified', function () {
            expect(createOptions({ quoteHeaders: { a: true, b: false } }).quoteHeaders).toEqual({
                a: true,
                b: false
            });
        });
    });
    describe('#headers', function () {
        it('should have default headers', function () {
            expect(createOptions().headers).toBeNull();
        });
        it('should accept an array of headers', function () {
            expect(createOptions({ headers: ['1', '2', '3'] }).headers).toEqual(['1', '2', '3']);
        });
        it('should accept an boolean and set headers to null', function () {
            expect(createOptions({ headers: true }).headers).toBeNull();
        });
        it('should set hasHeaders provided to true if headers is provided as an array', function () {
            expect(createOptions({ headers: ['1', '2', '3'] }).shouldWriteHeaders).toBe(true);
        });
        it('should set hasHeaders provided to false if headers is provided as a boolean', function () {
            expect(createOptions({ headers: true }).shouldWriteHeaders).toBe(true);
        });
    });
    describe('#shouldWriteHeaders', function () {
        it('should set to true if headers is true', function () {
            expect(createOptions({ headers: true }).shouldWriteHeaders).toBe(true);
        });
        it('should set to false if headers is true and writeHeaders is false', function () {
            expect(createOptions({ headers: true, writeHeaders: false }).shouldWriteHeaders).toBe(false);
        });
        it('should set to true if headers is true and writeHeaders is true', function () {
            expect(createOptions({ headers: true, writeHeaders: true }).shouldWriteHeaders).toBe(true);
        });
        it('should set to true if headers is an array', function () {
            expect(createOptions({ headers: ['h1', 'h2'] }).shouldWriteHeaders).toBe(true);
        });
        it('should set to false if headers is an array and writeHeaders is false', function () {
            expect(createOptions({ headers: ['h1', 'h2'], writeHeaders: false }).shouldWriteHeaders).toBe(false);
        });
        it('should set to true if headers is an array and writeHeaders is true', function () {
            expect(createOptions({ headers: ['h1', 'h2'], writeHeaders: true }).shouldWriteHeaders).toBe(true);
        });
        it('should set to false if headers is not defined', function () {
            expect(createOptions({}).shouldWriteHeaders).toBe(false);
        });
        it('should set to false if headers is not defined and writeHeaders is true', function () {
            expect(createOptions({ writeHeaders: true }).shouldWriteHeaders).toBe(false);
        });
    });
    describe('#includeEndRowDelimiter', function () {
        it('should set includeEndRowDelimiter to false by default', function () {
            expect(createOptions().includeEndRowDelimiter).toBe(false);
        });
        it('should set to true if the includeEndRowDelimiter is specified', function () {
            expect(createOptions({ includeEndRowDelimiter: true }).includeEndRowDelimiter).toBe(true);
        });
    });
    describe('#writeBOM', function () {
        it('should set writeBOM to false by default', function () {
            expect(createOptions().writeBOM).toBe(false);
        });
        it('should set to true if the writeBOM is specified', function () {
            expect(createOptions({ writeBOM: true }).writeBOM).toBe(true);
        });
    });
    describe('#alwaysWriteHeaders', function () {
        it('should set alwaysWriteHeaders to false by default', function () {
            expect(createOptions().alwaysWriteHeaders).toBe(false);
        });
        it('should set to provided value if the alwaysWriteHeaders is specified', function () {
            expect(createOptions({ alwaysWriteHeaders: true }).alwaysWriteHeaders).toBe(true);
        });
    });
});
