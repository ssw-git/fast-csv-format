"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
exports.writeToPath = exports.writeToString = exports.writeToBuffer = exports.writeToStream = exports.write = exports.format = exports.FormatterOptions = exports.CsvFormatterStream = void 0;
var util_1 = require("util");
var stream_1 = require("stream");
var fs = require("fs");
var FormatterOptions_1 = require("./FormatterOptions");
var CsvFormatterStream_1 = require("./CsvFormatterStream");
__exportStar(require("./types"), exports);
var CsvFormatterStream_2 = require("./CsvFormatterStream");
__createBinding(exports, CsvFormatterStream_2, "CsvFormatterStream");
var FormatterOptions_2 = require("./FormatterOptions");
__createBinding(exports, FormatterOptions_2, "FormatterOptions");
var format = function (options) {
    return new CsvFormatterStream_1.CsvFormatterStream(new FormatterOptions_1.FormatterOptions(options));
};
exports.format = format;
var write = function (rows, options) {
    var csvStream = (0, exports.format)(options);
    var promiseWrite = (0, util_1.promisify)(function (row, cb) {
        csvStream.write(row, undefined, cb);
    });
    rows.reduce(function (prev, row) { return prev.then(function () { return promiseWrite(row); }); }, Promise.resolve())
        .then(function () { return csvStream.end(); })["catch"](function (err) {
        csvStream.emit('error', err);
    });
    return csvStream;
};
exports.write = write;
var writeToStream = function (ws, rows, options) { return (0, exports.write)(rows, options).pipe(ws); };
exports.writeToStream = writeToStream;
var writeToBuffer = function (rows, opts) {
    if (opts === void 0) { opts = {}; }
    var buffers = [];
    var ws = new stream_1.Writable({
        write: function (data, enc, writeCb) {
            buffers.push(data);
            writeCb();
        }
    });
    return new Promise(function (res, rej) {
        ws.on('error', rej).on('finish', function () { return res(Buffer.concat(buffers)); });
        (0, exports.write)(rows, opts).pipe(ws);
    });
};
exports.writeToBuffer = writeToBuffer;
var writeToString = function (rows, options) { return (0, exports.writeToBuffer)(rows, options).then(function (buffer) { return buffer.toString(); }); };
exports.writeToString = writeToString;
var writeToPath = function (path, rows, options) {
    var stream = fs.createWriteStream(path, { encoding: 'utf8' });
    return (0, exports.write)(rows, options).pipe(stream);
};
exports.writeToPath = writeToPath;
