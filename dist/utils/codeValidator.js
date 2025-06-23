"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeValidator = void 0;
function codeValidator(code) {
    if (code.length === 13 && code.match(/^\D{2}\d{9}\D{2}/)) {
        return true;
    }
    return false;
}
exports.codeValidator = codeValidator;
//# sourceMappingURL=codeValidator.js.map