import Node from "./Node";
export default class Story extends Node {
    get name(): string;
    get randomInt(): number;
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
            getAttrs: () => string;
        }[];
        toDOM: (node: any) => (string | HTMLDivElement | {
            class: string;
        } | (string | number | {
            class: string;
        })[] | (string | HTMLButtonElement | {
            contentEditable: boolean;
        })[])[];
    };
    commands({ type }: {
        type: any;
    }): (attrs: any) => (state: any, dispatch: any) => boolean;
    addClickHandler: (elem: any, arg1: any) => void;
    handleButtonClick: (event: MouseEvent) => void;
    inputRules({ type }: {
        type: any;
    }): import("prosemirror-inputrules").InputRule<any>[];
    toMarkdown(state: any, node: any): void;
    parseMarkdown(): {
        block: string;
        getAttrs: (tok: any) => {
            id: any;
        };
    };
}
//# sourceMappingURL=Story.d.ts.map