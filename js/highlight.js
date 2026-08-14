/* ===== C 语言轻量语法高亮 ===== */
(function () {
  'use strict';

  var KEYWORDS = new Set([
    'auto','break','case','char','const','continue','default','do','double','else',
    'enum','extern','float','for','goto','if','inline','int','long','register',
    'restrict','return','short','signed','sizeof','static','struct','switch','typedef',
    'union','unsigned','void','volatile','while','_Bool','_Complex','_Imaginary'
  ]);

  var TYPES = new Set(['bool','true','false','NULL','size_t','FILE','stdin','stdout','stderr']);

  // 词法规则（顺序敏感：注释/字符串/字符优先）
  var TOKEN_RE = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|#[^\s]*|0[xX][0-9a-fA-F]+|\d+\.?\d*(?:[eE][+-]?\d+)?|\.\d+|[A-Za-z_]\w*|\s+|.)/g;

  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function classify(tok) {
    if (/^\/\//.test(tok) || /^\/\*/.test(tok)) return 'tok-com';
    if (/^"/.test(tok)) return 'tok-str';
    if (/^'/.test(tok)) return 'tok-char';
    if (/^#/.test(tok)) return 'tok-pp';
    if (/^[A-Za-z_]/.test(tok)) {
      if (KEYWORDS.has(tok)) return 'tok-kw';
      if (TYPES.has(tok)) return 'tok-type';
      return 'tok-id';
    }
    if (/^[0-9]/.test(tok) || /^\.\d/.test(tok)) return 'tok-num';
    return null; // 空白与运算符等原样输出
  }

  function highlight(code) {
    var out = '';
    TOKEN_RE.lastIndex = 0;
    var m;
    while ((m = TOKEN_RE.exec(code)) !== null) {
      var t = m[0];
      var c = classify(t);
      if (c === 'tok-id') {
        // 标识符后紧跟 '(' 视为函数名
        var rest = code.slice(TOKEN_RE.lastIndex);
        c = /^\s*\(/.test(rest) ? 'tok-func' : null;
      }
      if (c) out += '<span class="' + c + '">' + esc(t) + '</span>';
      else out += esc(t);
    }
    return out;
  }

  window.highlightC = highlight;
})();
