import * as React from "react";
import Node from "./Node";
export default class Embed extends Node {
    get name(): string;
    get schema(): {
        content: string;
        group: string;
        atom: boolean;
        attrs: {
            href: {};
            component: {};
            matches: {};
        };
        parseDOM: {
            tag: string;
            getAttrs: (dom: HTMLIFrameElement) => {
                href: string;
                component: typeof React.Component | React.FC<any>;
                matches: true | RegExpMatchArray | [];
            } | {
                href?: undefined;
                component?: undefined;
                matches?: undefined;
            };
        }[];
        toDOM: (node: any) => (string | number | {
            src: any;
            contentEditable: boolean;
        })[];
    };
    component({ isEditable, isSelected, theme, node }: {
        isEditable: any;
        isSelected: any;
        theme: any;
        node: any;
    }): JSX.Element;
    commands({ type }: {
        type: any;
    }): (attrs: any) => (state: any, dispatch: any) => boolean;
    toMarkdown(state: any, node: any): void;
    parseMarkdown(): {
        node: string;
        getAttrs: (token: any) => {
            href: any;
            matches: any;
            component: any;
        };
    };
}
//# sourceMappingURL=Embed.d.ts.map