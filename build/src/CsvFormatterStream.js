"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.CsvFormatterStream = void 0;
var stream_1 = require("stream");
var formatter_1 = require("./formatter");
var CsvFormatterStream = /** @class */ (function (_super) {
    __extends(CsvFormatterStream, _super);
    function CsvFormatterStream(formatterOptions) {
        var _this = _super.call(this, { writableObjectMode: formatterOptions.objectMode }) || this;
        _this.hasWrittenBOM = false;
        _this.formatterOptions = formatterOptions;
        _this.rowFormatter = new formatter_1.RowFormatter(formatterOptions);
        // if writeBOM is false then set to true
        // if writeBOM is true then set to false by default so it is written out
        _this.hasWrittenBOM = !formatterOptions.writeBOM;
        return _this;
    }
    CsvFormatterStream.prototype.transform = function (transformFunction) {
        this.rowFormatter.rowTransform = transformFunction;
        return this;
    };
    CsvFormatterStream.prototype._transform = function (row, encoding, cb) {
        var _this = this;
        var cbCalled = false;
        try {
            if (!this.hasWrittenBOM) {
                this.push(this.formatterOptions.BOM);
                this.hasWrittenBOM = true;
            }
            this.rowFormatter.format(row, function (err, rows) {
                if (err) {
                    cbCalled = true;
                    return cb(err);
                }
                if (rows) {
                    rows.forEach(function (r) {
                        _this.push(Buffer.from(r, 'utf8'));
                    });
                }
                cbCalled = true;
                return cb();
            });
        }
        catch (e) {
            if (cbCalled) {
                throw e;
            }
            cb(e);
        }
    };
    CsvFormatterStream.prototype._flush = function (cb) {
        var _this = this;
        this.rowFormatter.finish(function (err, rows) {
            if (err) {
                return cb(err);
            }
            if (rows) {
                rows.forEach(function (r) {
                    _this.push(Buffer.from(r, 'utf8'));
                });
            }
            return cb();
        });
    };
    return CsvFormatterStream;
}(stream_1.Transform));
exports.CsvFormatterStream = CsvFormatterStream;
