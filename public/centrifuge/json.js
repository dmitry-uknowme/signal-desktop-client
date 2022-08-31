"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonDecoder = exports.JsonEncoder = void 0;
/** @internal */
class JsonEncoder {
    encodeCommands(commands) {
        return commands.map(c => JSON.stringify(c)).join('\n');
    }
}
exports.JsonEncoder = JsonEncoder;
/** @internal */
class JsonDecoder {
    decodeReplies(data) {
        return data.trim().split('\n').map(r => JSON.parse(r));
    }
}
exports.JsonDecoder = JsonDecoder;
//# sourceMappingURL=json.js.map