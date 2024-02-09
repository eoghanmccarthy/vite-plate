import { useRef } from "react";
import { cn, withProps } from "@udecode/cn";
import {
  createPlateEditor,
  createPlugins,
  Plate,
  PlateLeaf,
  PlateElement,
  RenderAfterEditable,
  deserializeHtml,
} from "@udecode/plate-common";
import { serializeHtml } from "@udecode/plate-serializer-html";
import { createAlignPlugin } from "@udecode/plate-alignment";
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
  MARK_UNDERLINE,
} from "@udecode/plate-basic-marks";
import { createBlockSelectionPlugin } from "@udecode/plate-selection";
import {
  createFontBackgroundColorPlugin,
  createFontColorPlugin,
  createFontSizePlugin,
} from "@udecode/plate-font";
import { createLinkPlugin, ELEMENT_LINK } from "@udecode/plate-link";
import {
  createCodeBlockPlugin,
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
  ELEMENT_CODE_SYNTAX,
} from "@udecode/plate-code-block";
import { createIndentPlugin } from "@udecode/plate-indent";
import { createIndentListPlugin } from "@udecode/plate-indent-list";
import {
  createHighlightPlugin,
  MARK_HIGHLIGHT,
} from "@udecode/plate-highlight";
import {
  createBlockquotePlugin,
  ELEMENT_BLOCKQUOTE,
} from "@udecode/plate-block-quote";
import {
  createHeadingPlugin,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from "@udecode/plate-heading";
import { withPlaceholders } from "@/components/plate-ui/placeholder";
import { ELEMENT_LI, ELEMENT_OL, ELEMENT_UL } from "@udecode/plate-list";
import {
  createHorizontalRulePlugin,
  ELEMENT_HR,
} from "@udecode/plate-horizontal-rule";
import {
  createParagraphPlugin,
  ELEMENT_PARAGRAPH,
} from "@udecode/plate-paragraph";

import { CodeBlockElement } from "@/components/plate-ui/code-block-element";
import { CodeLeaf } from "@/components/plate-ui/code-leaf";
import { CodeLineElement } from "@/components/plate-ui/code-line-element";
import { CodeSyntaxLeaf } from "@/components/plate-ui/code-syntax-leaf";
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons";
import { HeadingElement } from "@/components/plate-ui/heading-element";
import { HighlightLeaf } from "@/components/plate-ui/highlight-leaf";
import { HrElement } from "@/components/plate-ui/hr-element";
import { LinkElement } from "@/components/plate-ui/link-element";
import { LinkFloatingToolbar } from "@/components/plate-ui/link-floating-toolbar";
import { ListElement } from "@/components/plate-ui/list-element";
import { ParagraphElement } from "@/components/plate-ui/paragraph-element";

import { Editor } from "@/components/editor.tsx";

const resetBlockTypesCommonRule = {
  defaultType: ELEMENT_PARAGRAPH,
  types: [ELEMENT_BLOCKQUOTE],
};

const plugins = createPlugins(
  [
    // Nodes
    createParagraphPlugin(),
    createHeadingPlugin(),
    createBlockquotePlugin(),
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
            ELEMENT_BLOCKQUOTE,
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
            ELEMENT_BLOCKQUOTE,
            ELEMENT_CODE_BLOCK,
          ],
        },
      },
    }),

    // Functionality
    createBlockSelectionPlugin({
      options: {
        sizes: {
          bottom: 0,
          top: 0,
        },
      },
    }),
  ],
  {
    components: withPlaceholders({
      [ELEMENT_CODE_BLOCK]: CodeBlockElement,
      [ELEMENT_CODE_LINE]: CodeLineElement,
      [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
      [ELEMENT_H1]: withProps(HeadingElement, { variant: "h1" }),
      [ELEMENT_H2]: withProps(HeadingElement, { variant: "h2" }),
      [ELEMENT_H3]: withProps(HeadingElement, { variant: "h3" }),
      [ELEMENT_H4]: withProps(HeadingElement, { variant: "h4" }),
      [ELEMENT_H5]: withProps(HeadingElement, { variant: "h5" }),
      [ELEMENT_H6]: withProps(HeadingElement, { variant: "h6" }),
      [ELEMENT_HR]: HrElement,
      [ELEMENT_LI]: withProps(PlateElement, { as: "li" }),
      [ELEMENT_LINK]: LinkElement,
      [ELEMENT_OL]: withProps(ListElement, { variant: "ol" }),
      [ELEMENT_PARAGRAPH]: ParagraphElement,
      [ELEMENT_UL]: withProps(ListElement, { variant: "ul" }),
      [MARK_BOLD]: withProps(PlateLeaf, { as: "strong" }),
      [MARK_CODE]: CodeLeaf,
      [MARK_HIGHLIGHT]: HighlightLeaf,
      [MARK_ITALIC]: withProps(PlateLeaf, { as: "em" }),
      [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: "s" }),
      [MARK_UNDERLINE]: withProps(PlateLeaf, { as: "u" }),
    }),
  },
);

const defaultValue = [
  {
    children: [{ text: "Hello, World!" }],
    id: "1",
    type: "p",
  },
];

// https://github.com/udecode/plate/issues/2804
const excludedSelectionPlugin = plugins?.filter(
  (plugin) => plugin?.key !== "blockSelection",
);

const editor = createPlateEditor({ plugins: excludedSelectionPlugin });

export default function PlateEditor() {
  const containerRef = useRef(null);

  // mock html string from server
  const htmlString = `<div><p>Hello, World!</p></div>`;

  const deserializedValue = deserializeHtml(editor, {
    element: htmlString,
  });

  const initialValue = deserializedValue || defaultValue;

  //https://github.com/udecode/plate/issues/2804
  const editorRef = useRef(editor);

  const onEditorChange = (value) => {
    if (!editorRef.current) {
      return;
    }

    const html = serializeHtml(editorRef.current, {
      nodes: value,
    });
    // save html to server
  };

  return (
    <div className="max-w-[1336px] rounded-lg border bg-background shadow">
      <Plate
        initialValue={initialValue}
        onChange={onEditorChange}
        plugins={excludedSelectionPlugin}
      >
        <div
          className={cn(
            // Block selection
            "[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4",
          )}
          ref={containerRef}
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
