import MarkdownIt from "markdown-it";
import hljs from "highlight.js/lib/core";
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/vbscript-html';
import anchor from "markdown-it-anchor";
import Token from "markdown-it/lib/token";

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', html);

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
