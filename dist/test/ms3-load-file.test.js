"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const loader_1 = require("./../ms3/loader");
const path = require("path");
test('File should load without errors', () => __awaiter(this, void 0, void 0, function* () {
    const filePath = path.join(__dirname, '..', '..', 'src', 'test', 'files', 'Project_title.ms3');
    let error;
    try {
        yield loader_1.default.create(filePath).load();
    }
    catch (err) {
        error = err.message;
    }
    expect(error).toBe(undefined);
}));
test('Load file should fail with empty path', () => __awaiter(this, void 0, void 0, function* () {
    const expected = 'Empty path';
    try {
        const ms3Loader = new loader_1.default();
        yield ms3Loader.load();
    }
    catch (err) {
        expect(err.message).toBe(expected);
    }
}));
test('Should fail with incorrect path', () => __awaiter(this, void 0, void 0, function* () {
    try {
        yield loader_1.default.create('wrong/path').load();
    }
    catch (err) {
        expect(err.message).toBe("Error reading Ms3 file: ENOENT: no such file or directory, open 'wrong/path'");
    }
}));
test('Should fail with incorrect JSON format', () => __awaiter(this, void 0, void 0, function* () {
    const filePath = path.join(__dirname, '..', '..', 'src', 'test', 'files', 'wrong-json.ms3');
    return expect(loader_1.default.create(filePath).load()).rejects.toBeDefined();
}));
//# sourceMappingURL=ms3-load-file.test.js.map