import { MarkdownSerializerState } from "prosemirror-markdown";
import { Node as ProsemirrorNode } from "prosemirror-model";
import Node from "./Node";
export default class Story extends Node {
    get name(): string;
    get schema(): {
        attrs: {
            id: {
                default: string;
            };
        };
        content: string;
        group: string;
        defining: boolean;
        draggable: boolean;
        parseDOM: {
            tag: string;
            preserveWhitespace: string;
            contentElement: string;
            getAttrs: (ele: HTMLDivElement) => {
                id: string;
            };
        }[];
        toDOM: (node: any) => (string | {
            class: string;
        } | (string | HTMLButtonElement | {
            contentEditable: boolean;
        })[] | (string | number | {
            class: string;
        })[])[];
    };
    commands({ type }: {
        type: any;
    }): (attrs: any) => (state: any, dispatch: any) => boolean;
    inputRules({ type }: {
        type: any;
    }): import("prosemirror-inputrules").InputRule<any>[];
    toMarkdown(state: MarkdownSerializerState, node: ProsemirrorNode): void;
    parseMarkdown(): {
        block: string;
        getAttrs: (tok: any) => {
            id: any;
        };
    };
}
//# sourceMappingURL=Story.d.ts.map