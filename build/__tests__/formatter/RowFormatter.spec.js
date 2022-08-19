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
var src_1 = require("../../src");
var formatter_1 = require("../../src/formatter");
describe('RowFormatter', function () {
    var createFormatter = function (formatterOptions) {
        if (formatterOptions === void 0) { formatterOptions = {}; }
        return new formatter_1.RowFormatter(new src_1.FormatterOptions(formatterOptions));
    };
    var formatRow = function (row, formatter) {
        return new Promise(function (res, rej) {
            formatter.format(row, function (err, formatted) {
                if (err) {
                    return rej(err);
                }
                return res(formatted);
            });
        });
    };
    var finish = function (formatter) {
        return new Promise(function (res, rej) {
            formatter.finish(function (err, formatted) {
                if (err) {
                    return rej(err);
                }
                return res(formatted);
            });
        });
    };
    describe('#format', function () {
        describe('with array', function () {
            var headerRow = ['a', 'b'];
            var columnsRow = ['a1', 'b1'];
            var syncTransform = function (row) { return row.map(function (col) { return col.toUpperCase(); }); };
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            var syncError = function () {
                throw new Error('Expected Error');
            };
            var asyncTransform = function (row, cb) {
                setImmediate(function () {
                    return cb(null, row.map(function (col) { return col.toUpperCase(); }));
                });
            };
            var asyncErrorTransform = function (row, cb) {
                setImmediate(function () { return cb(new Error('Expected Error')); });
            };
            it('should format an array', function () { return __awaiter(void 0, void 0, void 0, function () {
                var formatter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formatter = createFormatter({ headers: true });
                            return [4 /*yield*/, expect(formatRow(headerRow, formatter)).resolves.toEqual(['a,b'])];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should should append a new line if a second row is written', function () { return __awaiter(void 0, void 0, void 0, function () {
                var formatter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formatter = createFormatter({ headers: true });
                            return [4 /*yield*/, expect(formatRow(headerRow, formatter)).resolves.toEqual(['a,b'])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, expect(formatRow(columnsRow, formatter)).resolves.toEqual(['\na1,b1'])];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should support a sync transform', function () { return __awaiter(void 0, void 0, void 0, function () {
                var formatter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formatter = createFormatter({ headers: true, transform: syncTransform });
                            return [4 /*yield*/, expect(formatRow(headerRow, formatter)).resolves.toEqual(['A,B'])];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should catch a sync transform thrown error', function () { return __awaiter(void 0, void 0, void 0, function () {
                var formatter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formatter = createFormatter({ headers: true, transform: syncError });
                            return [4 /*yield*/, expect(formatRow(headerRow, formatter)).rejects.toThrow('Expected Error')];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should support an async transform', function () { return __awaiter(void 0, void 0, void 0, function () {
                var formatter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formatter = createFormatter({ headers: true, transform: asyncTransform });
                            return [4 /*yield*/, expect(formatRow(headerRow, formatter)).resolves.toEqual(['A,B'])];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should support an async transform with error', function () { return __awaiter(void 0, void 0, void 0, function () {
                var formatter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formatter = createFormatter({ headers: true, transform: asyncErrorTransform });
                            return [4 /*yield*/, expect(formatRow(headerRow, formatter)).rejects.toThrow('Expected Error')];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            describe('headers option', function () {
                describe('with headers=false', function () {
                    it('should still write the first row', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var formatter;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    formatter = createFormatter({ headers: false });
                                    return [4 /*yield*/, expect(formatRow(headerRow, formatter)).resolves.toEqual([headerRow.join(',')])];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('should still format all rows without headers', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var formatter;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    formatter = createFormatter({ headers: false });
                                    return [4 /*yield*/, expect(formatRow([], formatter)).resolves.toEqual([''])];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, expect(formatRow(headerRow, formatter)).resolves.toEqual(["\n".concat(headerRow.join(','))])];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
                describe('with headers=true', function () {
                    it('should only write the first row', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var formatter;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    formatter = createFormatter({ headers: true });
                                    return [4 /*yield*/, expect(formatRow(headerRow, formatter)).resolves.toEqual([headerRow.join(',')])];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
                describe('with headers provided', function () {
                    it('should only write the first row', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var formatter;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    formatter = createFormatter({ headers: headerRow });
                                    return [4 /*yield*/, expect(formatRow(columnsRow, formatter)).resolves.toEqual([
                                            headerRow.join(','),
                                            "\n".concat(columnsRow.join(',')),
                                        ])];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('should append an additional column for new fields', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var formatter;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    formatter = createFormatter({ headers: ['A', 'B', 'no_field'] });
                                    return [4 /*yield*/, expect(formatRow(columnsRow, formatter)).resolves.toEqual(['A,B,no_field', '\na1,b1,'])];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('should exclude columns that do not have a header', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var formatter;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    formatter = createFormatter({ headers: ['A'] });
                                    return [4 /*yield*/, expect(formatRow(columnsRow, formatter)).resolves.toEqual(['A', '\na1'])];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
            });
            describe('rowDelimiter option', function () {
                it('should support specifying an alternate row delimiter', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var formatter;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                formatter = createFormatter({ headers: true, rowDelimiter: '\r\n' });
                                return [4 /*yield*/, expect(formatRow(headerRow, formatter)).resolves.toEqual(['a,b'])];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, expect(formatRow(columnsRow, formatter)).resolves.toEqual(['\r\na1,b1'])];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        describe('with multi-dimensional arrays', function () {
            var row = [
                ['a', 'a1'],
                ['b', 'b1'],
            ];
            var syncTransform = function (rowToTransform) {
                return rowToTransform.map(function (_a) {
                    var header = _a[0], col = _a[1];
                    return [header, col.toUpperCase()];
                });
            };
            var syncError = function () {
                throw new Error('Expected Error');
            };
            var asyncTransform = function (rowToTransform, cb) {
                var transformed = rowToTransform.map(function (_a) {
                    var header = _a[0], col = _a[1];
                    return [header, col.toUpperCase()];
                });
                setImmediate(function () { return cb(null, transformed); });
            };
            var asyncErrorTransform = function (rowToTransform, cb) {
                return setImmediate(function () { return cb(new Error('Expected Error')); });
            };
            it('should format a multi-dimensional array with headers true', function () { return __awaiter(void 0, void 0, void 0, function () {
                var formatter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formatter = createFormatter({ headers: true });
                            return [4 /*yield*/, expect(formatRow(row, formatter)).resolves.toEqual(['a,b', '\na1,b1'])];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should not include headers if headers is false', function () { return __awaiter(void 0, void 0, void 0, function () {
                var formatter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formatter = createFormatter({ headers: false });
                            return [4 /*yield*/, expect(formatRow(row, formatter)).resolves.toEqual(['a1,b1'])];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should support a sync transform', function () { return __awaiter(void 0, void 0, void 0, function () {
                var formatter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formatter = createFormatter({ headers: true, transform: syncTransform });
                            return [4 /*yield*/, expect(formatRow(row, formatter)).resolves.toEqual(['a,b', '\nA1,B1'])];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should catch a sync transform thrown error', function () { return __awaiter(void 0, void 0, void 0, function () {
                var formatter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formatter = createFormatter({ headers: true, transform: syncError });
                            return [4 /*yield*/, expect(formatRow(row, formatter)).rejects.toThrow('Expected Error')];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should support an async transform', function () { return __awaiter(void 0, void 0, void 0, function () {
                var formatter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formatter = createFormatter({ headers: true, transform: asyncTransform });
                            return [4 /*yield*/, expect(formatRow(row, formatter)).resolves.toEqual(['a,b', '\nA1,B1'])];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should support an async transform with error', function () { return __awaiter(void 0, void 0, void 0, function () {
                var formatter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formatter = createFormatter({ headers: true, transform: asyncErrorTransform });
                            return [4 /*yield*/, expect(formatRow(row, formatter)).rejects.toThrow('Expected Error')];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            describe('headers option', function () {
                describe('with headers=false', function () {
                    it('should still write the first row', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var formatter;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    formatter = createFormatter({ headers: false });
                                    return [4 /*yield*/, expect(formatRow(row, formatter)).resolves.toEqual(['a1,b1'])];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
                describe('with headers=true', function () {
                    it('should only write the first row', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var formatter;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    formatter = createFormatter({ headers: true });
                                    return [4 /*yield*/, expect(formatRow(row, formatter)).resolves.toEqual(['a,b', '\na1,b1'])];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
                describe('with headers provided', function () {
                    it('should write the headers and first row', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var formatter;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    formatter = createFormatter({ headers: ['A', 'B'] });
                                    return [4 /*yield*/, expect(formatRow(row, formatter)).resolves.toEqual(['A,B', '\na1,b1'])];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('should append an additional column for new fields', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var formatter;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    formatter = createFormatter({ headers: ['A', 'B', 'no_field'] });
                                    return [4 /*yield*/, expect(formatRow(row, formatter)).resolves.toEqual(['A,B,no_field', '\na1,b1,'])];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('should exclude columns that do not have a header', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var formatter;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    formatter = createFormatter({ headers: ['A'] });
                                    return [4 /*yield*/, expect(formatRow(row, formatter)).resolves.toEqual(['A', '\na1'])];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
            });
            describe('rowDelimiter option', function () {
                it('should support specifying an alternate row delimiter', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var formatter;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                formatter = createFormatter({ headers: true, rowDelimiter: '\r\n' });
                                return [4 /*yield*/, expect(formatRow(row, formatter)).resolves.toEqual(['a,b', '\r\na1,b1'])];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        describe('with objects', function () {
            var row = { a: 'a1', b: 'b1' };
            var syncTransform = function (rowToTransform) { return ({
                a: rowToTransform.a.toUpperCase(),
                b: rowToTransform.b.toUpperCase()
            }); };
            var syncError = function () {
                throw new Error('Expected Error');
            };
            var asyncTransform = function (rowToTransform, cb) {
                return setImmediate(function () { return cb(null, syncTransform(rowToTransform)); });
            };
            var asyncErrorTransform = function (rowToTransform, cb) {
                return setImmediate(function () { return cb(new Error('Expected Error')); });
            };
            it('should return a headers row with when headers true', function () { return __awaiter(void 0, void 0, void 0, function () {
                var formatter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formatter = createFormatter({ headers: true });
                            return [4 /*yield*/, expect(formatRow(row, formatter)).resolves.toEqual(['a,b', '\na1,b1'])];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should not include headers if headers is false', function () { return __awaiter(void 0, void 0, void 0, function () {
                var formatter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formatter = createFormatter({ headers: false });
                            return [4 /*yield*/, expect(formatRow(row, formatter)).resolves.toEqual(['a1,b1'])];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should support a sync transform', function () { return __awaiter(void 0, void 0, void 0, function () {
                var formatter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formatter = createFormatter({ headers: true, transform: syncTransform });
                            return [4 /*yield*/, expect(formatRow(row, formatter)).resolves.toEqual(['a,b', '\nA1,B1'])];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should catch a sync transform thrown error', function () { return __awaiter(void 0, void 0, void 0, function () {
                var formatter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formatter = createFormatter({ headers: true, transform: syncError });
                            return [4 /*yield*/, expect(formatRow(row, formatter)).rejects.toThrow('Expected Error')];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should support an async transform', function () { return __awaiter(void 0, void 0, void 0, function () {
                var formatter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formatter = createFormatter({ headers: true, transform: asyncTransform });
                            return [4 /*yield*/, expect(formatRow(row, formatter)).resolves.toEqual(['a,b', '\nA1,B1'])];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should support an async transform with error', function () { return __awaiter(void 0, void 0, void 0, function () {
                var formatter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formatter = createFormatter({ headers: true, transform: asyncErrorTransform });
                            return [4 /*yield*/, expect(formatRow(row, formatter)).rejects.toThrow('Expected Error')];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            describe('headers option', function () {
                describe('with headers=false', function () {
                    it('should still write the first row', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var formatter;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    formatter = createFormatter({ headers: false });
                                    return [4 /*yield*/, expect(formatRow(row, formatter)).resolves.toEqual(['a1,b1'])];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
                describe('with headers=true', function () {
                    it('should only write the first row', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var formatter;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    formatter = createFormatter({ headers: true });
                                    return [4 /*yield*/, expect(formatRow(row, formatter)).resolves.toEqual(['a,b', '\na1,b1'])];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('should not write the first row if writeHeaders is false', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var formatter;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    formatter = createFormatter({ headers: true, writeHeaders: false });
                                    return [4 /*yield*/, expect(formatRow(row, formatter)).resolves.toEqual(['a1,b1'])];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
                describe('with headers provided', function () {
                    it('should write the provided headers and the row', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var formatter;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    formatter = createFormatter({ headers: ['a', 'b'] });
                                    return [4 /*yield*/, expect(formatRow(row, formatter)).resolves.toEqual(['a,b', '\na1,b1'])];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('should not write the header row if writeHeaders is false', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var formatter;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    formatter = createFormatter({ headers: ['a', 'b'], writeHeaders: false });
                                    return [4 /*yield*/, expect(formatRow(row, formatter)).resolves.toEqual(['a1,b1'])];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('should respect the order of the columns', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var formatter;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    formatter = createFormatter({ headers: ['b', 'a'] });
                                    return [4 /*yield*/, expect(formatRow(row, formatter)).resolves.toEqual(['b,a', '\nb1,a1'])];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('should append an additional column for new fields', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var formatter;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    formatter = createFormatter({ headers: ['a', 'b', 'no_field'] });
                                    return [4 /*yield*/, expect(formatRow(row, formatter)).resolves.toEqual(['a,b,no_field', '\na1,b1,'])];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('should respect the order of the columns and not write the headers if writeHeaders is false', function () { return __awaiter(void 0, void 0, void 0, function () {
                        var formatter;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    formatter = createFormatter({ headers: ['b', 'a'], writeHeaders: false });
                                    return [4 /*yield*/, expect(formatRow(row, formatter)).resolves.toEqual(['b1,a1'])];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
            });
            describe('rowDelimiter option', function () {
                it('should support specifying an alternate row delimiter', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var formatter;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                formatter = createFormatter({ headers: true, rowDelimiter: '\r\n' });
                                return [4 /*yield*/, expect(formatRow(row, formatter)).resolves.toEqual(['a,b', '\r\na1,b1'])];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
    });
    describe('#finish', function () {
        describe('alwaysWriteHeaders option', function () {
            it('should return a headers row if no rows have been written', function () { return __awaiter(void 0, void 0, void 0, function () {
                var headers, formatter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            headers = ['h1', 'h2'];
                            formatter = createFormatter({ headers: headers, alwaysWriteHeaders: true });
                            return [4 /*yield*/, expect(finish(formatter)).resolves.toEqual([headers.join(',')])];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should not return a headers row if rows have been written', function () { return __awaiter(void 0, void 0, void 0, function () {
                var headers, formatter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            headers = ['h1', 'h2'];
                            formatter = createFormatter({ headers: headers, alwaysWriteHeaders: true });
                            return [4 /*yield*/, expect(formatRow(['c1', 'c2'], formatter)).resolves.toEqual(['h1,h2', '\nc1,c2'])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, expect(finish(formatter)).resolves.toEqual([])];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should reject if headers are not specified', function () { return __awaiter(void 0, void 0, void 0, function () {
                var formatter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formatter = createFormatter({ alwaysWriteHeaders: true });
                            return [4 /*yield*/, expect(finish(formatter)).rejects.toThrow('`alwaysWriteHeaders` option is set to true but `headers` option not provided.')];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('includeEndRowDelimiter option', function () {
            it('should write the endRowDelimiter if the file is empty', function () { return __awaiter(void 0, void 0, void 0, function () {
                var formatter;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formatter = createFormatter({ includeEndRowDelimiter: true });
                            return [4 /*yield*/, expect(finish(formatter)).resolves.toEqual(['\n'])];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('#rowTransform', function () {
        it('should throw an error if the transform is set and is not a function', function () {
            var formatter = createFormatter();
            expect(function () {
                // @ts-expect-error
                formatter.rowTransform = 'foo';
            }).toThrow('The transform should be a function');
        });
    });
});
