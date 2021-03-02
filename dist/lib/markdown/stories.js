"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const markdown_it_container_1 = __importDefault(require("markdown-it-container"));
function story(md) {
    return markdown_it_container_1.default(md, "story", {
        marker: "%",
        validate: () => true,
    });
}
exports.default = story;
//# sourceMappingURL=stories.js.map