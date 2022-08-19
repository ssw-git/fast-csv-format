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
exports.__esModule = true;
exports.multiDimensionalRows = exports.arrayRows = exports.objectRows = exports.RecordingStream = void 0;
var RecordingStream_1 = require("./RecordingStream");
__createBinding(exports, RecordingStream_1, "RecordingStream");
exports.objectRows = [
    { a: 'a1', b: 'b1' },
    { a: 'a2', b: 'b2' },
];
exports.arrayRows = [
    ['a', 'b'],
    ['a1', 'b1'],
    ['a2', 'b2'],
];
exports.multiDimensionalRows = [
    [
        ['a', 'a1'],
        ['b', 'b1'],
    ],
    [
        ['a', 'a2'],
        ['b', 'b2'],
    ],
];
