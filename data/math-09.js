// 章节：多元函数微分学
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS['math-09'] = {
  id: 'math-09',
  course: 'math',
  order: 9,
  icon: '🧭',
  title: '多元函数微分学',
  summary: '理解偏导数、全微分与梯度的概念，掌握复合函数链式法则、隐函数求导，以及无条件极值与拉格朗日乘数法求条件极值。',
  sections: [
    {
      type: 'text',
      html: '<h3>多元函数与偏导数</h3><p>设 z = f(x, y) 是二元函数（<b>多元函数（function of several variables）</b>的最简代表），把 y 固定为常数后对 x 求导，得到 <b>偏导数（partial derivative）</b>：</p><ul><li>f<sub>x</sub> = ∂z/∂x = lim(Δx→0) [f(x+Δx, y) − f(x, y)] / Δx</li><li>f<sub>y</sub> = ∂z/∂y = lim(Δy→0) [f(x, y+Δy) − f(x, y)] / Δy</li></ul><p>计算上只需记住一条：<b>求 ∂z/∂x 时把 y 当常数，求 ∂z/∂y 时把 x 当常数</b>，其余与一元函数求导完全一致。偏导数刻画函数沿坐标轴方向的变化率，是梯度、方向导数与全微分的基础。</p>',
    },
    {
      type: 'code',
      title: '计算偏导数：z = x²y + sin(xy)',
      code: `设 z = x²y + sin(xy)，求 ∂z/∂x、∂z/∂y。

① 求 ∂z/∂x（y 看作常数）：
   ∂z/∂x = ∂(x²y)/∂x + ∂[sin(xy)]/∂x
         = 2xy + cos(xy) · y
         = 2xy + y cos(xy)

② 求 ∂z/∂y（x 看作常数）：
   ∂z/∂y = x² + cos(xy) · x
         = x² + x cos(xy)

③ 代入数值检验：
   f_x(1, 0) = 2·1·0 + 0·cos(0) = 0
   f_y(1, 0) = 1 + 1·cos(0) = 2`,
      note: 'sin(xy) 是复合函数，内层 xy 对 x 求导得 y、对 y 求导得 x，切勿漏掉内层导数。',
    },
    {
      type: 'text',
      html: '<h3>高阶偏导数与混合偏导</h3><p>偏导数仍是多元函数，可以继续求导。二阶偏导数共有四个：∂²z/∂x²、∂²z/∂y² 与两个<b>混合偏导（mixed partial derivatives）</b> ∂²z/∂x∂y、∂²z/∂y∂x。</p><p><b>克莱罗（Clairaut）定理</b>：若 f<sub>xy</sub> 与 f<sub>yx</sub> 在点 (x<sub>0</sub>, y<sub>0</sub>) 的某邻域内<b>连续</b>，则二者相等：</p><p><code>∂²z/∂x∂y = ∂²z/∂y∂x</code></p><p>即"求导次序可以交换"。注意：混合偏导相等以<b>连续性</b>为前提，并非无条件成立。工程计算中遇到的绝大多数函数都满足该条件，但审题时仍要留意这一前提。</p>',
    },
    {
      type: 'text',
      html: '<h3>全微分</h3><p>若 z = f(x, y) 在点 (x<sub>0</sub>, y<sub>0</sub>) 处的全增量可写成 Δz = f<sub>x</sub>Δx + f<sub>y</sub>Δy + o(ρ)（其中 ρ = √(Δx² + Δy²)），则称 f 在该点<b>可微（differentiable）</b>，其线性主部称为<b>全微分（total differential）</b>：</p><p><code>dz = f<sub>x</sub>(x<sub>0</sub>, y<sub>0</sub>) dx + f<sub>y</sub>(x<sub>0</sub>, y<sub>0</sub>) dy</code></p><p>三个概念的关系：<b>偏导数连续 ⇒ 可微 ⇒ （函数连续 且 偏导数存在）</b>。当 |Δx|、|Δy| 很小时，Δz ≈ dz，可用于近似计算与误差估计：Δz ≈ |f<sub>x</sub>|·|Δx| + |f<sub>y</sub>|·|Δy|。</p>',
    },
    {
      type: 'code',
      title: '计算全微分：z = x²y 在点 (1, 2)',
      code: `设 z = x²y，求在点 (1, 2) 处的全微分 dz。

① 求偏导数：
   ∂z/∂x = 2xy，∂z/∂y = x²

② 代入点 (1, 2)：
   ∂z/∂x |(1,2) = 2·1·2 = 4
   ∂z/∂y |(1,2) = 1² = 1

③ 写出全微分：
   dz = 4 dx + 1 dy = 4dx + dy

④ 应用近似：若 x 从 1 变到 1.01、y 从 2 变到 1.98，
   Δz ≈ dz = 4 × 0.01 + 1 × (−0.02) = 0.02
   真实增量 z(1.01, 1.98) − z(1, 2) ≈ 0.019998，
   线性近似的误差很小。`,
      note: '全微分 dz = f_x dx + f_y dy 中，dx、dy 是自变量增量，系数是偏导数在该点的值，顺序不要写反。',
    },
    {
      type: 'tip',
      kind: 'warn',
      html: '<p><b>易错点：</b>① <b>偏导数存在 ≠ 可微</b>，甚至不保证连续——例如 f(x, y) = xy/(x²+y²)（(x, y) ≠ (0, 0)）且 f(0, 0) = 0，在原点两个偏导都存在且为 0，函数却不连续；② 验证可微的标准流程：先算 f<sub>x</sub>(x<sub>0</sub>, y<sub>0</sub>)、f<sub>y</sub>(x<sub>0</sub>, y<sub>0</sub>)，再检验 lim(ρ→0) [Δz − f<sub>x</sub>Δx − f<sub>y</sub>Δy]/ρ = 0；③ 实用的充分条件：<b>偏导数连续 ⇒ 可微</b>，工程中的函数大多属于此类，可直接使用全微分。</p>',
    },
    {
      type: 'text',
      html: '<h3>复合函数链式法则与隐函数求导</h3><p>设 z = f(u, v)，u = u(x, y)，v = v(x, y)，则<b>链式法则（chain rule）</b>为：</p><ul><li>∂z/∂x = (∂z/∂u)(∂u/∂x) + (∂z/∂v)(∂v/∂x)</li><li>∂z/∂y = (∂z/∂u)(∂u/∂y) + (∂z/∂v)(∂v/∂y)</li></ul><p>口诀："<b>沿线相乘、分路相加</b>"——先画变量关系树，从 z 到目标变量每一条路径上的偏导相乘，再把各条路径相加。例：z = e<sup>xy</sup>（视 u = xy），则 ∂z/∂x = e<sup>xy</sup>·y，∂z/∂y = e<sup>xy</sup>·x。</p><p><b>隐函数求导</b>：若 F(x, y) = 0 确定隐函数 y = y(x) 且 F<sub>y</sub> ≠ 0，则 dy/dx = −F<sub>x</sub>/F<sub>y</sub>；对 F(x, y, z) = 0，有 ∂z/∂x = −F<sub>x</sub>/F<sub>z</sub>、∂z/∂y = −F<sub>y</sub>/F<sub>z</sub>。</p>',
    },
    {
      type: 'text',
      html: '<h3>方向导数与梯度</h3><p>偏导数只刻画沿坐标轴方向的变化率。沿单位方向 l = (cos α, cos β) 的<b>方向导数（directional derivative）</b>为</p><p><code>∂f/∂l = f<sub>x</sub>(x<sub>0</sub>, y<sub>0</sub>) cos α + f<sub>y</sub>(x<sub>0</sub>, y<sub>0</sub>) cos β</code></p><p><b>梯度（gradient）</b>定义为向量 ∇f = (f<sub>x</sub>, f<sub>y</sub>)，方向导数即内积 ∂f/∂l = ∇f · l。梯度方向是<b>函数增长最快</b>的方向，|∇f| 恰为最大方向导数；沿 −∇f 方向下降最快；与梯度垂直的方向（等值线 f(x, y) = C 的切线方向）函数值不变。梯度 ∇f 也正是等值线的法向量。</p>',
    },
    {
      type: 'text',
      html: '<h3>多元函数极值：无条件极值与拉格朗日乘数法</h3><p><b>无条件极值（unconstrained extremum）</b>：f 在 (x<sub>0</sub>, y<sub>0</sub>) 取极值的必要条件是 f<sub>x</sub> = f<sub>y</sub> = 0，满足的点称为<b>驻点</b>。设 A = f<sub>xx</sub>、B = f<sub>xy</sub>、C = f<sub>yy</sub>（均在驻点处取值），判别如下：</p><ul><li>AC − B² &gt; 0 且 A &gt; 0：极小值；AC − B² &gt; 0 且 A &lt; 0：极大值；</li><li>AC − B² &lt; 0：不是极值（<b>鞍点</b>）；AC − B² = 0：判别失效，需更高阶信息。</li></ul><p><b>条件极值</b>：在约束 φ(x, y) = 0 下求 f 的极值，用<b>拉格朗日乘数法（method of Lagrange multipliers）</b>：构造 L(x, y, λ) = f(x, y) + λφ(x, y)，解方程组 L<sub>x</sub> = L<sub>y</sub> = L<sub>λ</sub> = 0，所得驻点即可能极值点，再结合问题背景或二阶信息判断极大/极小。</p>',
    },
    {
      type: 'code',
      title: '拉格朗日乘数法：求 xy 在 x + y = 2 下的条件极值',
      code: `求 f(x, y) = xy 在约束 x + y = 2 下的条件极值。

① 构造拉格朗日函数：
   L(x, y, λ) = xy + λ(x + y − 2)

② 令各偏导为 0：
   L_x = y + λ = 0
   L_y = x + λ = 0
   L_λ = x + y − 2 = 0

③ 解方程组：由前两式得 x = y = −λ，
   代入第三式 −2λ − 2 = 0 → λ = −1，x = y = 1。

④ 判定：f(1, 1) = 1。由均值不等式
   xy ≤ [(x + y)/2]² = 1，且 f 在约束下无下界
   （如 x = 100, y = −98 时 xy = −9800），
   故 (1, 1) 对应约束下的最大值。

结论：在 x + y = 2 下，f = xy 在 (1, 1) 处取得极大值 1。`,
      note: '拉格朗日乘数法把"带约束的最优化"转化为"三元方程组的求解"，λ 是拉格朗日乘子，本身不参与函数值。',
    },
  ],
  exercises: [
    {
      id: 'math-09-q1',
      type: 'choice',
      question: '设 z = x²y + sin(xy)，则 ∂z/∂x 等于？',
      options: ['2xy + y cos(xy)', '2xy + cos(xy)', 'x² + x cos(xy)', '2xy − y cos(xy)'],
      answer: 0,
      explanation: '对 x 求偏导时把 y 看作常数：∂(x²y)/∂x = 2xy；∂[sin(xy)]/∂x = cos(xy)·y（复合函数，内层 xy 对 x 求导得 y）。故 ∂z/∂x = 2xy + y cos(xy)。B 漏乘了内层导数 y；C 是对 y 求偏导的结果（x² 项来自 ∂(x²y)/∂y = x²）；D 符号错误，cos(xy) 前的内层导数是 +y 而非 −y。',
    },
    {
      id: 'math-09-q2',
      type: 'fill',
      question: '设 z = x³y²，则 ∂²z/∂x∂y = ？（如 6x²y）',
      accept: ['6x²y', '6x^2y', '6x2y', '6 x²y', '6x²y ', '6x² y'],
      explanation: '先对 y 求偏导：∂z/∂y = 2x³y；再对 x 求偏导：∂²z/∂x∂y = 6x²y。由于 6x²y 处处连续，克莱罗定理保证 ∂²z/∂y∂x 结果相同（求导次序可交换）。常见错误：求成 6xy²（求导次序记反）、3x²y（漏掉系数 2 与求导降幂的 3）。',
    },
    {
      id: 'math-09-q3',
      type: 'choice',
      question: '克莱罗定理指出：若 ∂²f/∂x∂y 与 ∂²f/∂y∂x 在点 (x₀, y₀) 的某邻域内（ ），则二者相等。',
      options: ['存在', '连续', '有界', '同号'],
      answer: 1,
      explanation: '克莱罗（混合偏导相等）定理的条件是二阶混合偏导在该点邻域内连续。仅"存在"不足以保证求导次序可交换，存在不连续的反例；"有界""同号"都不是该定理的条件。选 A 是常见错误——连续性才是充分条件。',
    },
    {
      id: 'math-09-q4',
      type: 'code',
      question: '设 z = x²y，则 z 在点 (1, 2) 处的全微分 dz 是？',
      code: `∂z/∂x = 2xy，在 (1, 2) 处 = 2·1·2 = 4
∂z/∂y = x²，在 (1, 2) 处 = 1² = 1
dz = f_x dx + f_y dy = 4 dx + dy`,
      options: ['dz = 2 dx + dy', 'dz = 4 dx + dy', 'dz = 4 dx + 2 dy', 'dz = 2 dx + 2 dy'],
      answer: 1,
      explanation: '全微分公式 dz = f_x(x₀, y₀)dx + f_y(x₀, y₀)dy。f_x = 2xy 在 (1, 2) 处为 4，f_y = x² 为 1，故 dz = 4dx + dy。A 把 f_x 错算成 2（漏乘 y = 2）；C 把 f_y 错算成 2（把 y 当成了常数项）；D 两个系数都错。',
    },
    {
      id: 'math-09-q5',
      type: 'choice',
      question: '函数 f(x, y) = x² + y² 在点 (1, 1) 处的梯度 ∇f 是？',
      options: ['(2, 2)', '(1, 1)', '(2, 0)', '(4, 4)'],
      answer: 0,
      explanation: '梯度 ∇f = (f_x, f_y) = (2x, 2y)，代入 (1, 1) 得 (2, 2)。B 是点的坐标本身，不是梯度向量；C 漏掉了 y 方向分量；D 把梯度与函数值混淆（x² + y² 在 (1,1) 处等于 2，也不是 (4,4)）。梯度方向是函数增长最快的方向。',
    },
    {
      id: 'math-09-q6',
      type: 'fill',
      question: '函数 f(x, y) = x² + y² 在点 (1, 1) 处沿梯度方向的方向导数（即最大方向导数）是？（填 2√2 或小数）',
      accept: ['2√2', '2√(2)', '√8', '√(8)', '2√2 ', '2.828', '2.83', '2.828427'],
      explanation: '方向导数的最大值等于梯度的模：∂f/∂l_max = |∇f| = √(f_x² + f_y²) = √(2² + 2²) = √8 = 2√2 ≈ 2.83，沿单位方向 l = ∇f/|∇f| = (1/√2, 1/√2) 取得。常见错误：写成 (2, 2)（那是梯度向量，不是方向导数的数值）；写成 √2（模算错，漏算一个分量）；写成 0（把梯度与等值线切线方向混淆）。',
    },
    {
      id: 'math-09-q7',
      type: 'code',
      question: '函数 f(x, y) = x² + y² − 2x − 4y 的极值情况是？',
      code: `① 求驻点：
   f_x = 2x − 2 = 0 → x = 1
   f_y = 2y − 4 = 0 → y = 2
   驻点为 (1, 2)
② 二阶偏导：
   A = f_xx = 2，B = f_xy = 0，C = f_yy = 2
③ 判别：AC − B² = 4 > 0，且 A = 2 > 0 → 极小值
④ f(1, 2) = 1 + 4 − 2 − 8 = −5`,
      options: ['极大值 −5', '极小值 −5', '极大值 5', '无极值'],
      answer: 1,
      explanation: '驻点由 f_x = f_y = 0 解得 (1, 2)。二阶偏导 A = 2、B = 0、C = 2，AC − B² = 4 > 0 且 A = 2 > 0，故该点为极小值点，f(1, 2) = 1 + 4 − 2 − 8 = −5。A 把极值类型判断反了（A > 0 对应极小）；C 符号错误，函数值是 −5 而非 5；D 错，AC − B² > 0 已明确保证极值存在。',
    },
    {
      id: 'math-09-q8',
      type: 'code',
      question: '用拉格朗日乘数法求 f(x, y) = xy 在约束 x + y = 2 下的条件极值，结果是？',
      code: `L(x, y, λ) = xy + λ(x + y − 2)
L_x = y + λ = 0
L_y = x + λ = 0
L_λ = x + y − 2 = 0
→ x = y = 1，f(1, 1) = 1`,
      options: ['极大值 1', '极小值 1', '极大值 2', '极小值 0'],
      answer: 0,
      explanation: '拉格朗日函数各偏导为 0：y + λ = 0、x + λ = 0、x + y − 2 = 0，解得 x = y = 1，f(1, 1) = 1。由均值不等式 xy ≤ [(x+y)/2]² = 1 可知 1 是约束下的最大值；且 f 在约束下无下界（如 x = 100、y = −98 时 xy = −9800），故不是极小值。B 误判类型；C 把 (x+y)²/4 = 1 误加成 2；D 误认为最小值为 0。',
    },
  ],
};
