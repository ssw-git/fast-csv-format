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
var path = require("path");
var fs = require("fs");
var src_1 = require("../src");
var __fixtures__1 = require("./__fixtures__");
describe('.writeToString', function () {
    it('should write an array of arrays', function () {
        return expect((0, src_1.writeToString)(__fixtures__1.arrayRows, { headers: true })).resolves.toEqual('a,b\na1,b1\na2,b2');
    });
    it('should support transforming an array of arrays', function () {
        return expect((0, src_1.writeToString)(__fixtures__1.arrayRows, {
            headers: true,
            transform: function (row) {
                return row.map(function (entry) { return entry.toUpperCase(); });
            }
        })).resolves.toEqual('A,B\nA1,B1\nA2,B2');
    });
    it('should write an array of multi-dimensional arrays', function () {
        return expect((0, src_1.writeToString)(__fixtures__1.multiDimensionalRows, { headers: true })).resolves.toEqual('a,b\na1,b1\na2,b2');
    });
    it('should support transforming an array of multi-dimensional arrays', function () {
        return expect((0, src_1.writeToString)(__fixtures__1.multiDimensionalRows, {
            headers: true,
            transform: function (row) {
                return row.map(function (col) { return [col[0], col[1].toUpperCase()]; });
            }
        })).resolves.toEqual('a,b\nA1,B1\nA2,B2');
    });
    it('should write an array of objects', function () {
        return expect((0, src_1.writeToString)(__fixtures__1.objectRows, {
            headers: true,
            transform: function (row) {
                return {
                    A: row.a,
                    B: row.b
                };
            }
        })).resolves.toEqual('A,B\na1,b1\na2,b2');
    });
    describe('header option', function () {
        it('should write an array of objects without headers', function () {
            return expect((0, src_1.writeToString)(__fixtures__1.objectRows, { headers: false })).resolves.toEqual('a1,b1\na2,b2');
        });
        it('should write an array of objects with headers', function () {
            return expect((0, src_1.writeToString)(__fixtures__1.objectRows, { headers: true })).resolves.toEqual('a,b\na1,b1\na2,b2');
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
                        return [4 /*yield*/, expect((0, src_1.writeToString)(rows, { headers: false })).resolves.toEqual('a1,b1\na2,b2')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should write an array of arrays with headers', function () {
            return expect((0, src_1.writeToString)(__fixtures__1.arrayRows, { headers: true })).resolves.toEqual('a,b\na1,b1\na2,b2');
        });
        it('should write an array of multi-dimensional arrays without headers', function () {
            return expect((0, src_1.writeToString)(__fixtures__1.multiDimensionalRows, { headers: false })).resolves.toEqual('a1,b1\na2,b2');
        });
        it('should write an array of multi-dimensional arrays with headers', function () {
            return expect((0, src_1.writeToString)(__fixtures__1.multiDimensionalRows, { headers: true })).resolves.toEqual('a,b\na1,b1\na2,b2');
        });
    });
    describe('rowDelimiter option', function () {
        it('should support specifying an alternate row delimiter', function () {
            return expect((0, src_1.writeToString)(__fixtures__1.objectRows, { headers: true, rowDelimiter: '\r\n' })).resolves.toEqual('a,b\r\na1,b1\r\na2,b2');
        });
        it('should escape values that contain the alternate row delimiter', function () { return __awaiter(void 0, void 0, void 0, function () {
            var rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rows = [
                            { a: 'a\t1', b: 'b1' },
                            { a: 'a\t2', b: 'b2' },
                        ];
                        return [4 /*yield*/, expect((0, src_1.writeToString)(rows, { headers: true, rowDelimiter: '\t' })).resolves.toEqual('a,b\t"a\t1",b1\t"a\t2",b2')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it('should add a final rowDelimiter if includeEndRowDelimiter is true', function () {
        return expect((0, src_1.writeToString)(__fixtures__1.objectRows, { headers: true, includeEndRowDelimiter: true })).resolves.toEqual('a,b\na1,b1\na2,b2\n');
    });
});
describe('.writeToBuffer', function () {
    it('should write an array of arrays', function () {
        return expect((0, src_1.writeToBuffer)(__fixtures__1.arrayRows, { headers: true })).resolves.toEqual(Buffer.from('a,b\na1,b1\na2,b2'));
    });
    it('should support transforming an array of arrays', function () {
        return expect((0, src_1.writeToBuffer)(__fixtures__1.arrayRows, {
            headers: true,
            transform: function (row) {
                return row.map(function (entry) { return entry.toUpperCase(); });
            }
        })).resolves.toEqual(Buffer.from('A,B\nA1,B1\nA2,B2'));
    });
    it('should write an array of multi-dimensional arrays', function () {
        return expect((0, src_1.writeToBuffer)(__fixtures__1.multiDimensionalRows, { headers: true })).resolves.toEqual(Buffer.from('a,b\na1,b1\na2,b2'));
    });
    it('should support transforming an array of multi-dimensional arrays', function () {
        return expect((0, src_1.writeToBuffer)(__fixtures__1.multiDimensionalRows, {
            headers: true,
            transform: function (row) {
                return row.map(function (col) { return [col[0], col[1].toUpperCase()]; });
            }
        })).resolves.toEqual(Buffer.from('a,b\nA1,B1\nA2,B2'));
    });
    it('should write an array of objects', function () {
        return expect((0, src_1.writeToBuffer)(__fixtures__1.objectRows, {
            headers: true,
            transform: function (row) {
                return {
                    A: row.a,
                    B: row.b
                };
            }
        })).resolves.toEqual(Buffer.from('A,B\na1,b1\na2,b2'));
    });
    describe('header option', function () {
        it('should write an array of objects without headers', function () {
            return expect((0, src_1.writeToBuffer)(__fixtures__1.objectRows, { headers: false })).resolves.toEqual(Buffer.from('a1,b1\na2,b2'));
        });
        it('should write an array of objects with headers', function () {
            return expect((0, src_1.writeToBuffer)(__fixtures__1.objectRows, { headers: true })).resolves.toEqual(Buffer.from('a,b\na1,b1\na2,b2'));
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
                        return [4 /*yield*/, expect((0, src_1.writeToBuffer)(rows, { headers: false })).resolves.toEqual(Buffer.from('a1,b1\na2,b2'))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should write an array of arrays with headers', function () {
            return expect((0, src_1.writeToBuffer)(__fixtures__1.arrayRows, { headers: true })).resolves.toEqual(Buffer.from('a,b\na1,b1\na2,b2'));
        });
        it('should write an array of multi-dimensional arrays without headers', function () {
            return expect((0, src_1.writeToBuffer)(__fixtures__1.multiDimensionalRows, { headers: false })).resolves.toEqual(Buffer.from('a1,b1\na2,b2'));
        });
        it('should write an array of multi-dimensional arrays with headers', function () {
            return expect((0, src_1.writeToBuffer)(__fixtures__1.multiDimensionalRows, { headers: true })).resolves.toEqual(Buffer.from('a,b\na1,b1\na2,b2'));
        });
    });
    describe('rowDelimiter option', function () {
        it('should support specifying an alternate row delimiter', function () {
            return expect((0, src_1.writeToBuffer)(__fixtures__1.objectRows, { headers: true, rowDelimiter: '\r\n' })).resolves.toEqual(Buffer.from('a,b\r\na1,b1\r\na2,b2'));
        });
        it('should escape values that contain the alternate row delimiter', function () { return __awaiter(void 0, void 0, void 0, function () {
            var rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rows = [
                            { a: 'a\t1', b: 'b1' },
                            { a: 'a\t2', b: 'b2' },
                        ];
                        return [4 /*yield*/, expect((0, src_1.writeToBuffer)(rows, { headers: true, rowDelimiter: '\t' })).resolves.toEqual(Buffer.from('a,b\t"a\t1",b1\t"a\t2",b2'))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it('should add a final rowDelimiter if includeEndRowDelimiter is true', function () {
        return expect((0, src_1.writeToBuffer)(__fixtures__1.objectRows, { headers: true, includeEndRowDelimiter: true })).resolves.toEqual(Buffer.from('a,b\na1,b1\na2,b2\n'));
    });
});
describe('.write', function () {
    var writeToRecordingStream = function (rows, options) {
        if (options === void 0) { options = {}; }
        return new Promise(function (res, rej) {
            var rs = new __fixtures__1.RecordingStream();
            (0, src_1.write)(rows, options)
                .on('error', rej)
                .pipe(rs)
                .on('finish', function () {
                res(rs.data);
            });
        });
    };
    it('should write an array of arrays', function () {
        return expect(writeToRecordingStream(__fixtures__1.arrayRows, { headers: true })).resolves.toEqual(['a,b', '\na1,b1', '\na2,b2']);
    });
    it('should support transforming an array of arrays', function () {
        return expect(writeToRecordingStream(__fixtures__1.arrayRows, {
            headers: true,
            transform: function (row) {
                return row.map(function (entry) { return entry.toUpperCase(); });
            }
        })).resolves.toEqual(['A,B', '\nA1,B1', '\nA2,B2']);
    });
    it('should write an array of multi-dimensional arrays', function () {
        return expect(writeToRecordingStream(__fixtures__1.multiDimensionalRows, { headers: true })).resolves.toEqual([
            'a,b',
            '\na1,b1',
            '\na2,b2',
        ]);
    });
    it('should support transforming an array of multi-dimensional arrays', function () {
        return expect(writeToRecordingStream(__fixtures__1.multiDimensionalRows, {
            headers: true,
            transform: function (row) {
                return row.map(function (col) { return [col[0], col[1].toUpperCase()]; });
            }
        })).resolves.toEqual(['a,b', '\nA1,B1', '\nA2,B2']);
    });
    it('should write an array of objects', function () {
        return expect(writeToRecordingStream(__fixtures__1.objectRows, { headers: true })).resolves.toEqual(['a,b', '\na1,b1', '\na2,b2']);
    });
    it('should support transforming an array of objects', function () {
        return expect(writeToRecordingStream(__fixtures__1.objectRows, {
            headers: true,
            transform: function (row) {
                return {
                    A: row.a,
                    B: row.b
                };
            }
        })).resolves.toEqual(['A,B', '\na1,b1', '\na2,b2']);
    });
    describe('rowDelimiter option', function () {
        it('should support specifying an alternate row delimiter', function () {
            return expect(writeToRecordingStream(__fixtures__1.objectRows, { headers: true, rowDelimiter: '\r\n' })).resolves.toEqual([
                'a,b',
                '\r\na1,b1',
                '\r\na2,b2',
            ]);
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
                        return [4 /*yield*/, expect(writeToRecordingStream(rows, { headers: true, rowDelimiter: '\n' })).resolves.toEqual([
                                'a,b',
                                '\n"a\n1",b1',
                                '\n"a\n2",b2',
                            ])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it('should add a final rowDelimiter if includeEndRowDelimiter is true', function () {
        return expect(writeToRecordingStream(__fixtures__1.objectRows, { headers: true, includeEndRowDelimiter: true })).resolves.toEqual([
            'a,b',
            '\na1,b1',
            '\na2,b2',
            '\n',
        ]);
    });
});
describe('.writeToPath', function () {
    var writeRowsToPath = function (rows, options) {
        if (options === void 0) { options = {}; }
        return new Promise(function (res, rej) {
            var csvPath = path.resolve(__dirname, '__fixtures__', 'test_output.csv');
            (0, src_1.writeToPath)(csvPath, rows, options)
                .on('error', rej)
                .on('finish', function () {
                var content = fs.readFileSync(csvPath);
                fs.unlinkSync(csvPath);
                res(content);
            });
        });
    };
    it('should write an array of arrays', function () {
        return expect(writeRowsToPath(__fixtures__1.arrayRows, { headers: true })).resolves.toEqual(Buffer.from('a,b\na1,b1\na2,b2'));
    });
    it('should write an array of objects', function () {
        return expect(writeRowsToPath(__fixtures__1.objectRows, { headers: true })).resolves.toEqual(Buffer.from('a,b\na1,b1\na2,b2'));
    });
    it('should write an array of multi-dimensional arrays', function () {
        return expect(writeRowsToPath(__fixtures__1.multiDimensionalRows, { headers: true })).resolves.toEqual(Buffer.from('a,b\na1,b1\na2,b2'));
    });
    it('should support transforming an array of arrays', function () {
        return expect(writeRowsToPath(__fixtures__1.arrayRows, {
            headers: true,
            transform: function (row) {
                return row.map(function (entry) { return entry.toUpperCase(); });
            }
        })).resolves.toEqual(Buffer.from('A,B\nA1,B1\nA2,B2'));
    });
    it('should transforming an array of objects', function () {
        return expect(writeRowsToPath(__fixtures__1.objectRows, {
            headers: true,
            transform: function (row) {
                return {
                    A: row.a,
                    B: row.b
                };
            }
        })).resolves.toEqual(Buffer.from('A,B\na1,b1\na2,b2'));
    });
    it('should transforming an array of multi-dimensional array', function () {
        return expect(writeRowsToPath(__fixtures__1.multiDimensionalRows, {
            headers: true,
            transform: function (row) {
                return row.map(function (col) { return [col[0], col[1].toUpperCase()]; });
            }
        })).resolves.toEqual(Buffer.from('a,b\nA1,B1\nA2,B2'));
    });
    describe('rowDelimiter option', function () {
        it('should support specifying an alternate row delimiter', function () {
            return expect(writeRowsToPath(__fixtures__1.objectRows, { headers: true, rowDelimiter: '\r\n' })).resolves.toEqual(Buffer.from('a,b\r\na1,b1\r\na2,b2'));
        });
        it('should escape values that contain the alternate row delimiter', function () { return __awaiter(void 0, void 0, void 0, function () {
            var rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rows = [
                            { a: 'a\r\n1', b: 'b1' },
                            { a: 'a\r\n2', b: 'b2' },
                        ];
                        return [4 /*yield*/, expect(writeRowsToPath(rows, { headers: true, rowDelimiter: '\r\n' })).resolves.toEqual(Buffer.from('a,b\r\n"a\r\n1",b1\r\n"a\r\n2",b2'))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it('should add a final rowDelimiter if includeEndRowDelimiter is true', function () {
        return expect(writeRowsToPath(__fixtures__1.objectRows, { headers: true, includeEndRowDelimiter: true })).resolves.toEqual(Buffer.from('a,b\na1,b1\na2,b2\n'));
    });
});
describe('format.write', function () {
    var writeToRecordingStream = function (rows, options) {
        if (options === void 0) { options = {}; }
        return new Promise(function (res, rej) {
            var rs = new __fixtures__1.RecordingStream();
            (0, src_1.write)(rows, options)
                .on('error', rej)
                .pipe(rs)
                .on('finish', function () {
                res(rs.data);
            });
        });
    };
    it('should write an array of arrays', function () {
        return expect(writeToRecordingStream(__fixtures__1.arrayRows, { headers: true })).resolves.toEqual(['a,b', '\na1,b1', '\na2,b2']);
    });
    it('should support transforming an array of arrays', function () {
        return expect(writeToRecordingStream(__fixtures__1.arrayRows, {
            headers: true,
            transform: function (row) {
                return row.map(function (entry) { return entry.toUpperCase(); });
            }
        })).resolves.toEqual(['A,B', '\nA1,B1', '\nA2,B2']);
    });
    it('should write an array of multi-dimensional arrays', function () {
        return expect(writeToRecordingStream(__fixtures__1.multiDimensionalRows, { headers: true })).resolves.toEqual([
            'a,b',
            '\na1,b1',
            '\na2,b2',
        ]);
    });
    it('should support transforming an array of multi-dimensional arrays', function () {
        return expect(writeToRecordingStream(__fixtures__1.multiDimensionalRows, {
            headers: true,
            transform: function (row) {
                return row.map(function (col) { return [col[0], col[1].toUpperCase()]; });
            }
        })).resolves.toEqual(['a,b', '\nA1,B1', '\nA2,B2']);
    });
    it('should write an array of objects', function () {
        return expect(writeToRecordingStream(__fixtures__1.objectRows, { headers: true })).resolves.toEqual(['a,b', '\na1,b1', '\na2,b2']);
    });
    it('should support transforming an array of objects', function () {
        return expect(writeToRecordingStream(__fixtures__1.objectRows, {
            headers: true,
            transform: function (row) {
                return {
                    A: row.a,
                    B: row.b
                };
            }
        })).resolves.toEqual(['A,B', '\na1,b1', '\na2,b2']);
    });
    describe('rowDelimiter option', function () {
        it('should support specifying an alternate row delimiter', function () {
            return expect(writeToRecordingStream(__fixtures__1.objectRows, { headers: true, rowDelimiter: '\r\n' })).resolves.toEqual([
                'a,b',
                '\r\na1,b1',
                '\r\na2,b2',
            ]);
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
                        return [4 /*yield*/, expect(writeToRecordingStream(rows, { headers: true, rowDelimiter: '\n' })).resolves.toEqual([
                                'a,b',
                                '\n"a\n1",b1',
                                '\n"a\n2",b2',
                            ])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it('should add a final rowDelimiter if includeEndRowDelimiter is true', function () {
        return expect(writeToRecordingStream(__fixtures__1.objectRows, { headers: true, includeEndRowDelimiter: true })).resolves.toEqual([
            'a,b',
            '\na1,b1',
            '\na2,b2',
            '\n',
        ]);
    });
});
describe('.writeToStream', function () {
    var writeRowsToStream = function (rows, options) {
        if (options === void 0) { options = {}; }
        return new Promise(function (res, rej) {
            var rs = new __fixtures__1.RecordingStream();
            (0, src_1.writeToStream)(rs, rows, options);
            rs.on('error', rej).on('finish', function () {
                res(rs.data);
            });
        });
    };
    it('should write an array of arrays', function () {
        return expect(writeRowsToStream(__fixtures__1.arrayRows, { headers: true })).resolves.toEqual(['a,b', '\na1,b1', '\na2,b2']);
    });
    it('should write an array of objects', function () {
        return expect(writeRowsToStream(__fixtures__1.objectRows, { headers: true })).resolves.toEqual(['a,b', '\na1,b1', '\na2,b2']);
    });
    it('should write an array of multi-dimensional arrays', function () {
        return expect(writeRowsToStream(__fixtures__1.multiDimensionalRows, { headers: true })).resolves.toEqual([
            'a,b',
            '\na1,b1',
            '\na2,b2',
        ]);
    });
    it('should support transforming an array of arrays', function () {
        return expect(writeRowsToStream(__fixtures__1.arrayRows, {
            headers: true,
            transform: function (row) {
                return row.map(function (entry) { return entry.toUpperCase(); });
            }
        })).resolves.toEqual(['A,B', '\nA1,B1', '\nA2,B2']);
    });
    it('should transforming an array of objects', function () {
        return expect(writeRowsToStream(__fixtures__1.objectRows, {
            headers: true,
            transform: function (row) {
                return {
                    A: row.a,
                    B: row.b
                };
            }
        })).resolves.toEqual(['A,B', '\na1,b1', '\na2,b2']);
    });
    it('should transforming an array of multi-dimensional array', function () {
        return expect(writeRowsToStream(__fixtures__1.multiDimensionalRows, {
            headers: true,
            transform: function (row) {
                return row.map(function (col) { return [col[0], col[1].toUpperCase()]; });
            }
        })).resolves.toEqual(['a,b', '\nA1,B1', '\nA2,B2']);
    });
    describe('rowDelimiter option', function () {
        it('should support specifying an alternate row delimiter', function () {
            return expect(writeRowsToStream(__fixtures__1.objectRows, { headers: true, rowDelimiter: '\r\n' })).resolves.toEqual([
                'a,b',
                '\r\na1,b1',
                '\r\na2,b2',
            ]);
        });
        it('should escape values that contain the alternate row delimiter', function () { return __awaiter(void 0, void 0, void 0, function () {
            var rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rows = [
                            { a: 'a\r\n1', b: 'b1' },
                            { a: 'a\r\n2', b: 'b2' },
                        ];
                        return [4 /*yield*/, expect(writeRowsToStream(rows, { headers: true, rowDelimiter: '\r\n' })).resolves.toEqual([
                                'a,b',
                                '\r\n"a\r\n1",b1',
                                '\r\n"a\r\n2",b2',
                            ])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it('should add a final rowDelimiter if includeEndRowDelimiter is true', function () {
        return expect(writeRowsToStream(__fixtures__1.objectRows, { headers: true, includeEndRowDelimiter: true })).resolves.toEqual([
            'a,b',
            '\na1,b1',
            '\na2,b2',
            '\n',
        ]);
    });
});
