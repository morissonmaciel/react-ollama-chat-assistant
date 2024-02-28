import React, { useEffect, useState } from "react";
import rehypeFormat from "rehype-format";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import rehypeWrap from "rehype-wrap";
import { remark } from "remark";
import html from "remark-html";
import remarkRehype from "remark-rehype";

import "highlight.js/styles/github-dark.min.css";

export const Markdown = ({ children }) => {
  const markdownToHTML = (markdown) => {
    return new Promise((resolve, _) => {
      const processor = remark()
        .use(html)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeFormat)
        .use(rehypeHighlight)
        .use(rehypeStringify, { allowDangerousHtml: true });
      const ast = processor.processSync(markdown);
      resolve(ast.toString());
    });
  };

  useEffect(() => {
    markdownToHTML(children).then((html) => setInnerHtml(html));
  }, [children]);

  const [innerHtml, setInnerHtml] = useState("");

  return (
    <div>
      <div
        className="markdown-html"
        dangerouslySetInnerHTML={{ __html: innerHtml }}
      />
    </div>
  );
};
