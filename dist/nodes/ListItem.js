"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prosemirror_schema_list_1 = require("prosemirror-schema-list");
const Node_1 = __importDefault(require("./Node"));
const isInList_1 = __importDefault(require("../queries/isInList"));
class ListItem extends Node_1.default {
    get name() {
        return "list_item";
    }
    get schema() {
        return {
            content: "paragraph block*",
            defining: true,
            draggable: true,
            parseDOM: [{ tag: "li" }],
            toDOM: () => ["li", 0],
        };
    }
    keys({ type }) {
        return {
            Enter: prosemirror_schema_list_1.splitListItem(type),
            Tab: prosemirror_schema_list_1.sinkListItem(type),
            "Shift-Tab": prosemirror_schema_list_1.liftListItem(type),
            "Mod-]": prosemirror_schema_list_1.sinkListItem(type),
            "Mod-[": prosemirror_schema_list_1.liftListItem(type),
            "Shift-Enter": (state, dispatch) => {
                if (!isInList_1.default(state))
                    return false;
                if (!state.selection.empty)
                    return false;
                const { tr, selection } = state;
                dispatch(tr.split(selection.to));
                return true;
            },
        };
    }
    toMarkdown(state, node) {
        state.renderContent(node);
    }
    parseMarkdown() {
        return { block: "list_item" };
    }
}
exports.default = ListItem;
//# sourceMappingURL=ListItem.js.map