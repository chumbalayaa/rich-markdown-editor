"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prosemirror_inputrules_1 = require("prosemirror-inputrules");
const toggleWrap_1 = __importDefault(require("../commands/toggleWrap"));
const Node_1 = __importDefault(require("./Node"));
class Story extends Node_1.default {
    get name() {
        return "container_story";
    }
    get schema() {
        return {
            attrs: {
                id: {
                    default: "story",
                },
            },
            content: "block+",
            group: "block",
            defining: true,
            draggable: true,
            parseDOM: [
                {
                    tag: "div.story-block",
                    preserveWhitespace: "full",
                    contentElement: "div:last-child",
                    getAttrs: (ele) => {
                        console.log(ele);
                        return { id: ele.getElementsByClassName("story-button")[0].id };
                    },
                },
            ],
            toDOM: node => {
                node.attrs.id =
                    node.attrs.id === "story"
                        ? Math.round(Math.random() * 10000)
                        : node.attrs.id;
                const button = document.createElement("button");
                button.className = "story-button";
                button.innerText = "Story";
                button.id = node.attrs.id;
                button.addEventListener("click", (function () {
                    return function (e) {
                        alert(`Story ${e.target.id} clicked!`);
                    };
                })(), false);
                return [
                    "div",
                    { class: `story-block ${node.attrs.id}` },
                    ["div", { contentEditable: false }, button],
                    ["div", { class: "content story-content" }, 0],
                ];
            },
        };
    }
    commands({ type }) {
        return attrs => toggleWrap_1.default(type, attrs);
    }
    inputRules({ type }) {
        return [prosemirror_inputrules_1.wrappingInputRule(/^%%%$/, type)];
    }
    toMarkdown(state, node) {
        state.write("\n%%%" + (node.attrs.id || "story") + "\n");
        state.renderContent(node);
        state.ensureNewLine();
        state.write("%%%");
        state.closeBlock(node);
        console.log(state);
    }
    parseMarkdown() {
        return {
            block: "container_story",
            getAttrs: tok => {
                return { id: tok.info };
            },
        };
    }
}
exports.default = Story;
//# sourceMappingURL=Story.js.map