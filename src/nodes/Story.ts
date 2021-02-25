import { wrappingInputRule } from "prosemirror-inputrules";
import toggleWrap from "../commands/toggleWrap";
import ReactDOM from "react-dom";
import Node from "./Node";
import StoryIcon from "./StoryIcon";

export default class Story extends Node {
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

        button.addEventListener(
          "click",
          (function (node) {
            console.log(">", node);
            return function (e) {
              console.log(e, node, tmpID);
            };
          })(this),
          false
        );

        button.innerText = "Go to Story";
        button.style.marginRight = "5px";

        let component;

        if (node.attrs.id) {
          component = StoryIcon;
        }

        const icon = document.createElement("div");
        icon.className = "icon";
        ReactDOM.render(component, icon);

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
    return attrs => toggleWrap(type, attrs);
  }

  inputRules({ type }) {
    return [wrappingInputRule(/^%%%$/, type)];
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
