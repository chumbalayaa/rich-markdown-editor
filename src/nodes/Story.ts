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

        // button.addEventListener("click", this.addClickHandler());
        button.addEventListener(
          "click",
          (function (node) {
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

  addClickHandler = (elem, arg1) => {
    elem.addEventListener(
      "click",
      function (e) {
        console.log(e.target);
        alert("Story Button Clicked for " + arg1);
        console.log(arg1);
        return;
      },
      false
    );
  };

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  handleButtonClick = (event: MouseEvent) => {
    console.log(event.target);
    alert("Story Button Clicked for " + this.schema.attrs.id);
    console.log(this.schema.attrs.id);
    return;
  };

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
