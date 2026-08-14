// 章节：定积分（工科数学分析）
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS['math-05'] = {
  id: 'math-05',
  course: 'math',
  order: 5,
  icon: '📐',
  title: '定积分',
  summary: '从分割—求和—取极限理解定积分定义与几何意义，掌握牛顿—莱布尼茨公式及换元、分部计算，学会利用奇偶性简化对称区间积分。',
  sections: [
    {
      type: 'text',
      html: '<h3>定积分的定义：分割—求和—取极限</h3><p>设函数 f(x) 在闭区间 [a, b] 上有定义。把 [a, b] 任意分割成 n 个子区间，分点 a = x<sub>0</sub> &lt; x<sub>1</sub> &lt; … &lt; x<sub>n</sub> = b，记第 i 个子区间长度为 Δx<sub>i</sub> = x<sub>i</sub> − x<sub>i−1</sub>，在每个子区间上任取一点 ξ<sub>i</sub>，作和 S = Σ(i=1…n) f(ξ<sub>i</sub>)·Δx<sub>i</sub>，称为<b>黎曼和（Riemann sum）</b>。</p><p>记 λ = max{Δx<sub>i</sub>} 为所有子区间长度的最大值。若当 λ → 0 时黎曼和 S 的极限存在，且与分割方式、ξ<sub>i</sub> 的取法无关，则称 f 在 [a, b] 上<b>可积</b>，该极限值称为 f 在 [a, b] 上的<b>定积分（definite integral）</b>：∫<sub>a</sub><sup>b</sup> f(x) dx = lim(λ→0) Σ(i=1…n) f(ξ<sub>i</sub>)·Δx<sub>i</sub>。其中 a、b 分别称为<b>积分下限、上限</b>，f(x) 为被积函数。</p><p><b>可积性结论：</b>闭区间上的连续函数必可积；只有有限个第一类间断点的有界函数也可积。定积分的值与积分变量无关：∫<sub>a</sub><sup>b</sup> f(x) dx = ∫<sub>a</sub><sup>b</sup> f(t) dt。</p>',
    },
    {
      type: 'text',
      html: '<h3>定积分的几何意义：面积</h3><p>当 f(x) ≥ 0 时，∫<sub>a</sub><sup>b</sup> f(x) dx 等于曲线 y = f(x)、x 轴及直线 x = a、x = b 所围成的<b>曲边梯形面积</b>。这正是黎曼和“以直代曲、无限细分”的直观解释：把曲边梯形切成 n 条小竖条，每条用矩形近似，取极限得到精确面积。</p><p>当 f(x) ≤ 0 时，∫<sub>a</sub><sup>b</sup> f(x) dx 等于该曲边梯形面积的<b>相反数</b>（带符号面积）。一般情形下，定积分等于 x 轴上方各部分面积与下方各部分面积的<b>代数和</b>，并不等于“总面积”。若要求曲线与 x 轴围成的实际面积，应先找出零点、分段取绝对值再积分。</p>',
    },
    {
      type: 'table',
      title: '定积分的基本性质',
      headers: ['性质', '表达式'],
      rows: [
        ['线性', '∫<sub>a</sub><sup>b</sup> [αf(x) + βg(x)] dx = α∫<sub>a</sub><sup>b</sup> f(x) dx + β∫<sub>a</sub><sup>b</sup> g(x) dx'],
        ['区间可加', '∫<sub>a</sub><sup>b</sup> f(x) dx = ∫<sub>a</sub><sup>c</sup> f(x) dx + ∫<sub>c</sub><sup>b</sup> f(x) dx（a ≤ c ≤ b）'],
        ['反向区间', '∫<sub>a</sub><sup>b</sup> f(x) dx = −∫<sub>b</sub><sup>a</sup> f(x) dx；∫<sub>a</sub><sup>a</sup> f(x) dx = 0'],
        ['保号性', '若 f(x) ≥ 0，则 ∫<sub>a</sub><sup>b</sup> f(x) dx ≥ 0（a &lt; b）'],
        ['比较定理', '若 f(x) ≤ g(x)，则 ∫<sub>a</sub><sup>b</sup> f(x) dx ≤ ∫<sub>a</sub><sup>b</sup> g(x) dx'],
        ['绝对值', '|∫<sub>a</sub><sup>b</sup> f(x) dx| ≤ ∫<sub>a</sub><sup>b</sup> |f(x)| dx'],
        ['估值定理', 'm(b − a) ≤ ∫<sub>a</sub><sup>b</sup> f(x) dx ≤ M(b − a)，其中 m ≤ f(x) ≤ M'],
      ],
    },
    {
      type: 'text',
      html: '<h3>变上限积分与微积分基本定理</h3><p>对 [a, b] 上可积的函数 f，称 Φ(x) = ∫<sub>a</sub><sup>x</sup> f(t) dt（a ≤ x ≤ b）为<b>变上限积分函数</b>，它把“上限 x 的取值”映射为“从 a 积到 x 的定积分”。</p><p><b>微积分基本定理：</b>若 f 在 [a, b] 上连续，则 Φ′(x) = f(x)，即变上限积分是 f 的一个原函数。这沟通了微分与积分，是微积分的核心定理。</p><p><b>牛顿—莱布尼茨公式（Newton–Leibniz formula）：</b>若 F(x) 是 f(x) 在 [a, b] 上的一个原函数（F′ = f），则 ∫<sub>a</sub><sup>b</sup> f(x) dx = F(b) − F(a)，常记作 [F(x)]<sub>a</sub><sup>b</sup>。它把定积分计算化归为“求原函数 + 代入上下限”，是计算定积分最主要的方法。</p>',
    },
    {
      type: 'code',
      title: '例题：用牛顿—莱布尼茨公式计算定积分',
      code: `例 1：∫₀¹ x² dx
x² 的一个原函数 F(x) = x³/3
∫₀¹ x² dx = F(1) − F(0) = 1/3 − 0 = 1/3

例 2：∫₀^π sin x dx
sin x 的一个原函数 F(x) = −cos x
∫₀^π sin x dx = F(π) − F(0) = (−cos π) − (−cos 0)
= 1 − (−1) = 2

例 3：∫₁² (1/x) dx
F(x) = ln|x|（在 [1, 2] 上即 ln x）
∫₁² (1/x) dx = ln 2 − ln 1 = ln 2`,
      note: '牛顿—莱布尼茨公式的使用流程：先求出被积函数的一个原函数 F(x)，再算 F(b) − F(a)。注意代入时上下限的顺序，别把 F(b) − F(a) 写成 F(a) − F(b)。',
    },
    {
      type: 'text',
      html: '<h3>定积分的换元法与分部积分法</h3><p><b>换元法：</b>∫<sub>a</sub><sup>b</sup> f(φ(x))·φ′(x) dx = ∫<sub>φ(a)</sub><sup>φ(b)</sup> f(u) du。<b>换元必须换限</b>——上限、下限同步换成新变量对应的值，积分完成就无需回代；若坚持不换限，则必须回代后才能代值，极易出错，不推荐。</p><p><b>分部积分法：</b>∫<sub>a</sub><sup>b</sup> u dv = [uv]<sub>a</sub><sup>b</sup> − ∫<sub>a</sub><sup>b</sup> v du，其中 [uv]<sub>a</sub><sup>b</sup> = u(b)v(b) − u(a)v(a)。u、v 的选取与不定积分一致，仍遵循口诀“反对幂指三”。</p>',
    },
    {
      type: 'code',
      title: '例题：定积分的分部积分与换元',
      code: `例 1：∫₀¹ x·eˣ dx（分部积分）
取 u = x，dv = eˣ dx，v = eˣ：
∫₀¹ x·eˣ dx = [x·eˣ]₀¹ − ∫₀¹ eˣ dx
= (1·e − 0·e⁰) − (e − e⁰) = e − (e − 1) = 1
（也可直接套原函数 F(x) = eˣ(x − 1)：F(1) − F(0) = 0 − (−1) = 1）

例 2：∫₀^(π/2) sin x·cos x dx（换元，注意换限）
令 u = sin x，du = cos x dx：
x = 0 时 u = 0；x = π/2 时 u = 1
∫₀^(π/2) sin x·cos x dx = ∫₀¹ u du = u²/2 |₀¹ = 1/2`,
      note: '例 1 中 [x·eˣ]₀¹ 表示把上下限分别代入 x·eˣ 再相减；例 2 展示了换元必须换限：上限 π/2 对应 u = 1，下限 0 对应 u = 0。',
    },
    {
      type: 'text',
      html: '<h3>对称区间上奇偶函数的积分</h3><p>设 f 在 [−a, a] 上连续（a &gt; 0），利用对称性可大幅简化计算：</p><ul><li><b>f 为奇函数</b>（f(−x) = −f(x)）：∫<sub>−a</sub><sup>a</sup> f(x) dx = <b>0</b></li><li><b>f 为偶函数</b>（f(−x) = f(x)）：∫<sub>−a</sub><sup>a</sup> f(x) dx = <b>2∫<sub>0</sub><sup>a</sup> f(x) dx</b></li></ul><p>直观理解：奇函数图像关于原点对称，区间 [−a, a] 上正负面积恰好抵消，积分必为 0；偶函数图像关于 y 轴对称，两侧面积相等，只需算右半段再乘 2。使用本性质的<b>前提是积分区间关于原点对称</b>，且函数确实为奇函数或偶函数。</p>',
    },
    {
      type: 'code',
      title: '例题：利用奇偶性计算对称区间上的定积分',
      code: `例 1：∫₋₁¹ (x³ + x²) dx
x³ 是奇函数 → ∫₋₁¹ x³ dx = 0
x² 是偶函数 → ∫₋₁¹ x² dx = 2∫₀¹ x² dx = 2 × 1/3 = 2/3
所以 ∫₋₁¹ (x³ + x²) dx = 0 + 2/3 = 2/3

例 2：∫₋₂² (x² + 1) dx
x² + 1 是偶函数：
∫₋₂² (x² + 1) dx = 2∫₀² (x² + 1) dx
= 2(8/3 + 2) = 2 × 14/3 = 28/3

例 3：∫₋π^π x³·cos x dx = 0
x³ 是奇函数，cos x 是偶函数，奇 × 偶 = 奇，
奇函数在对称区间上的积分为 0，无需计算。`,
      note: '奇 × 偶 = 奇，偶 × 偶 = 偶，奇 × 奇 = 偶——先判断被积函数整体奇偶性，再决定是否用对称性公式。',
    },
    {
      type: 'tip',
      kind: 'warn',
      html: '<p><b>易错点提醒：</b>① 用换元法求定积分时<b>必须同步换限</b>，忘了换限是最高频错误；② 牛顿—莱布尼茨公式要求 f 在 [a, b] 上连续（F 是原函数），被积函数有间断点时不能盲目套用，需分段处理；③ 奇偶性公式只适用于<b>关于原点对称的区间</b> [−a, a]，[0, b] 或 [a, b] 不能直接使用；④ 定积分是数值、与积分变量无关，但<b>不等于面积</b>——f 取负值时定积分带符号；⑤ 变上限积分求导：Φ′(x) = f(x)；若上限是复合函数 g(x)，则 d/dx ∫<sub>a</sub><sup>g(x)</sup> f(t) dt = f(g(x))·g′(x)，别漏掉内层导数。</p>',
    },
  ],
  exercises: [
    {
      id: 'math-05-q1',
      type: 'fill',
      question: '用牛顿—莱布尼茨公式计算 ∫₀¹ x dx，结果是多少？',
      accept: ['1/2', '0.5', '1/2 ', '0.5 ', '0.50'],
      explanation: 'x 的一个原函数是 F(x) = x²/2，所以 ∫₀¹ x dx = F(1) − F(0) = 1/2 − 0 = 1/2。几何上看，y = x 与 x 轴在 [0, 1] 上围成底 1、高 1 的直角三角形，面积 = 1/2，两种理解互相印证。常见错误：把积分结果当成 1（混淆了 ∫₀¹ 1 dx = 1）或漏算下限处的值。',
    },
    {
      id: 'math-05-q2',
      type: 'fill',
      question: '用牛顿—莱布尼茨公式计算 ∫₀^π sin x dx，结果是多少？',
      accept: ['2', '2.0', '2 '],
      explanation: 'sin x 的一个原函数是 F(x) = −cos x，所以 ∫₀^π sin x dx = (−cos π) − (−cos 0) = 1 − (−1) = 2。注意 (−cos π) = 1 而不是 −1。几何意义：y = sin x 在 [0, π] 上位于 x 轴上方，围成面积恰为 2（半个周期拱形面积）。常见错误：忘记负号得到 0，或误以为结果是 π。',
    },
    {
      id: 'math-05-q3',
      type: 'fill',
      question: '利用奇偶性计算 ∫₋₁¹ x³ dx，结果是多少？',
      accept: ['0', '0 '],
      explanation: 'f(x) = x³ 是奇函数（f(−x) = −x³ = −f(x)），积分区间 [−1, 1] 关于原点对称，由对称性公式 ∫₋ₐᵃ f(x) dx = 0，结果为 0。直接计算验证：F(x) = x⁴/4，∫₋₁¹ x³ dx = F(1) − F(−1) = 1/4 − 1/4 = 0。几何上，奇函数在原点两侧的图形全等但位于 x 轴两侧，正负面积抵消。',
    },
    {
      id: 'math-05-q4',
      type: 'fill',
      question: '利用奇偶性计算 ∫₋₂² (x² + 1) dx，结果是多少？',
      accept: ['28/3', '28/3 ', '9.33', '9.333', '9.3333'],
      explanation: 'f(x) = x² + 1 是偶函数，区间 [−2, 2] 关于原点对称，所以 ∫₋₂² (x² + 1) dx = 2∫₀² (x² + 1) dx。∫₀² x² dx = 8/3，∫₀² 1 dx = 2，两者相加为 14/3，再乘 2 得 28/3。常见错误：忘了乘 2 得 14/3，或把 ∫₀² x² dx 算成 4（正确是 8/3）。',
    },
    {
      id: 'math-05-q5',
      type: 'choice',
      question: '变上限积分求导：d/dx ∫₀ˣ t² dt 等于？',
      options: ['x²', '2x', 'x³/3', 'x³'],
      answer: 0,
      explanation: '由微积分基本定理，变上限积分 Φ(x) = ∫₀ˣ f(t) dt 满足 Φ′(x) = f(x)。这里 f(t) = t²，把上限 x 代入被积函数即得 x²，选 A。选 B 是颠倒了方向（对 x² 求导才是 2x）；选 C 是 ∫ t² dt 的原函数 t³/3，忘了对上限求导；选 D 是 t³ 的误解。要点：对上限代入即可，不要先积分再求导。',
    },
    {
      id: 'math-05-q6',
      type: 'fill',
      question: '求 d/dx ∫₁^(x²) e^t dt（上限为复合函数），结果是什么？',
      accept: ['2x e^(x^2)', '2x·e^(x^2)', '2x e^(x²)', '2x·e^(x²)', '2xe^(x^2)', '2xe^(x²)', '2x*e^(x^2)', '2x * e^(x^2)'],
      explanation: '上限是 x² 的复合变上限积分，用链式法则：d/dx ∫₁^(g(x)) f(t) dt = f(g(x))·g′(x)。这里 f(t) = e^t，g(x) = x²，g′(x) = 2x，所以结果为 e^(x²)·2x = 2x·e^(x²)。常见错误：只写 e^(x²)（漏掉内层导数 2x），或把下限 1 代入（下限是常数，代入后求导为 0，不影响结果）。',
    },
    {
      id: 'math-05-q7',
      type: 'code',
      question: '用分部积分法计算 ∫₀¹ x·eˣ dx，结果是多少？',
      code: `取 u = x，dv = eˣ dx，则 v = eˣ：
∫₀¹ x·eˣ dx = [x·eˣ]₀¹ − ∫₀¹ eˣ dx
= (1·e − 0) − (e − 1)
= e − e + 1 = 1`,
      options: ['e', '1', 'e − 1', 'e + 1'],
      answer: 1,
      explanation: '分部积分：u = x、dv = eˣ dx，得 ∫₀¹ x·eˣ dx = [x·eˣ]₀¹ − ∫₀¹ eˣ dx = (e − 0) − (e − 1) = 1。也可用不定积分结果 F(x) = eˣ(x − 1)，F(1) − F(0) = 0 − (−1) = 1，殊途同归。选 A 是只算了 [x·eˣ]₀¹ = e 而忘了减去 ∫₀¹ eˣ dx；选 C、D 是代值运算错误。',
    },
    {
      id: 'math-05-q8',
      type: 'choice',
      question: '关于定积分，下列说法错误的是？',
      options: ['∫₀¹ x² dx = 1/3', '若 f 在 [−a, a] 上为奇函数，则 ∫₋ₐᵃ f(x) dx = 0', '∫ₐᵇ f(x) dx 一定等于曲线 y = f(x) 与 x 轴所围图形的面积', '若 f 连续，则 Φ(x) = ∫ₐˣ f(t) dt 满足 Φ′(x) = f(x)'],
      answer: 2,
      explanation: 'C 是错误说法：定积分等于“带符号面积”，只有 f(x) ≥ 0 时才等于曲线与 x 轴围成的面积；f 取负值的部分贡献为负，定积分是上下方面积的代数和。A 正确，∫₀¹ x² dx = 1/3；B 正确，奇函数在对称区间上的积分为 0；D 正确，正是微积分基本定理。此题考查定积分几何意义中“定积分 ≠ 总面积”的陷阱。',
    },
  ],
};
