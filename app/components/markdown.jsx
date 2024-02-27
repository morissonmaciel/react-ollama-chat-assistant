import React from "react";
import { createGlobalStyle } from "styled-components";
import { remark } from "remark";
import html from "remark-html";
import remarkRehype from "remark-rehype";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/github.min.css";

const MarkdownCSS = createGlobalStyle`
  .markdown-html {
    font-family: 'Monospace', monospace;
    font-size: 9pt;
    line-height: 1.8;
    padding: 4px;
  }

  .markdown-html pre {
    overflow-x: auto;
    overflow-y: hidden;
  }
`;

const markdownToHTML = (markdown) => {
  return remark()
    .use(html)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeFormat)
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .processSync(markdown)
    .toString();
};

export const Markdown = ({ children }) => (
  <div>
    <MarkdownCSS />
    <div
      className="markdown-html"
      dangerouslySetInnerHTML={{
        __html: markdownToHTML(children),
      }}
    />
  </div>
);
