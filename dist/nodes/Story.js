"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prosemirror_inputrules_1 = require("prosemirror-inputrules");
const toggleWrap_1 = __importDefault(require("../commands/toggleWrap"));
const react_dom_1 = __importDefault(require("react-dom"));
const Node_1 = __importDefault(require("./Node"));
const StoryIcon_1 = __importDefault(require("./StoryIcon"));
class Story extends Node_1.default {
    get name() {
        return "container_story";
    }
    get randomInt() {
        return Math.random() * 10000;
    }
    get schema() {
        return {
            attrs: {
                id: this.randomInt.toString(),
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
                    getAttrs: () => "warning",
                },
            ],
            toDOM: node => {
                const button = document.createElement("button");
                console.log(node.attrs.id);
                const tmpID = node.attrs.id;
                button.addEventListener("click", (function (node) {
                    console.log(">", node);
                    return function (e) {
                        console.log(e, node, tmpID);
                    };
                })(this), false);
                button.innerText = "Go to Story";
                button.style.marginRight = "5px";
                let component;
                if (node.attrs.id) {
                    component = StoryIcon_1.default;
                }
                const icon = document.createElement("div");
                icon.className = "icon";
                react_dom_1.default.render(component, icon);
                return [
                    "div",
                    { class: `story-block ${node.attrs.id}` },
                    icon,
                    ["div", { class: "content story-content" }, 0],
                    ["div", { contentEditable: false }, button],
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
                console.log(tok);
                ({ id: tok.info });
            },
        };
    }
}
exports.default = Story;
//# sourceMappingURL=Story.js.map