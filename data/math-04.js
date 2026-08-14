// 章节：不定积分（工科数学分析）
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS['math-04'] = {
  id: 'math-04',
  course: 'math',
  order: 4,
  icon: '🔄',
  title: '不定积分',
  summary: '从原函数出发理解不定积分，熟记基本积分公式表，掌握两类换元法与分部积分法，为定积分计算打下基础。',
  sections: [
    {
      type: 'text',
      html: '<h3>原函数与不定积分</h3><p>若在区间 I 上 <code>F′(x) = f(x)</code>，则称 <b>F(x)</b> 是 <b>f(x)</b> 在 I 上的一个<b>原函数（antiderivative）</b>。例如 (x³/3)′ = x²，所以 x³/3 是 x² 的一个原函数。原函数并不唯一：(x³/3 + 1)′ = x²，加任何常数都不影响求导结果。</p><p><b>定理：</b>若 F(x) 是 f(x) 的一个原函数，则 f(x) 的全部原函数为 F(x) + C，其中 C 为任意常数。</p><p><b>不定积分（indefinite integral）</b>就是 f(x) 全体原函数的集合，记为 ∫ f(x) dx = F(x) + C。其中 ∫ 为积分号，f(x) 为被积函数，dx 表示对变量 x 积分。容易验证：<code>(∫ f(x) dx)′ = f(x)</code>，且 <code>∫ F′(x) dx = F(x) + C</code>，即<b>求导与求不定积分互为逆运算</b>。</p><p>不定积分满足<b>线性运算法则</b>：∫ [f(x) ± g(x)] dx = ∫ f(x) dx ± ∫ g(x) dx；∫ k·f(x) dx = k∫ f(x) dx（k 为常数）。例：∫ (3x² − 2cos x) dx = x³ − 2sin x + C，直接套公式表逐项积分，这种方法称为<b>直接积分法</b>。</p>',
    },
    {
      type: 'table',
      title: '基本积分公式表（把导数公式“倒过来”即得）',
      headers: ['基本积分公式', '说明'],
      rows: [
        ['∫ k dx = kx + C', 'k 为常数'],
        ['∫ x<sup>α</sup> dx = x<sup>α+1</sup>/(α+1) + C', 'α ≠ −1'],
        ['∫ (1/x) dx = ln|x| + C', 'x ≠ 0，绝对值不能丢'],
        ['∫ e<sup>x</sup> dx = e<sup>x</sup> + C', '指数函数'],
        ['∫ a<sup>x</sup> dx = a<sup>x</sup>/ln a + C', 'a &gt; 0 且 a ≠ 1'],
        ['∫ sin x dx = −cos x + C', '三角函数'],
        ['∫ cos x dx = sin x + C', '三角函数'],
        ['∫ sec<sup>2</sup>x dx = tan x + C', '因为 (tan x)′ = sec<sup>2</sup>x'],
        ['∫ csc<sup>2</sup>x dx = −cot x + C', '因为 (cot x)′ = −csc<sup>2</sup>x'],
        ['∫ (1/(1+x<sup>2</sup>)) dx = arctan x + C', '反三角函数'],
        ['∫ (1/√(1−x<sup>2</sup>)) dx = arcsin x + C', '|x| &lt; 1'],
      ],
    },
    {
      type: 'text',
      html: '<h3>第一类换元法（凑微分）</h3><p>第一类换元法（integration by substitution）的实质是“从外到里凑微分”：若 F′(u) = f(u)，则 ∫ f(φ(x))·φ′(x) dx = ∫ f(φ(x)) d(φ(x)) = F(φ(x)) + C。关键是把 φ′(x) dx 整体看成 <b>d(φ(x))</b>。</p><p>常用的凑微分形式（务必背熟）：</p><ul><li>d(ax + b) = a dx，故 dx = (1/a)·d(ax + b)</li><li>d(x<sup>2</sup>) = 2x dx，故 x dx = (1/2)·d(x<sup>2</sup>)</li><li>d(x<sup>3</sup>) = 3x<sup>2</sup> dx</li><li>d(ln x) = dx/x</li><li>d(e<sup>x</sup>) = e<sup>x</sup> dx</li><li>d(sin x) = cos x dx，d(cos x) = −sin x dx</li><li>d(arctan x) = dx/(1+x<sup>2</sup>)，d(arcsin x) = dx/√(1−x<sup>2</sup>)</li></ul><p>第一类换元可以“心里换元”：凑成 ∫ f(u) du 的形式后直接写结果，不必真的写出 u = φ(x)。</p>',
    },
    {
      type: 'code',
      title: '例题：凑微分（第一类换元）三例',
      code: `例 1：求 ∫ 2x·e^(x²) dx。
把 2x dx 凑成 d(x²)：
∫ 2x·e^(x²) dx = ∫ e^(x²) d(x²)
心里换元 u = x²：= ∫ e^u du = e^u + C = e^(x²) + C

例 2：求 ∫ cos(3x) dx。
dx = (1/3) d(3x)：
∫ cos(3x) dx = (1/3)∫ cos(3x) d(3x) = (1/3)sin(3x) + C

例 3：求 ∫ (ln x)/x dx。
dx/x = d(ln x)：
∫ (ln x)/x dx = ∫ ln x d(ln x) = (ln x)²/2 + C

验证：对例 3 结果求导，[(ln x)²/2]′ = (ln x)/x ✓`,
      note: '凑微分的标志：被积函数中“一部分的导数恰好是另一部分（差一个常数）”，先凑 d(φ(x))，再按公式 ∫ f(u) du 积分。',
    },
    {
      type: 'text',
      html: '<h3>第二类换元法（三角代换、根式代换）</h3><p>当被积函数含根式时，可通过变量替换 x = φ(t) 消去根号，积分完成后再把 t 回代成 x，这就是<b>第二类换元法</b>（trigonometric / radical substitution）。</p><p><b>三角代换</b>（配平方后套公式）：</p><ul><li>含 √(a<sup>2</sup> − x<sup>2</sup>)：令 x = a·sin t，则 √(a<sup>2</sup> − x<sup>2</sup>) = a·cos t</li><li>含 √(a<sup>2</sup> + x<sup>2</sup>)：令 x = a·tan t，则 √(a<sup>2</sup> + x<sup>2</sup>) = a·sec t</li><li>含 √(x<sup>2</sup> − a<sup>2</sup>)：令 x = a·sec t，则 √(x<sup>2</sup> − a<sup>2</sup>) = a·tan t</li></ul><p><b>根式代换：</b>含 √(ax + b) 时令 t = √(ax + b)，把无理函数积分化为有理函数积分。回代时可用“直角三角形”辅助记忆 sin t、cos t 与 x 的关系。</p>',
    },
    {
      type: 'code',
      title: '例题：第二类换元两例',
      code: `例 1：求 ∫ dx/√(4 − x²)（三角代换）。
含 √(2² − x²)，令 x = 2 sin t，则 dx = 2 cos t dt，√(4 − x²) = 2 cos t：
∫ dx/√(4 − x²) = ∫ (2 cos t)/(2 cos t) dt = ∫ dt = t + C
回代：x = 2 sin t ⇒ sin t = x/2 ⇒ t = arcsin(x/2)
结果：∫ dx/√(4 − x²) = arcsin(x/2) + C

例 2：求 ∫ dx/(1 + √x)（根式代换）。
令 t = √x，则 x = t²，dx = 2t dt：
∫ dx/(1 + √x) = ∫ 2t/(1 + t) dt = ∫ [2 − 2/(1 + t)] dt
= 2t − 2ln|1 + t| + C
回代：= 2√x − 2ln(1 + √x) + C`,
      note: '第二类换元的关键三步：设 x = φ(t) 并算 dx → 消去根号积分 → 把 t 回代成 x。回代一步最容易遗漏。',
    },
    {
      type: 'text',
      html: '<h3>分部积分法：口诀“反对幂指三”</h3><p>分部积分法（integration by parts）来自乘积求导公式 (uv)′ = u′v + uv′，两边积分得 ∫ u dv = uv − ∫ v du。它把难算的 ∫ u dv 转化为可能更简单的 ∫ v du。</p><p>关键是 u 与 dv 的选取，记口诀<b>“反对幂指三”</b>：按<b>反三角函数、对数函数、幂函数、指数函数、三角函数</b>的顺序，<b>排在前面的优先作为 u</b>（因为它求导后变简单，如 ln x → 1/x、arcsin x → 1/√(1−x<sup>2</sup>)），剩下的部分放进 dv。</p><p>适用情形：被积函数是两类不同函数的乘积，如 x·e<sup>x</sup>、x·ln x、x·sin x、e<sup>x</sup>·sin x 等。遇到 e<sup>x</sup>·sin x 这类“循环型”，分部两次后移项解出积分即可。</p>',
    },
    {
      type: 'code',
      title: '例题：分部积分两例',
      code: `例 1：求 ∫ x·eˣ dx。
按“反对幂指三”：x 是幂函数、eˣ 是指数函数，幂函数在前，
取 u = x，dv = eˣ dx，则 du = dx，v = eˣ：
∫ x·eˣ dx = x·eˣ − ∫ eˣ dx = x·eˣ − eˣ + C = eˣ(x − 1) + C

例 2：求 ∫ x·ln x dx。
ln x 是对数函数，排在幂函数之前，
取 u = ln x，dv = x dx，则 du = dx/x，v = x²/2：
∫ x·ln x dx = (x²/2)·ln x − ∫ (x²/2)·(1/x) dx
= (x²/2)·ln x − (1/2)∫ x dx
= (x²/2)·ln x − x²/4 + C

经验：选 u 的标准是“求导后变简单”，选 dv 的标准是“积分后变简单”。`,
      note: '若把 u 与 dv 选反（如例 1 中取 u = eˣ、dv = x dx），积分会越变越复杂，这就是口诀“反对幂指三”存在的意义。',
    },
    {
      type: 'text',
      html: '<h3>有理函数的部分分式简介</h3><p><b>有理函数（rational function）</b>是多项式之比 R(x) = P(x)/Q(x)。当分子次数 ≥ 分母次数时，先用多项式除法化为“多项式 + 真分式”；真分式可分解为若干<b>部分分式（partial fractions）</b>之和，再逐项积分。</p><p>分解规则（先把分母因式分解）：</p><ul><li>单重一次因式 (x − a)：对应项 A/(x − a)</li><li>k 重因式 (x − a)<sup>k</sup>：对应 A<sub>1</sub>/(x − a) + A<sub>2</sub>/(x − a)<sup>2</sup> + … + A<sub>k</sub>/(x − a)<sup>k</sup></li><li>不可约二次因式 x<sup>2</sup> + px + q：对应 (Ax + B)/(x<sup>2</sup> + px + q)</li></ul><p>例：1/[(x−1)(x−2)] = A/(x−1) + B/(x−2)，通分比较系数（或代入 x = 1、x = 2）得 A = −1，B = 1，于是 ∫ dx/[(x−1)(x−2)] = −ln|x−1| + ln|x−2| + C。部分分式把有理函数积分化归为公式表内的简单积分。</p>',
    },
    {
      type: 'tip',
      kind: 'warn',
      html: '<p><b>易错点提醒：</b>① 不定积分结果<b>必须加任意常数 C</b>，漏写 C 会丢分；② ∫ (1/x) dx = ln|x| + C，绝对值不能丢——x &lt; 0 时 ln x 无意义；③ 第二类换元完成后<b>必须把 t 回代成 x</b>，而第一类换元可以“心里换元”直接写结果；④ 分部积分 u、dv 选反会越积越复杂，牢记“反对幂指三”；⑤ ∫ e<sup>x²</sup> dx、∫ sin x<sup>2</sup> dx 等<b>没有初等原函数</b>，不要强行“凑”出结果；⑥ 常用验证手段：对积分结果求导，应恰好回到被积函数。</p>',
    },
  ],
  exercises: [
    {
      id: 'math-04-q1',
      type: 'fill',
      question: '求 ∫ 3x² dx（直接积分法），结果是什么？',
      accept: ['x^3 + C', 'x³ + C', 'x^3+C', 'x³+C', 'X^3+C', 'x^3 +C'],
      explanation: '这是直接积分法送分题。提出系数 3，套幂函数公式 ∫ x^α dx = x^(α+1)/(α+1) + C（α = 2）：∫ 3x² dx = 3·(x³/3) + C = x³ + C。验证：对 x³ 求导得 3x² ✓。常见错误是把系数 3 一并除进去写成 x³/3 + C，或漏写任意常数 C。',
    },
    {
      id: 'math-04-q2',
      type: 'fill',
      question: '用凑微分法求 ∫ 2x·e^(x²) dx，结果是什么？',
      accept: ['e^(x^2) + C', 'e^(x²) + C', 'e^(x^2)+C', 'e^(x²)+C', 'exp(x^2) + C', 'exp(x²) + C'],
      explanation: '凑微分：d(x²) = 2x dx，所以 ∫ 2x·e^(x²) dx = ∫ e^(x²) d(x²)。心里换元 u = x²，得 ∫ e^u du = e^u + C = e^(x²) + C。验证：对 e^(x²) 求导，链式法则得 2x·e^(x²) ✓。常见错误：把指数看成 x² 的积分直接写 e^(x²)/(2x) + C，那既不是原函数也不是常数倍。',
    },
    {
      id: 'math-04-q3',
      type: 'fill',
      question: '用凑微分法求 ∫ cos(3x) dx，结果是什么？',
      accept: ['(1/3)sin(3x) + C', 'sin(3x)/3 + C', '(1/3) sin(3x) + C', '(sin(3x))/3 + C', '(1/3)sin(3x)+C'],
      explanation: '凑微分：dx = (1/3)d(3x)，于是 ∫ cos(3x) dx = (1/3)∫ cos(3x) d(3x) = (1/3)sin(3x) + C。验证：对 (1/3)sin(3x) 求导，得 (1/3)·3cos(3x) = cos(3x) ✓。常见错误：直接写 sin(3x) + C，漏掉由链式法则引入的系数 1/3。',
    },
    {
      id: 'math-04-q4',
      type: 'choice',
      question: '用分部积分法求 ∫ x·eˣ dx，正确结果是？',
      options: ['eˣ(x + 1) + C', 'eˣ(x − 1) + C', 'x·eˣ + C', 'eˣ + C'],
      answer: 1,
      explanation: '按口诀“反对幂指三”，幂函数 x 排在指数函数 eˣ 前面，取 u = x、dv = eˣ dx，则 du = dx、v = eˣ。分部积分：∫ x·eˣ dx = x·eˣ − ∫ eˣ dx = x·eˣ − eˣ + C = eˣ(x − 1) + C。选 A 是符号错误（(uv)′ 展开时丢了负号）；选 C 是根本没分部，把 eˣ 当成了常数；选 D 只积了 eˣ 而没处理因子 x。',
    },
    {
      id: 'math-04-q5',
      type: 'fill',
      question: '用凑微分法求 ∫ (2x)/(x² + 1) dx，结果是什么？',
      accept: ['ln(x^2 + 1) + C', 'ln(x² + 1) + C', 'ln|x^2 + 1| + C', 'ln(x^2+1)+C', 'ln(x²+1)+C', 'ln|x^2+1|+C'],
      explanation: '凑微分：d(x² + 1) = 2x dx，所以 ∫ (2x)/(x² + 1) dx = ∫ d(x² + 1)/(x² + 1) = ln|x² + 1| + C。由于 x² + 1 &gt; 0 恒成立，绝对值可省略，写 ln(x² + 1) + C 也对。常见错误：把分母当成 x² 直接用公式得 ln|x²| + C（少了分子 2x 与分母导数的对应关系），或错写成 arctan x + C（那是 ∫ dx/(1+x²) 的结果）。',
    },
    {
      id: 'math-04-q6',
      type: 'choice',
      question: '求 ∫ dx/√(4 − x²) 时，应选择哪种三角代换？',
      options: ['x = 2 sin t', 'x = 2 tan t', 'x = 2 sec t', 'x = sin t'],
      answer: 0,
      explanation: '被积函数含 √(4 − x²) = √(2² − x²)，属于 √(a² − x²) 型，应令 x = a·sin t，即 x = 2 sin t。代入后 √(4 − x²) = 2cos t、dx = 2cos t dt，被积式化为 dt，积分 = t + C = arcsin(x/2) + C。x = 2 tan t 用于 √(4 + x²) 型；x = 2 sec t 用于 √(x² − 4) 型；x = sin t 漏掉了系数 2，无法完全消去根号里的 4。',
    },
    {
      id: 'math-04-q7',
      type: 'code',
      question: '用分部积分法求 ∫ x·ln x dx，正确结果是？',
      code: `按“反对幂指三”，对数函数 ln x 排在幂函数 x 前面：
取 u = ln x，dv = x dx，则 du = dx/x，v = x²/2。

∫ x·ln x dx = (x²/2)·ln x − ∫ (x²/2)·(1/x) dx
= (x²/2)·ln x − (1/2)∫ x dx
= (x²/2)·ln x − x²/4 + C`,
      options: ['(x²/2)ln x − x²/4 + C', '(x²/2)ln x + x²/4 + C', 'x ln x − x + C', '(x²/2)ln x + C'],
      answer: 0,
      explanation: 'u = ln x、dv = x dx，分部得 ∫ x·ln x dx = (x²/2)ln x − ∫ (x²/2)·(1/x) dx = (x²/2)ln x − (1/2)∫ x dx = (x²/2)ln x − x²/4 + C。选 B 是第二项符号写反；选 C 是把 ln x 当常数、x 单独积分的结果，完全错误；选 D 漏掉了 −∫(x²/2)(1/x)dx = −x²/4 这一项。验证：对 (x²/2)ln x − x²/4 求导得 x ln x + x/2 − x/2 = x ln x ✓。',
    },
    {
      id: 'math-04-q8',
      type: 'choice',
      question: '关于不定积分，下列说法错误的是？',
      options: ['∫ (1/x) dx = ln|x| + C（x ≠ 0）', '∫ (1/x) dx = ln x + C', '不定积分的结果必须含有任意常数 C', '若 F′(x) = f(x)，则 ∫ f(x) dx = F(x) + C'],
      answer: 1,
      explanation: 'B 漏掉了绝对值，是错误说法：(ln x)′ = 1/x 只在 x &gt; 0 时成立，而 1/x 在 x &lt; 0 时的原函数是 ln(−x)，两者合并为 ln|x| + C。A 是正确写法；C 正确，不定积分是原函数的全体，必须有任意常数 C；D 正是不定积分的定义性质。此题考查“绝对值陷阱”：看到 ∫ (1/x) dx 必须联想到 ln|x|。',
    },
  ],
};
