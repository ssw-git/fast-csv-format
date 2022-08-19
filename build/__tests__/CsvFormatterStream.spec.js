"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var src_1 = require("../src");
var __fixtures__1 = require("./__fixtures__");
describe('CsvFormatterStream', function () {
    var pipeToRecordingStream = function (formatter, rows) {
        return new Promise(function (res, rej) {
            var rs = new __fixtures__1.RecordingStream();
            formatter
                .on('error', function (e) { return rej(e); })
                .pipe(rs)
                .on('finish', function () {
                res(rs.data);
            });
            rows.forEach(function (row) { return formatter.write(row); });
            formatter.end();
        });
    };
    var formatRows = function (rows, options) {
        if (options === void 0) { options = {}; }
        return pipeToRecordingStream(new src_1.CsvFormatterStream(new src_1.FormatterOptions(options)), rows);
    };
    it('should write an array of arrays', function () {
        return expect(formatRows(__fixtures__1.arrayRows, { headers: true })).resolves.toEqual(['a,b', '\na1,b1', '\na2,b2']);
    });
    it('should write an array of objects', function () {
        return expect(formatRows(__fixtures__1.objectRows, { headers: true })).resolves.toEqual(['a,b', '\na1,b1', '\na2,b2']);
    });
    describe('transform option', function () {
        it('should support transforming an array of arrays', function () {
            return expect(formatRows(__fixtures__1.arrayRows, {
                headers: true,
                transform: function (row) {
                    return row.map(function (entry) { return entry.toUpperCase(); });
                }
            })).resolves.toEqual(['A,B', '\nA1,B1', '\nA2,B2']);
        });
        it('should support transforming an array of multi-dimensional arrays', function () {
            return expect(formatRows(__fixtures__1.multiDimensionalRows, {
                headers: true,
                transform: function (row) {
                    return row.map(function (entry) { return [entry[0], entry[1].toUpperCase()]; });
                }
            })).resolves.toEqual(['a,b', '\nA1,B1', '\nA2,B2']);
        });
        it('should support transforming an array of objects', function () {
            return expect(formatRows(__fixtures__1.objectRows, {
                headers: true,
                transform: function (row) {
                    return { A: row.a, B: row.b };
                }
            })).resolves.toEqual(['A,B', '\na1,b1', '\na2,b2']);
        });
    });
    describe('#transform', function () {
        it('should support transforming an array of arrays', function () { return __awaiter(void 0, void 0, void 0, function () {
            var formatter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formatter = new src_1.CsvFormatterStream(new src_1.FormatterOptions({ headers: true })).transform(function (row) {
                            return row.map(function (entry) { return entry.toUpperCase(); });
                        });
                        return [4 /*yield*/, expect(pipeToRecordingStream(formatter, __fixtures__1.arrayRows)).resolves.toEqual(['A,B', '\nA1,B1', '\nA2,B2'])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should support transforming an array of multi-dimensional arrays', function () { return __awaiter(void 0, void 0, void 0, function () {
            var formatter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formatter = new src_1.CsvFormatterStream(new src_1.FormatterOptions({ headers: true })).transform(function (row) { return row.map(function (entry) { return [entry[0], entry[1].toUpperCase()]; }); });
                        return [4 /*yield*/, expect(pipeToRecordingStream(formatter, __fixtures__1.multiDimensionalRows)).resolves.toEqual([
                                'a,b',
                                '\nA1,B1',
                                '\nA2,B2',
                            ])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should support transforming an array of objects', function () { return __awaiter(void 0, void 0, void 0, function () {
            var formatter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formatter = new src_1.CsvFormatterStream(new src_1.FormatterOptions({ headers: true })).transform(function (row) { return ({
                            A: row.a,
                            B: row.b
                        }); });
                        return [4 /*yield*/, expect(pipeToRecordingStream(formatter, __fixtures__1.objectRows)).resolves.toEqual(['A,B', '\na1,b1', '\na2,b2'])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should error if the transform fails', function () { return __awaiter(void 0, void 0, void 0, function () {
            var formatter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formatter = new src_1.CsvFormatterStream(new src_1.FormatterOptions({ headers: true })).transform(function () {
                            throw new Error('Expected error');
                        });
                        return [4 /*yield*/, expect(pipeToRecordingStream(formatter, __fixtures__1.objectRows)).rejects.toThrow('Expected error')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('rowDelimiter option', function () {
        it('should support specifying an alternate row delimiter', function () {
            return expect(formatRows(__fixtures__1.objectRows, {
                headers: true,
                rowDelimiter: '\r\n'
            })).resolves.toEqual(['a,b', '\r\na1,b1', '\r\na2,b2']);
        });
        it('should escape values that contain the alternate row delimiter', function () { return __awaiter(void 0, void 0, void 0, function () {
            var rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rows = [
                            { a: 'a\n1', b: 'b1' },
                            { a: 'a\n2', b: 'b2' },
                        ];
                        return [4 /*yield*/, expect(formatRows(rows, {
                                headers: true,
                                rowDelimiter: '\n'
                            })).resolves.toEqual(['a,b', '\n"a\n1",b1', '\n"a\n2",b2'])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('quoteColumns option', function () {
        describe('quote all columns and headers if quoteColumns is true and quoteHeaders is false', function () {
            var opts = {
                headers: true,
                quoteColumns: true
            };
            it('should work with objects', function () {
                return expect(formatRows(__fixtures__1.objectRows, opts)).resolves.toEqual(['"a","b"', '\n"a1","b1"', '\n"a2","b2"']);
            });
            it('should work with arrays', function () {
                return expect(formatRows(__fixtures__1.arrayRows, opts)).resolves.toEqual(['"a","b"', '\n"a1","b1"', '\n"a2","b2"']);
            });
            it('should work with multi-dimenional arrays', function () {
                return expect(formatRows(__fixtures__1.multiDimensionalRows, opts)).resolves.toEqual([
                    '"a","b"',
                    '\n"a1","b1"',
                    '\n"a2","b2"',
                ]);
            });
        });
        describe('quote headers if quoteHeaders is true and not columns is quoteColumns is undefined', function () {
            var opts = { headers: true, quoteHeaders: true };
            it('should work with objects', function () {
                return expect(formatRows(__fixtures__1.objectRows, opts)).resolves.toEqual(['"a","b"', '\na1,b1', '\na2,b2']);
            });
            it('should work with arrays', function () {
                return expect(formatRows(__fixtures__1.arrayRows, opts)).resolves.toEqual(['"a","b"', '\na1,b1', '\na2,b2']);
            });
            it('should work with multi-dimensional arrays', function () {
                return expect(formatRows(__fixtures__1.multiDimensionalRows, opts)).resolves.toEqual(['"a","b"', '\na1,b1', '\na2,b2']);
            });
        });
        describe('quote columns if quoteColumns is true and not quote headers if quoteHeaders is false', function () {
            var opts = { headers: true, quoteHeaders: false, quoteColumns: true };
            it('should work with objects', function () {
                return expect(formatRows(__fixtures__1.objectRows, opts)).resolves.toEqual(['a,b', '\n"a1","b1"', '\n"a2","b2"']);
            });
            it('should work with arrays', function () {
                return expect(formatRows(__fixtures__1.arrayRows, opts)).resolves.toEqual(['a,b', '\n"a1","b1"', '\n"a2","b2"']);
            });
            it('should work with multi-dimensional arrays', function () {
                return expect(formatRows(__fixtures__1.multiDimensionalRows, opts)).resolves.toEqual(['a,b', '\n"a1","b1"', '\n"a2","b2"']);
            });
        });
        describe('if quoteColumns object it should only quote the specified column and header', function () {
            var opts = { headers: true, quoteColumns: { a: true } };
            it('should work with objects', function () {
                return expect(formatRows(__fixtures__1.objectRows, opts)).resolves.toEqual(['"a",b', '\n"a1",b1', '\n"a2",b2']);
            });
            it('should work with arrays', function () {
                return expect(formatRows(__fixtures__1.arrayRows, opts)).resolves.toEqual(['"a",b', '\n"a1",b1', '\n"a2",b2']);
            });
            it('should work with multi dimensional arrays', function () {
                return expect(formatRows(__fixtures__1.multiDimensionalRows, opts)).resolves.toEqual(['"a",b', '\n"a1",b1', '\n"a2",b2']);
            });
        });
        describe('if quoteColumns object and quoteHeaders is false it should only quote the specified column and not the header', function () {
            var opts = {
                headers: true,
                quoteHeaders: false,
                quoteColumns: { a: true }
            };
            it('should work with objects', function () {
                return expect(formatRows(__fixtures__1.multiDimensionalRows, opts)).resolves.toEqual(['a,b', '\n"a1",b1', '\n"a2",b2']);
            });
            it('should work with arrays', function () {
                return expect(formatRows(__fixtures__1.arrayRows, opts)).resolves.toEqual(['a,b', '\n"a1",b1', '\n"a2",b2']);
            });
            it('should work with multi-dimensional arrays', function () {
                return expect(formatRows(__fixtures__1.multiDimensionalRows, opts)).resolves.toEqual(['a,b', '\n"a1",b1', '\n"a2",b2']);
            });
        });
        describe('if quoteColumns is an array it should only quote the specified column index', function () {
            var opts = { headers: true, quoteColumns: [true] };
            it('should work with objects', function () {
                return expect(formatRows(__fixtures__1.objectRows, opts)).resolves.toEqual(['"a",b', '\n"a1",b1', '\n"a2",b2']);
            });
            it('should work with arrays', function () {
                return expect(formatRows(__fixtures__1.arrayRows, opts)).resolves.toEqual(['"a",b', '\n"a1",b1', '\n"a2",b2']);
            });
            it('should work with multi-dimensional arrays', function () {
                return expect(formatRows(__fixtures__1.multiDimensionalRows, opts)).resolves.toEqual(['"a",b', '\n"a1",b1', '\n"a2",b2']);
            });
        });
        describe('if quoteColumns is false and quoteHeaders is an object it should only quote the specified header and not the column', function () {
            var opts = {
                headers: true,
                quoteHeaders: { a: true },
                quoteColumns: false
            };
            it('should work with object', function () {
                return expect(formatRows(__fixtures__1.objectRows, opts)).resolves.toEqual(['"a",b', '\na1,b1', '\na2,b2']);
            });
            it('should work with arrays', function () {
                return expect(formatRows(__fixtures__1.arrayRows, opts)).resolves.toEqual(['"a",b', '\na1,b1', '\na2,b2']);
            });
            it('should work with multi-dimenional arrays', function () {
                return expect(formatRows(__fixtures__1.multiDimensionalRows, opts)).resolves.toEqual(['"a",b', '\na1,b1', '\na2,b2']);
            });
        });
        describe('if quoteColumns is an object and quoteHeaders is an object it should only quote the specified header and column', function () {
            var opts = {
                headers: true,
                quoteHeaders: { b: true },
                quoteColumns: { a: true }
            };
            it('should work with objects', function () {
                return expect(formatRows(__fixtures__1.objectRows, opts)).resolves.toEqual(['a,"b"', '\n"a1",b1', '\n"a2",b2']);
            });
            it('should work with arrays', function () {
                return expect(formatRows(__fixtures__1.arrayRows, opts)).resolves.toEqual(['a,"b"', '\n"a1",b1', '\n"a2",b2']);
            });
            it('should work with multi-dimensional arrays', function () {
                return expect(formatRows(__fixtures__1.multiDimensionalRows, opts)).resolves.toEqual(['a,"b"', '\n"a1",b1', '\n"a2",b2']);
            });
        });
        describe('if quoteHeaders is an array and quoteColumns is an false it should only quote the specified header and not the column', function () {
            var opts = {
                headers: true,
                quoteHeaders: [false, true],
                quoteColumns: false
            };
            it('should work with objects', function () {
                return expect(formatRows(__fixtures__1.objectRows, opts)).resolves.toEqual(['a,"b"', '\na1,b1', '\na2,b2']);
            });
            it('should work with arrays', function () {
                return expect(formatRows(__fixtures__1.arrayRows, opts)).resolves.toEqual(['a,"b"', '\na1,b1', '\na2,b2']);
            });
            it('should work with arrays of multi-dimensional arrays', function () {
                return expect(formatRows(__fixtures__1.multiDimensionalRows, opts)).resolves.toEqual(['a,"b"', '\na1,b1', '\na2,b2']);
            });
        });
    });
    describe('header option', function () {
        it('should write an array of objects without headers', function () {
            return expect(formatRows(__fixtures__1.objectRows, { headers: false })).resolves.toEqual(['a1,b1', '\na2,b2']);
        });
        it('should write an array of objects with headers', function () {
            return expect(formatRows(__fixtures__1.objectRows, { headers: true })).resolves.toEqual(['a,b', '\na1,b1', '\na2,b2']);
        });
        it('should write an array of arrays without headers', function () { return __awaiter(void 0, void 0, void 0, function () {
            var rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rows = [
                            ['a1', 'b1'],
                            ['a2', 'b2'],
                        ];
                        return [4 /*yield*/, expect(formatRows(rows, { headers: false })).resolves.toEqual(['a1,b1', '\na2,b2'])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should write an array of arrays with headers', function () {
            return expect(formatRows(__fixtures__1.arrayRows, { headers: true })).resolves.toEqual(['a,b', '\na1,b1', '\na2,b2']);
        });
        it('should write an array of multi-dimensional arrays without headers', function () {
            return expect(formatRows(__fixtures__1.multiDimensionalRows, { headers: false })).resolves.toEqual(['a1,b1', '\na2,b2']);
        });
        it('should write an array of multi-dimensional arrays with headers', function () {
            return expect(formatRows(__fixtures__1.multiDimensionalRows, { headers: true })).resolves.toEqual([
                'a,b',
                '\na1,b1',
                '\na2,b2',
            ]);
        });
        it('should not write anything if headers are provided but no rows are provided', function () {
            return expect(formatRows([], { headers: true })).resolves.toEqual([]);
        });
        describe('alwaysWriteHeaders option', function () {
            it('should write the headers if rows are not provided', function () { return __awaiter(void 0, void 0, void 0, function () {
                var headers;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            headers = ['h1', 'h2'];
                            return [4 /*yield*/, expect(formatRows([], {
                                    headers: headers,
                                    alwaysWriteHeaders: true
                                })).resolves.toEqual([headers.join(',')])];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should write the headers ones if rows are provided', function () { return __awaiter(void 0, void 0, void 0, function () {
                var headers;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            headers = ['h1', 'h2'];
                            return [4 /*yield*/, expect(formatRows(__fixtures__1.arrayRows, {
                                    headers: headers,
                                    alwaysWriteHeaders: true
                                })).resolves.toEqual([headers.join(','), '\na,b', '\na1,b1', '\na2,b2'])];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should fail if no headers are provided', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, expect(formatRows([], { alwaysWriteHeaders: true })).rejects.toThrow('`alwaysWriteHeaders` option is set to true but `headers` option not provided.')];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should write the headers and an endRowDelimiter if includeEndRowDelimiter is true', function () { return __awaiter(void 0, void 0, void 0, function () {
                var headers;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            headers = ['h1', 'h2'];
                            return [4 /*yield*/, expect(formatRows([], {
                                    headers: headers,
                                    includeEndRowDelimiter: true,
                                    alwaysWriteHeaders: true
                                })).resolves.toEqual([headers.join(','), '\n'])];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    it('should add a final rowDelimiter if includeEndRowDelimiter is true', function () {
        return expect(formatRows(__fixtures__1.objectRows, {
            headers: true,
            includeEndRowDelimiter: true
        })).resolves.toEqual(['a,b', '\na1,b1', '\na2,b2', '\n']);
    });
    it('should write a BOM character if writeBOM is true', function () {
        return expect(formatRows(__fixtures__1.objectRows, {
            headers: true,
            writeBOM: true
        })).resolves.toEqual(['\ufeff', 'a,b', '\na1,b1', '\na2,b2']);
    });
});
