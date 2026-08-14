/* ===== 工科数学学习 App 核心逻辑（数学分析 + 线性代数 双课程） ===== */
(function () {
  'use strict';

  /* ---------- 数据与状态 ---------- */
  var COURSES = {
    math: { id: 'math', title: '工科数学分析', icon: '📐', desc: '极限、导数、积分、级数、多元微积分' },
    linear: { id: 'linear', title: '线性代数', icon: '🧮', desc: '行列式、矩阵、向量空间、特征值、二次型' }
  };

  var chapters = Object.keys(window.CHAPTERS || {})
    .map(function (k) { return window.CHAPTERS[k]; })
    .sort(function (a, b) {
      var ca = (a.course || 'math'), cb = (b.course || 'math');
      if (ca !== cb) return ca < cb ? -1 : 1;
      return (a.order || 0) - (b.order || 0);
    });

  var STORE_KEY = 'mathlearn.v1';
  var state = loadState();

  function loadState() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        var s = JSON.parse(raw);
        return {
          completed: s.completed || {},
          scores: s.scores || {},
          theme: s.theme || 'auto',
          course: (s.course === 'linear' || s.course === 'math') ? s.course : 'math'
        };
      }
    } catch (e) { /* ignore */ }
    return { completed: {}, scores: {}, theme: 'auto', course: 'math' };
  }

  function saveState() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  function byId(id) {
    for (var i = 0; i < chapters.length; i++) if (chapters[i].id === id) return chapters[i];
    return null;
  }

  function courseChapters(cid) {
    return chapters.filter(function (c) { return (c.course || 'math') === cid; });
  }

  /* ---------- 工具 ---------- */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function stripTags(html) {
    var d = document.createElement('div');
    d.innerHTML = html || '';
    return d.textContent || '';
  }

  function toast(msg) {
    var el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.remove('hidden');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.classList.add('hidden'); }, 1800);
  }

  function copyText(txt, done) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(done, function () { legacyCopy(txt); done(); });
    } else { legacyCopy(txt); done(); }
  }
  function legacyCopy(txt) {
    var ta = document.createElement('textarea');
    ta.value = txt;
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* ignore */ }
    document.body.removeChild(ta);
  }

  function applyTheme() {
    var mode = state.theme;
    var dark = mode === 'dark' || (mode === 'auto' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#000000' : '#0A84FF');
    var btn = document.getElementById('btn-theme');
    if (btn) btn.textContent = dark ? '☾' : '☀';
  }

  function isCompleted(id) { return !!state.completed[id]; }
  function completedCount(cid) {
    var n = 0;
    chapters.forEach(function (c) {
      if ((!cid || (c.course || 'math') === cid) && isCompleted(c.id)) n++;
    });
    return n;
  }
  function progressPct(cid) {
    var list = cid ? courseChapters(cid) : chapters;
    if (!list.length) return 0;
    var done = 0;
    list.forEach(function (c) { if (isCompleted(c.id)) done++; });
    return Math.round(done / list.length * 100);
  }
  function firstIncomplete(cid) {
    var list = courseChapters(cid);
    for (var i = 0; i < list.length; i++) if (!isCompleted(list[i].id)) return list[i];
    return null;
  }

  /* ---------- 视图渲染 ---------- */
  var view = document.getElementById('view');
  var backBtn = document.getElementById('btn-back');
  var titleEl = document.getElementById('topbar-title');

  function setHeader(title, showBack) {
    titleEl.textContent = title;
    backBtn.classList.toggle('hidden', !showBack);
  }

  function go(hash) {
    if (location.hash === hash) render();
    else location.hash = hash;
  }

  function render() {
    var h = location.hash || '#/';
    if (h.indexOf('#/chapter/') === 0) return renderChapter(h.slice('#/chapter/'.length));
    if (h.indexOf('#/quiz/') === 0) return renderQuiz(h.slice('#/quiz/'.length));
    renderHome();
  }

  /* ---------- 首页 ---------- */
  var searchQuery = '';

  function renderHome() {
    setHeader('工科数学学习', false);
    var total = chapters.length;
    var doneAll = completedCount();
    var pctAll = progressPct();
    var cur = state.course;
    var curTitle = COURSES[cur].title;
    var curList = courseChapters(cur);
    var curDone = completedCount(cur);
    var next = firstIncomplete(cur);

    var html = '';
    html += '<div class="view-title">工科数学学习</div>';
    html += '<p class="view-sub">' + COURSES.math.title + ' + ' + COURSES.linear.title + ' · ' + total + ' 章精讲 + 习题练习</p>';

    // 总进度卡
    html += '<div class="card progress-card">';
    html += '<div class="progress-ring" style="--p:' + pctAll + '"><span>' + pctAll + '%</span></div>';
    html += '<div class="progress-meta">';
    html += '<div class="big">已完成 ' + doneAll + ' / ' + total + ' 章</div>';
    html += '<div class="small">' + curTitle + '：' + curDone + ' / ' + curList.length + ' 章</div>';
    html += '<div class="bar"><i style="width:' + pctAll + '%"></i></div>';
    html += '</div></div>';

    // 课程切换
    html += '<div class="course-tabs">';
    Object.keys(COURSES).forEach(function (cid) {
      var c = COURSES[cid];
      html += '<button class="course-tab' + (cid === cur ? ' active' : '') + '" data-course="' + cid + '">' + c.icon + ' ' + esc(c.title) + '</button>';
    });
    html += '</div>';

    if (next) {
      html += '<button class="btn" data-nav="chapter/' + next.id + '">▶ 继续学习：' + esc(next.title) + '</button>';
    }

    html += '<div class="search-wrap" style="margin-top:14px">';
    html += '<span class="mag">🔍</span>';
    html += '<input id="search-input" type="search" placeholder="搜索两门课的章节 / 知识点…" value="' + esc(searchQuery) + '">';
    html += '</div>';

    // 列表：搜索时跨课程，否则仅当前课程
    var list = chapters.filter(function (c) {
      if (searchQuery) {
        var q = searchQuery.toLowerCase();
        var hay = (c.title + ' ' + (c.summary || '')).toLowerCase();
        (c.sections || []).forEach(function (s) {
          if (s.html) hay += ' ' + stripTags(s.html);
          if (s.code) hay += ' ' + s.code;
          if (s.title) hay += ' ' + s.title;
          if (s.note) hay += ' ' + s.note;
        });
        return hay.indexOf(q) !== -1;
      }
      return (c.course || 'math') === cur;
    });

    if (!list.length) {
      html += '<div class="search-empty">没有找到相关内容，换个关键词试试～</div>';
    } else {
      html += '<div style="height:8px"></div>';
      list.forEach(function (c) {
        var score = state.scores[c.id];
        var courseInfo = COURSES[c.course || 'math'];
        html += '<button class="chapter-item" data-nav="chapter/' + c.id + '">';
        html += '<span class="chapter-icon">' + (c.icon || courseInfo.icon) + '</span>';
        html += '<span class="chapter-body">';
        html += '<span class="t">' + esc(c.title) + '</span>';
        html += '<span class="s">' + esc(c.summary || '') + '</span>';
        html += '</span>';
        html += '<span class="chapter-flag">';
        if (searchQuery) html += '<span class="badge" style="background:' + (c.course === 'linear' ? 'rgba(175,82,222,0.15);color:#af52de' : 'rgba(10,132,255,0.15);color:#0a84ff') + '">' + esc(courseInfo.title) + '</span>';
        if (isCompleted(c.id)) html += '<span class="badge done">✓ 已学完</span>';
        if (score != null) html += '<span class="badge score">练习 ' + score + ' 分</span>';
        if (!isCompleted(c.id) && score == null) html += '<span class="badge">' + (c.exercises ? c.exercises.length + ' 题' : '') + '</span>';
        html += '</span>';
        html += '<span class="chapter-arrow">›</span>';
        html += '</button>';
      });
    }

    view.innerHTML = html;

    var input = document.getElementById('search-input');
    if (input) input.addEventListener('input', function (e) {
      searchQuery = e.target.value.trim();
      renderHome();
      var inp = document.getElementById('search-input');
      if (inp) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }
    });
  }

  /* ---------- 章节阅读页 ---------- */
  function renderChapter(id) {
    var c = byId(id);
    if (!c) return renderHome();
    setHeader(c.title, true);

    var curList = courseChapters(c.course || 'math');
    var idx = curList.indexOf(c);
    var prev = idx > 0 ? curList[idx - 1] : null;
    var nextCh = idx < curList.length - 1 ? curList[idx + 1] : null;

    var html = '';
    var courseInfo = COURSES[c.course || 'math'];
    html += '<div class="view-title">' + (c.icon || '📘') + ' ' + esc(c.title) + '</div>';
    html += '<p class="view-sub">' + esc(courseInfo.title) + ' · ' + esc(c.summary || '') + '</p>';

    _codeCache = (c.sections || []).filter(function (s) { return s.type === 'code'; }).map(function (s) { return s.code || ''; });
    var codeIdx = 0;

    (c.sections || []).forEach(function (s, si) {
      html += '<div class="card section-card">';
      if (s.type === 'code') {
        html += '<span class="sec-chip">✍️ 例题 / 推导</span>';
        html += codeBlockHtml(s.title || '例题', codeIdx++);
        if (s.note) html += '<div class="code-note">' + esc(s.note) + '</div>';
      } else if (s.type === 'tip') {
        var lbl = s.kind === 'warn' ? '⚠️ 易错注意' : (s.kind === 'info' ? 'ℹ️ 补充说明' : '💡 小贴士');
        html += '<span class="sec-chip">' + lbl + '</span>';
        html += '<div class="tip-card kind-' + (s.kind || 'tip') + '">' + s.html + '</div>';
      } else if (s.type === 'table') {
        html += '<span class="sec-chip">📊 ' + esc(s.title || '表格') + '</span>';
        html += tableHtml(s.headers, s.rows);
      } else if (s.type === 'list') {
        html += '<span class="sec-chip">✅ 要点</span>';
        html += s.ordered ? '<ol>' : '<ul>';
        (s.items || []).forEach(function (it) { html += '<li>' + it + '</li>'; });
        html += s.ordered ? '</ol>' : '</ul>';
      } else {
        html += '<span class="sec-chip">📖 知识点</span>';
        html += '<div>' + (s.html || '') + '</div>';
      }
      html += '</div>';
    });

    // 底部操作
    html += '<div class="chapter-actions">';
    var done = isCompleted(c.id);
    html += '<button class="btn secondary" data-action="toggle-done" data-id="' + c.id + '">' + (done ? '✓ 已完成（点击取消）' : '标记为已完成') + '</button>';
    html += '<button class="btn' + (done ? ' done-state' : '') + '" data-nav="quiz/' + c.id + '">开始练习</button>';
    html += '</div>';

    html += '<div class="chapter-actions" style="margin-top:6px">';
    html += '<button class="btn ghost small" data-nav="chapter/' + (prev ? prev.id : '') + '"' + (prev ? '' : ' disabled') + '>← ' + (prev ? esc(prev.title) : '已是本课第一章') + '</button>';
    html += '<button class="btn ghost small" data-nav="chapter/' + (nextCh ? nextCh.id : '') + '"' + (nextCh ? '' : ' disabled') + '>' + (nextCh ? esc(nextCh.title) + ' →' : '已是本课最后一章') + '</button>';
    html += '</div>';

    view.innerHTML = html;
    bindCodeBlocks();
  }

  var codePool = [];
  function codeBlockHtml(title, si) {
    codePool.push(si);
    var s = _codeCache[si] || '';
    var id = codePool.length - 1;
    return '<div class="code-block"><div class="code-head"><span class="t">' + esc(title) + '</span>' +
      '<button class="copy-btn" data-copy="' + id + '">复制</button></div>' +
      '<pre><code>' + window.highlightC(s) + '</code></pre></div>';
  }

  var _codeCache = [];
  function bindCodeBlocks() {
    view.querySelectorAll('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        copyText(_codeCache[codePool[+btn.dataset.copy]] || '', function () { toast('已复制到剪贴板'); });
      });
    });
  }

  /* ---------- 表格 ---------- */
  function tableHtml(headers, rows) {
    if (!headers || !headers.length) return '';
    var h = '<div class="table-scroll"><table class="data-table"><thead><tr>';
    headers.forEach(function (x) { h += '<th>' + esc(x) + '</th>'; });
    h += '</tr></thead><tbody>';
    (rows || []).forEach(function (r) {
      h += '<tr>';
      r.forEach(function (cell) { h += '<td>' + esc(cell) + '</td>'; });
      h += '</tr>';
    });
    h += '</tbody></table></div>';
    return h;
  }

  /* ---------- 练习页 ---------- */
  var quiz = null;

  function renderQuiz(id) {
    var c = byId(id);
    if (!c) return renderHome();
    var exs = c.exercises || [];
    setHeader(c.title + ' · 练习', true);

    if (!exs.length) {
      view.innerHTML = '<div class="card"><p style="text-align:center;color:var(--text-2)">本章暂无练习题。</p></div>';
      return;
    }
    quiz = { chId: id, i: 0, correct: 0, selected: null, answered: false, multi: [], fillVal: '', results: [] };
    renderQuizQuestion(c, exs);
  }

  function renderQuizQuestion(c, exs) {
    var q = exs[quiz.i];
    var total = exs.length;
    var html = '';

    html += '<div class="quiz-top"><span>' + (quiz.i + 1) + ' / ' + total + ' · ' + quiz.correct + ' 对</span>';
    html += '<span class="quiz-dots">';
    for (var d = 0; d < total; d++) {
      if (d === quiz.i) html += '<i class="on"></i>';
      else if (d < quiz.i) html += '<i class="' + (answeredOk(d) ? 'ok' : 'bad') + '"></i>';
      else html += '<i></i>';
    }
    html += '</span></div>';

    html += '<div class="card">';
    html += '<div class="q-label">' + typeLabel(q.type) + '</div>';
    html += '<div class="quiz-question">' + esc(q.question) + '</div>';

    if (q.code) {
      codePool.length = 0; _codeCache = [q.code];
      html += '<div class="code-block"><div class="code-head"><span class="t">✍️ 题目 / 推导</span></div><pre><code>' + window.highlightC(q.code) + '</code></pre></div>';
    }

    if (q.type === 'fill') {
      html += '<div class="fill-row"><input id="fill-input" type="text" placeholder="输入答案" value="' + esc(quiz.fillVal) + '"><button class="btn small" id="fill-submit" style="flex:none">提交</button></div>';
    } else if (q.type === 'multiple') {
      var labels = ['A', 'B', 'C', 'D', 'E', 'F'];
      (q.options || []).forEach(function (op, oi) {
        var sel = quiz.multi.indexOf(oi) !== -1;
        var cls = 'option';
        if (quiz.answered) {
          var isAns = q.answer.indexOf(oi) !== -1;
          if (sel && isAns) cls += ' correct';
          else if (sel && !isAns) cls += ' wrong';
          else if (!sel && isAns) cls += ' correct';
        } else if (sel) cls += ' selected';
        html += '<button class="' + cls + '" data-multi="' + oi + '"' + (quiz.answered ? ' disabled' : '') + '>';
        html += '<span class="key">' + labels[oi] + '</span><span>' + esc(op) + '</span></button>';
      });
      if (!quiz.answered) {
        html += '<button class="btn" id="multi-confirm" style="margin-top:4px">确认答案</button>';
      }
    } else {
      var labels2 = ['A', 'B', 'C', 'D', 'E', 'F'];
      (q.options || []).forEach(function (op, oi) {
        var cls = 'option';
        if (quiz.answered) {
          if (oi === q.answer) cls += ' correct';
          else if (oi === quiz.selected) cls += ' wrong';
          else cls += ' disabled';
        } else if (oi === quiz.selected) cls += ' selected';
        html += '<button class="' + cls + '" data-opt="' + oi + '"><span class="key">' + labels2[oi] + '</span><span>' + esc(op) + '</span></button>';
      });
    }

    if (quiz.answered) {
      var ok = answeredOk(quiz.i);
      html += '<div class="explain ' + (ok ? 'right' : 'wrong') + '" style="margin-top:12px">';
      html += '<span class="x-label">' + (ok ? '✅ 回答正确' : '❌ 回答错误，正确答案：' + answerText(q)) + '</span>';
      html += esc(q.explanation || '');
      html += '</div>';
      html += '<button class="btn" id="quiz-next" style="margin-top:14px">' + (quiz.i === total - 1 ? '查看成绩' : '下一题') + '</button>';
    }

    view.innerHTML = html;

    if (!quiz.answered) {
      if (q.type === 'fill') {
        var inp = document.getElementById('fill-input');
        var sub = document.getElementById('fill-submit');
        if (inp) {
          inp.addEventListener('input', function (e) { quiz.fillVal = e.target.value; });
          inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') submitFill(q); });
        }
        if (sub) sub.addEventListener('click', function () { submitFill(q); });
      } else if (q.type === 'multiple') {
        view.querySelectorAll('[data-multi]').forEach(function (b) {
          b.addEventListener('click', function () {
            var oi = +b.dataset.multi;
            var ix = quiz.multi.indexOf(oi);
            if (ix === -1) quiz.multi.push(oi); else quiz.multi.splice(ix, 1);
            quiz.selected = oi;
            renderQuizQuestion(c, exs);
          });
        });
        var mc = document.getElementById('multi-confirm');
        if (mc) mc.addEventListener('click', function () {
          if (!quiz.multi.length) { toast('请先选择答案'); return; }
          submitAnswer(quiz.multi, q);
        });
      } else {
        view.querySelectorAll('[data-opt]').forEach(function (b) {
          b.addEventListener('click', function () {
            var oi = +b.dataset.opt;
            quiz.selected = oi;
            submitAnswer(oi, q);
          });
        });
      }
    } else {
      var nx = document.getElementById('quiz-next');
      if (nx) nx.addEventListener('click', function () {
        quiz.i++;
        quiz.answered = false; quiz.selected = null; quiz.multi = []; quiz.fillVal = '';
        if (quiz.i >= total) renderQuizResult(c, exs);
        else renderQuizQuestion(c, exs);
      });
    }
  }

  function submitFill(q) {
    var inp = document.getElementById('fill-input');
    var val = inp ? inp.value.trim() : '';
    quiz.fillVal = val;
    var ok = (q.accept || []).some(function (a) { return a.trim().toLowerCase() === val.toLowerCase(); });
    quiz.answered = true;
    quiz.selected = null;
    quiz.results.push(ok);
    if (ok) quiz.correct++;
    renderQuizQuestion(byId(quiz.chId), byId(quiz.chId).exercises);
  }

  function submitAnswer(ans, q) {
    quiz.answered = true;
    var ok = Array.isArray(q.answer)
      ? arraysEqual(ans.slice().sort(), q.answer.slice().sort())
      : ans === q.answer;
    quiz.results.push(ok);
    if (ok) quiz.correct++;
    renderQuizQuestion(byId(quiz.chId), byId(quiz.chId).exercises);
  }

  function arraysEqual(a, b) {
    return a.length === b.length && a.every(function (v, i) { return v === b[i]; });
  }

  function answeredOk(i) {
    return !!(quiz.results && quiz.results[i]);
  }

  function typeLabel(t) {
    if (t === 'multiple') return '☑ 多选题（可多选）';
    if (t === 'code') return '✍️ 解题 / 推导题';
    if (t === 'fill') return '✏️ 填空题';
    return '◉ 单选题';
  }

  function answerText(q) {
    if (q.type === 'fill') return (q.accept || [])[0] || '';
    var labels = ['A', 'B', 'C', 'D', 'E', 'F'];
    if (Array.isArray(q.answer)) return q.answer.map(function (i) { return labels[i]; }).join('、');
    return labels[q.answer] || '';
  }

  function renderQuizResult(c, exs) {
    var total = exs.length;
    var pct = Math.round(quiz.correct / total * 100);
    var prevBest = state.scores[c.id];
    if (prevBest == null || pct > prevBest) {
      state.scores[c.id] = pct;
      saveState();
    }
    var face = pct === 100 ? '🏆' : pct >= 80 ? '🎉' : pct >= 60 ? '👍' : '📚';
    var html = '';
    html += '<div class="card" style="margin-top:20px">';
    html += '<div class="result-icon">' + face + '</div>';
    html += '<div class="result-title">' + esc(c.title) + ' 练习完成</div>';
    html += '<div class="result-score">' + pct + '<span style="font-size:20px">分</span></div>';
    html += '<div class="result-detail">答对 ' + quiz.correct + ' / ' + total + ' 题' +
      (prevBest != null && pct < prevBest ? ' · 历史最佳 ' + prevBest + ' 分' : '') + '</div>';
    html += '<div class="chapter-actions">';
    html += '<button class="btn secondary" id="quiz-retry">重新练习</button>';
    html += '<button class="btn" data-nav="chapter/' + c.id + '">返回本章</button>';
    html += '</div>';
    html += '</div>';
    view.innerHTML = html;
    var rt = document.getElementById('quiz-retry');
    if (rt) rt.addEventListener('click', function () {
      quiz = { chId: c.id, i: 0, correct: 0, selected: null, answered: false, multi: [], fillVal: '', results: [] };
      renderQuizQuestion(c, exs);
    });
  }

  /* ---------- 全局事件 ---------- */
  document.addEventListener('click', function (e) {
    var nav = e.target.closest('[data-nav]');
    if (nav && nav.dataset.nav) {
      if (nav.dataset.nav.indexOf('chapter/') === 0 && nav.dataset.nav.length === 'chapter/'.length) return;
      go('#/' + nav.dataset.nav);
      return;
    }
    var tab = e.target.closest('[data-course]');
    if (tab && COURSES[tab.dataset.course]) {
      state.course = tab.dataset.course;
      saveState();
      renderHome();
      return;
    }
    var act = e.target.closest('[data-action]');
    if (act && act.dataset.action === 'toggle-done') {
      var id = act.dataset.id;
      if (isCompleted(id)) delete state.completed[id];
      else state.completed[id] = true;
      saveState();
      renderChapter(id);
      return;
    }
  });

  backBtn.addEventListener('click', function () {
    var h = location.hash || '#/';
    if (h.indexOf('#/quiz/') === 0) location.hash = '#/chapter/' + h.slice('#/quiz/'.length);
    else if (h.indexOf('#/chapter/') === 0) location.hash = '#/';
    else location.hash = '#/';
  });

  document.getElementById('btn-theme').addEventListener('click', function () {
    if (state.theme === 'auto') state.theme = 'light';
    else if (state.theme === 'light') state.theme = 'dark';
    else state.theme = 'auto';
    saveState();
    applyTheme();
    toast(state.theme === 'auto' ? '主题：跟随系统' : state.theme === 'light' ? '主题：浅色' : '主题：深色');
  });

  window.addEventListener('hashchange', render);

  /* ---------- 启动 ---------- */
  applyTheme();
  render();
})();
