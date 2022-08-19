"use strict";
exports.__esModule = true;
exports.FormatterOptions = void 0;
var FormatterOptions = /** @class */ (function () {
    function FormatterOptions(opts) {
        if (opts === void 0) { opts = {}; }
        var _a;
        this.objectMode = true;
        this.delimiter = ',';
        this.rowDelimiter = '\n';
        this.quote = '"';
        this.escape = this.quote;
        this.quoteColumns = false;
        this.quoteHeaders = this.quoteColumns;
        this.headers = null;
        this.includeEndRowDelimiter = false;
        this.writeBOM = false;
        this.BOM = '\ufeff';
        this.alwaysWriteHeaders = false;
        Object.assign(this, opts || {});
        if (typeof (opts === null || opts === void 0 ? void 0 : opts.quoteHeaders) === 'undefined') {
            this.quoteHeaders = this.quoteColumns;
        }
        if ((opts === null || opts === void 0 ? void 0 : opts.quote) === true) {
            this.quote = '"';
        }
        else if ((opts === null || opts === void 0 ? void 0 : opts.quote) === false) {
            this.quote = '';
        }
        if (typeof (opts === null || opts === void 0 ? void 0 : opts.escape) !== 'string') {
            this.escape = this.quote;
        }
        this.shouldWriteHeaders = !!this.headers && ((_a = opts.writeHeaders) !== null && _a !== void 0 ? _a : true);
        this.headers = Array.isArray(this.headers) ? this.headers : null;
        this.escapedQuote = "".concat(this.escape).concat(this.quote);
    }
    return FormatterOptions;
}());
exports.FormatterOptions = FormatterOptions;
