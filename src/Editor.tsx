import React, { useRef } from 'react';
import { cn, withProps } from '@udecode/cn';
import { createPlugins, Plate, PlateLeaf, PlateElement, RenderAfterEditable } from '@udecode/plate-common';
import { createAlignPlugin } from '@udecode/plate-alignment';
import {
    createBoldPlugin,
    createItalicPlugin,
    createCodePlugin,
    createStrikethroughPlugin,
    createUnderlinePlugin,
    MARK_BOLD,
    MARK_CODE,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_UNDERLINE
} from '@udecode/plate-basic-marks';
import { createBlockSelectionPlugin } from '@udecode/plate-selection';
import {
    createFontBackgroundColorPlugin,
    createFontColorPlugin,
    createFontSizePlugin,
} from '@udecode/plate-font';
import { createLinkPlugin, ELEMENT_LINK } from '@udecode/plate-link';
import {
    createCodeBlockPlugin,
    ELEMENT_CODE_BLOCK,
    ELEMENT_CODE_LINE,
    ELEMENT_CODE_SYNTAX,
    isCodeBlockEmpty,
    isSelectionAtCodeBlockStart,
    unwrapCodeBlock,
} from '@udecode/plate-code-block';
import { createIndentPlugin } from '@udecode/plate-indent';
import {
    createIndentListPlugin,
    KEY_LIST_STYLE_TYPE,
} from '@udecode/plate-indent-list';
import {
    createHighlightPlugin,
    MARK_HIGHLIGHT,
} from '@udecode/plate-highlight';
import {
    createHeadingPlugin,
    ELEMENT_H1,
    ELEMENT_H2,
    ELEMENT_H3,
    ELEMENT_H4,
    ELEMENT_H5,
    ELEMENT_H6,
    KEYS_HEADING
} from '@udecode/plate-heading';
import { withPlaceholders } from '@/components/plate-ui/placeholder';
import {
    ELEMENT_LI,
    ELEMENT_OL,
    ELEMENT_UL,
} from '@udecode/plate-list';
import {
    createHorizontalRulePlugin,
    ELEMENT_HR,
} from '@udecode/plate-horizontal-rule';
import {
    createParagraphPlugin,
    ELEMENT_PARAGRAPH,
} from '@udecode/plate-paragraph';

import { CodeBlockElement } from '@/components/plate-ui/code-block-element';
import { CodeLeaf } from '@/components/plate-ui/code-leaf';
import { CodeLineElement } from '@/components/plate-ui/code-line-element';
import { CodeSyntaxLeaf } from '@/components/plate-ui/code-syntax-leaf';
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';
import { HeadingElement } from '@/components/plate-ui/heading-element';
import { HighlightLeaf } from '@/components/plate-ui/highlight-leaf';
import { HrElement } from '@/components/plate-ui/hr-element';
import { LinkElement } from '@/components/plate-ui/link-element';
import { LinkFloatingToolbar } from '@/components/plate-ui/link-floating-toolbar';
import { ListElement } from '@/components/plate-ui/list-element';
import { ParagraphElement } from '@/components/plate-ui/paragraph-element';

import { Editor } from "@/components/editor.tsx";

const plugins = createPlugins(
    [
        // Nodes
        createParagraphPlugin(),
        createHeadingPlugin(),
        createCodeBlockPlugin(),
        createHorizontalRulePlugin(),
        createLinkPlugin({
            renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
        }),

        // Marks
        createBoldPlugin(),
        createItalicPlugin(),
        createUnderlinePlugin(),
        createStrikethroughPlugin(),
        createCodePlugin(),
        createFontColorPlugin(),
        createFontBackgroundColorPlugin(),
        createFontSizePlugin(),
        createHighlightPlugin(),

        // Block Style
        createAlignPlugin({
            inject: {
                props: {
                    validTypes: [ELEMENT_PARAGRAPH, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3],
                },
            },
        }),
        createIndentPlugin({
            inject: {
                props: {
                    validTypes: [
                        ELEMENT_PARAGRAPH,
                        ELEMENT_H1,
                        ELEMENT_H2,
                        ELEMENT_H3,
                        ELEMENT_CODE_BLOCK,
                    ],
                },
            },
        }),
        createIndentListPlugin({
            inject: {
                props: {
                    validTypes: [
                        ELEMENT_PARAGRAPH,
                        ELEMENT_H1,
                        ELEMENT_H2,
                        ELEMENT_H3,
                        ELEMENT_CODE_BLOCK,
                    ],
                },
            },
        }),

        // Functionality
        createBlockSelectionPlugin({
            options: {
                sizes: {
                    top: 0,
                    bottom: 0,
                },
            },
        }),
    ],
    {
        components: withPlaceholders({
            [ELEMENT_CODE_BLOCK]: CodeBlockElement,
            [ELEMENT_CODE_LINE]: CodeLineElement,
            [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
            [ELEMENT_HR]: HrElement,
            [ELEMENT_H1]: withProps(HeadingElement, { variant: 'h1' }),
            [ELEMENT_H2]: withProps(HeadingElement, { variant: 'h2' }),
            [ELEMENT_H3]: withProps(HeadingElement, { variant: 'h3' }),
            [ELEMENT_H4]: withProps(HeadingElement, { variant: 'h4' }),
            [ELEMENT_H5]: withProps(HeadingElement, { variant: 'h5' }),
            [ELEMENT_H6]: withProps(HeadingElement, { variant: 'h6' }),
            [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
            [MARK_CODE]: CodeLeaf,
            [MARK_ITALIC]: withProps(PlateLeaf, { as: 'em' }),
            [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: 's' }),
            [MARK_UNDERLINE]: withProps(PlateLeaf, { as: 'u' }),
            [ELEMENT_LINK]: LinkElement,
            [ELEMENT_UL]: withProps(ListElement, { variant: 'ul' }),
            [ELEMENT_OL]: withProps(ListElement, { variant: 'ol' }),
            [ELEMENT_LI]: withProps(PlateElement, { as: 'li' }),
            [ELEMENT_PARAGRAPH]: ParagraphElement,
            [MARK_HIGHLIGHT]: HighlightLeaf,
        }),
    }
);

const initialValue = [
    {
        id: '1',
        type: 'p',
        children: [{ text: 'Hello, World!' }],
    },
];

export default function PlateEditor() {
    const containerRef = useRef(null);

    return (
        <div className="max-w-[1336px] rounded-lg border bg-background shadow">
            <Plate plugins={plugins} initialValue={initialValue}>
                <div
                    ref={containerRef}
                    className={cn(
                        // Block selection
                        '[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4'
                    )}
                >
                    <FixedToolbar>
                        <FixedToolbarButtons />
                    </FixedToolbar>
                    <Editor className="px-[24px] py-16" />
                </div>
            </Plate>
        </div>
    );
}
