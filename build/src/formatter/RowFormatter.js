"use strict";
exports.__esModule = true;
exports.RowFormatter = void 0;
var lodash_isfunction_1 = require("lodash.isfunction");
var lodash_isequal_1 = require("lodash.isequal");
var FieldFormatter_1 = require("./FieldFormatter");
var types_1 = require("../types");
var RowFormatter = /** @class */ (function () {
    function RowFormatter(formatterOptions) {
        this.rowCount = 0;
        this.formatterOptions = formatterOptions;
        this.fieldFormatter = new FieldFormatter_1.FieldFormatter(formatterOptions);
        this.headers = formatterOptions.headers;
        this.shouldWriteHeaders = formatterOptions.shouldWriteHeaders;
        this.hasWrittenHeaders = false;
        if (this.headers !== null) {
            this.fieldFormatter.headers = this.headers;
        }
        if (formatterOptions.transform) {
            this.rowTransform = formatterOptions.transform;
        }
    }
    RowFormatter.isRowHashArray = function (row) {
        if (Array.isArray(row)) {
            return Array.isArray(row[0]) && row[0].length === 2;
        }
        return false;
    };
    RowFormatter.isRowArray = function (row) {
        return Array.isArray(row) && !this.isRowHashArray(row);
    };
    // get headers from a row item
    RowFormatter.gatherHeaders = function (row) {
        if (RowFormatter.isRowHashArray(row)) {
            // lets assume a multi-dimesional array with item 0 being the header
            return row.map(function (it) { return it[0]; });
        }
        if (Array.isArray(row)) {
            return row;
        }
        return Object.keys(row);
    };
    // eslint-disable-next-line @typescript-eslint/no-shadow
    RowFormatter.createTransform = function (transformFunction) {
        if ((0, types_1.isSyncTransform)(transformFunction)) {
            return function (row, cb) {
                var transformedRow = null;
                try {
                    transformedRow = transformFunction(row);
                }
                catch (e) {
                    return cb(e);
                }
                return cb(null, transformedRow);
            };
        }
        return function (row, cb) {
            transformFunction(row, cb);
        };
    };
    Object.defineProperty(RowFormatter.prototype, "rowTransform", {
        set: function (transformFunction) {
            if (!(0, lodash_isfunction_1["default"])(transformFunction)) {
                throw new TypeError('The transform should be a function');
            }
            this._rowTransform = RowFormatter.createTransform(transformFunction);
        },
        enumerable: false,
        configurable: true
    });
    RowFormatter.prototype.format = function (row, cb) {
        var _this = this;
        this.callTransformer(row, function (err, transformedRow) {
            if (err) {
                return cb(err);
            }
            if (!row) {
                return cb(null);
            }
            var rows = [];
            if (transformedRow) {
                var _a = _this.checkHeaders(transformedRow), shouldFormatColumns = _a.shouldFormatColumns, headers = _a.headers;
                if (_this.shouldWriteHeaders && headers && !_this.hasWrittenHeaders) {
                    rows.push(_this.formatColumns(headers, true));
                    _this.hasWrittenHeaders = true;
                }
                if (shouldFormatColumns) {
                    var columns = _this.gatherColumns(transformedRow);
                    rows.push(_this.formatColumns(columns, false));
                }
            }
            return cb(null, rows);
        });
    };
    RowFormatter.prototype.finish = function (cb) {
        var rows = [];
        // check if we should write headers and we didnt get any rows
        if (this.formatterOptions.alwaysWriteHeaders && this.rowCount === 0) {
            if (!this.headers) {
                return cb(new Error('`alwaysWriteHeaders` option is set to true but `headers` option not provided.'));
            }
            rows.push(this.formatColumns(this.headers, true));
        }
        if (this.formatterOptions.includeEndRowDelimiter) {
            rows.push(this.formatterOptions.rowDelimiter);
        }
        return cb(null, rows);
    };
    // check if we need to write header return true if we should also write a row
    // could be false if headers is true and the header row(first item) is passed in
    RowFormatter.prototype.checkHeaders = function (row) {
        if (this.headers) {
            // either the headers were provided by the user or we have already gathered them.
            return { shouldFormatColumns: true, headers: this.headers };
        }
        var headers = RowFormatter.gatherHeaders(row);
        this.headers = headers;
        this.fieldFormatter.headers = headers;
        if (!this.shouldWriteHeaders) {
            // if we are not supposed to write the headers then
            // always format the columns
            return { shouldFormatColumns: true, headers: null };
        }
        // if the row is equal to headers dont format
        return { shouldFormatColumns: !(0, lodash_isequal_1["default"])(headers, row), headers: headers };
    };
    // todo change this method to unknown[]
    RowFormatter.prototype.gatherColumns = function (row) {
        if (this.headers === null) {
            throw new Error('Headers is currently null');
        }
        if (!Array.isArray(row)) {
            return this.headers.map(function (header) { return row[header]; });
        }
        if (RowFormatter.isRowHashArray(row)) {
            return this.headers.map(function (header, i) {
                var col = row[i];
                if (col) {
                    return col[1];
                }
                return '';
            });
        }
        // if its a one dimensional array and headers were not provided
        // then just return the row
        if (RowFormatter.isRowArray(row) && !this.shouldWriteHeaders) {
            return row;
        }
        return this.headers.map(function (header, i) { return row[i]; });
    };
    RowFormatter.prototype.callTransformer = function (row, cb) {
        if (!this._rowTransform) {
            return cb(null, row);
        }
        return this._rowTransform(row, cb);
    };
    RowFormatter.prototype.formatColumns = function (columns, isHeadersRow) {
        var _this = this;
        var formattedCols = columns
            .map(function (field, i) { return _this.fieldFormatter.format(field, i, isHeadersRow); })
            .join(this.formatterOptions.delimiter);
        var rowCount = this.rowCount;
        this.rowCount += 1;
        if (rowCount) {
            return [this.formatterOptions.rowDelimiter, formattedCols].join('');
        }
        return formattedCols;
    };
    return RowFormatter;
}());
exports.RowFormatter = RowFormatter;
