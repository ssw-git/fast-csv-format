"use strict";
exports.__esModule = true;
exports.FieldFormatter = void 0;
var lodash_isboolean_1 = require("lodash.isboolean");
var lodash_isnil_1 = require("lodash.isnil");
var lodash_escaperegexp_1 = require("lodash.escaperegexp");
var FieldFormatter = /** @class */ (function () {
    function FieldFormatter(formatterOptions) {
        this._headers = null;
        this.formatterOptions = formatterOptions;
        if (formatterOptions.headers !== null) {
            this.headers = formatterOptions.headers;
        }
        this.REPLACE_REGEXP = new RegExp(formatterOptions.quote, 'g');
        var escapePattern = "[".concat(formatterOptions.delimiter).concat((0, lodash_escaperegexp_1["default"])(formatterOptions.rowDelimiter), "|\r|\n]");
        this.ESCAPE_REGEXP = new RegExp(escapePattern);
    }
    Object.defineProperty(FieldFormatter.prototype, "headers", {
        set: function (headers) {
            this._headers = headers;
        },
        enumerable: false,
        configurable: true
    });
    FieldFormatter.prototype.shouldQuote = function (fieldIndex, isHeader) {
        var quoteConfig = isHeader ? this.formatterOptions.quoteHeaders : this.formatterOptions.quoteColumns;
        if ((0, lodash_isboolean_1["default"])(quoteConfig)) {
            return quoteConfig;
        }
        if (Array.isArray(quoteConfig)) {
            return quoteConfig[fieldIndex];
        }
        if (this._headers !== null) {
            return quoteConfig[this._headers[fieldIndex]];
        }
        return false;
    };
    FieldFormatter.prototype.format = function (field, fieldIndex, isHeader) {
        var preparedField = "".concat((0, lodash_isnil_1["default"])(field) ? '' : field).replace(/\0/g, '');
        var formatterOptions = this.formatterOptions;
        if (formatterOptions.quote !== '') {
            var shouldEscape = preparedField.indexOf(formatterOptions.quote) !== -1;
            if (shouldEscape) {
                return this.quoteField(preparedField.replace(this.REPLACE_REGEXP, formatterOptions.escapedQuote));
            }
        }
        var hasEscapeCharacters = preparedField.search(this.ESCAPE_REGEXP) !== -1;
        if (hasEscapeCharacters || this.shouldQuote(fieldIndex, isHeader)) {
            return this.quoteField(preparedField);
        }
        return preparedField;
    };
    FieldFormatter.prototype.quoteField = function (field) {
        var quote = this.formatterOptions.quote;
        return "".concat(quote).concat(field).concat(quote);
    };
    return FieldFormatter;
}());
exports.FieldFormatter = FieldFormatter;
