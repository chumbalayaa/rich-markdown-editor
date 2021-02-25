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
    constructor() {
        super(...arguments);
        this.addClickHandler = (elem, arg1) => {
            elem.addEventListener("click", function (e) {
                console.log(e.target);
                alert("Story Button Clicked for " + arg1);
                console.log(arg1);
                return;
            }, false);
        };
        this.handleButtonClick = (event) => {
            console.log(event.target);
            alert("Story Button Clicked for " + this.schema.attrs.id);
            console.log(this.schema.attrs.id);
            return;
        };
    }
    get name() {
        return "container_story";
    }
    get randomInt() {
        return Math.random() * 10000;
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
                    getAttrs: () => "warning",
                },
            ],
            toDOM: node => {
                const button = document.createElement("button");
                node.attrs.id =
                    node.attrs.id === "story" ? Math.random() * 1000 : node.attrs.id;
                const tmpID = node.attrs.id;
                button.addEventListener("click", (function (node) {
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
            getAttrs: tok => ({ id: tok.info }),
        };
    }
}
exports.default = Story;
//# sourceMappingURL=Story.js.map