import { wrappingInputRule } from "prosemirror-inputrules";
import { MarkdownSerializerState } from "prosemirror-markdown";
import toggleWrap from "../commands/toggleWrap";
import { Node as ProsemirrorNode } from "prosemirror-model";
import Node from "./Node";
export default class Story extends Node {
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
          getAttrs: (ele: HTMLDivElement) => {
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
        button.addEventListener(
          "click",
          (function () {
            return function (e) {
              alert(`Story ${e.target.id} clicked!`);
            };
          })(),
          false
        );

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
    return attrs => toggleWrap(type, attrs);
  }

  inputRules({ type }) {
    return [wrappingInputRule(/^%%%$/, type)];
  }

  toMarkdown(state: MarkdownSerializerState, node: ProsemirrorNode) {
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
