import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import anchor from "markdown-it-anchor";
import Token from "markdown-it/lib/token";

export type mdDirectory = {
  id: string;
  title: string;
  tag: string;
  children: mdDirectory[];
  dom?: Element | null;
};

export function getMarkdownIt(callback?: Function) {
  const md: MarkdownIt = new MarkdownIt({
    html: true,
    xhtmlOut: true,
    linkify: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          const replaceStr = str.replace(/'/g, '\"')
          return `<div class="copyCode" data-copy='${replaceStr}'>复制代码</div>${
            hljs.highlight(replaceStr, { language: lang }).value
          }`;
        } catch (__) {}
      }

      return ""; // 使用额外的默认转义
    },
  }).use(anchor, {
    permalink: anchor.permalink.headerLink(),
    callback,
  });
  return md;
}
