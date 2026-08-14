// 章节：曲线积分与曲面积分（工科数学分析）
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS['math-11'] = {
  id: 'math-11',
  course: 'math',
  order: 11,
  icon: '🌀',
  title: '曲线积分与曲面积分',
  summary: '理解两类曲线积分与两类曲面积分的概念与计算，掌握格林公式、高斯公式与斯托克斯公式，学会判断积分与路径无关的条件。',
  sections: [
    {
      type: 'text',
      html: '<h3>第一类曲线积分（弧长积分）</h3><p><b>第一类曲线积分（line integral of the first kind）</b>，也称<b>对弧长的曲线积分</b>，记作 <code>∫<sub>L</sub> f(x, y) ds</code>。物理意义：f 为线密度时，它等于曲线 L 的质量。它与曲线的<b>方向无关</b>（只与弧长有关）。</p><p>计算（参数化法）：设 L 的参数方程为 x = x(t)，y = y(t)（a ≤ t ≤ b），则</p><p><code>∫<sub>L</sub> f(x, y) ds = ∫<sub>a</sub><sup>b</sup> f(x(t), y(t)) · √(x′(t)² + y′(t)²) dt</code></p><p>常用特例：① 若 L: y = y(x)（a ≤ x ≤ b），则 ds = √(1 + y′(x)²) dx；② 若 L 是圆 x = a cos t，y = a sin t（0 ≤ t ≤ 2π），则 ds = a dt。空间曲线类似，ds = √(x′² + y′² + z′²) dt。</p>',
    },
    {
      type: 'text',
      html: '<h3>第二类曲线积分（坐标积分）</h3><p><b>第二类曲线积分（line integral of the second kind）</b>，也称<b>对坐标的曲线积分</b>，记作 <code>∫<sub>L</sub> P dx + Q dy</code>。物理意义：P、Q 是力在 x、y 方向的分量时，它等于变力沿曲线 L 所做的<b>功（work）</b>。</p><p>与第一类不同，第二类曲线积分<b>与方向有关</b>：沿相反方向积分结果<b>变号</b>，即 <code>∫<sub>−L</sub> P dx + Q dy = −∫<sub>L</sub> P dx + Q dy</code>。</p><p>计算（参数化法）：L: x = x(t)，y = y(t)（a ≤ t ≤ b），则</p><p><code>∫<sub>L</sub> P dx + Q dy = ∫<sub>a</sub><sup>b</sup> [P(x(t), y(t))·x′(t) + Q(x(t), y(t))·y′(t)] dt</code></p><p>沿封闭曲线的积分记作 ∮，约定<b>逆时针</b>为正方向。两类曲线积分的联系：∫<sub>L</sub> P dx + Q dy = ∫<sub>L</sub> (P cos α + Q cos β) ds，其中 cos α、cos β 是切向量的方向余弦。</p>',
    },
    {
      type: 'code',
      title: '例题：两类曲线积分的计算对比',
      code: `例 1（第一类）：计算 ∫_L (x² + y²) ds，L 为圆 x² + y² = a² 的整个圆周。
① 参数化：x = a cos t，y = a sin t，0 ≤ t ≤ 2π；
② ds = √((−a sin t)² + (a cos t)²) dt = a dt；
③ ∫_L (x² + y²) ds = ∫₀^{2π} a²·a dt = 2πa³。

例 2（第二类）：计算 ∮_L x dy − y dx，L 为单位圆，逆时针方向。
① 参数化：x = cos t，y = sin t，0 ≤ t ≤ 2π；
   dx = −sin t dt，dy = cos t dt；
② 被积表达式：
   x dy − y dx = cos t·cos t dt − sin t·(−sin t) dt
   = (cos²t + sin²t) dt = dt；
③ ∮_L x dy − y dx = ∫₀^{2π} dt = 2π。

对比小结：第一类与方向无关，ds 含 √(x′² + y′²)；
第二类与方向有关，被积式是 P dx + Q dy。`,
      note: '例 2 的结果 2π 恰好是单位圆面积的 2 倍，这正是格林公式面积公式（见下节）的特例。',
    },
    {
      type: 'text',
      html: '<h3>格林公式与平面区域面积</h3><p><b>格林公式（Green\'s formula）</b>：设 D 是由分段光滑闭曲线 L 围成的有界闭区域，P(x, y)、Q(x, y) 在 D 上有一阶连续偏导数，L 取<b>正向</b>（沿正向行走时区域在左侧），则</p><p><code>∮<sub>L</sub> P dx + Q dy = ∬<sub>D</sub> (∂Q/∂x − ∂P/∂y) dσ</code></p><p>它把<b>封闭曲线上的第二类曲线积分</b>化为<b>区域上的二重积分</b>，是平面区域的"牛顿—莱布尼茨公式"。</p><p><b>面积公式</b>：取 P = −y/2，Q = x/2，则 ∂Q/∂x − ∂P/∂y = 1/2 + 1/2 = 1，得</p><p><code>面积 S = ∬<sub>D</sub> 1 dσ = (1/2) ∮<sub>L</sub> x dy − y dx</code></p><p>使用注意：① 曲线必须<b>封闭</b>；② P、Q 在 D 内必须连续可导（内部有奇点时需"挖洞"处理）；③ 方向取正向，反向结果变号。</p>',
    },
    {
      type: 'code',
      title: '例题：用面积公式求椭圆面积',
      code: `求椭圆 x²/a² + y²/b² = 1 的面积 S。

① 参数化：x = a cos t，y = b sin t，0 ≤ t ≤ 2π；
   dx = −a sin t dt，dy = b cos t dt；
② 代入面积公式 S = (1/2) ∮_L x dy − y dx：
   x dy − y dx = a cos t·b cos t dt − b sin t·(−a sin t) dt
   = ab(cos²t + sin²t) dt = ab dt；
③ S = (1/2) ∫₀^{2π} ab dt = (1/2)·ab·2π = πab。

结论：椭圆面积为 πab（a、b 为半长轴、半短轴）。
当 a = b = R 时退化为圆面积 πR²，结果一致。`,
      note: '面积公式 (1/2)∮ x dy − y dx 把面积问题转化为沿边界曲线的定积分，省去二重积分计算。',
    },
    {
      type: 'text',
      html: '<h3>第一类曲面积分与第二类曲面积分</h3><p><b>第一类曲面积分（对面积的曲面积分）</b>：∫∫<sub>S</sub> f(x, y, z) dS，物理意义是面密度为 f 的曲面质量，与曲面的<b>侧无关</b>。若曲面 S: z = z(x, y) 在区域 D 上，则<b>面积微元</b></p><p><code>dS = √(1 + z<sub>x</sub>² + z<sub>y</sub>²) dσ</code></p><p>于是 <code>∫∫<sub>S</sub> f dS = ∬<sub>D</sub> f(x, y, z(x, y)) · √(1 + z<sub>x</sub>² + z<sub>y</sub>²) dσ</code>。</p><p><b>第二类曲面积分（对坐标的曲面积分）</b>：∫∫<sub>S</sub> P dydz + Q dzdx + R dxdy，与曲面的<b>侧（方向）有关</b>，换到另一侧结果变号。它表示向量场穿过曲面的<b>通量（flux）</b>。计算时把曲面投影到坐标面上：例如 ∫∫<sub>S</sub> R dxdy = ±∬<sub>D<sub>xy</sub></sub> R(x, y, z(x, y)) dσ，上侧取正、下侧取负。</p>',
    },
    {
      type: 'text',
      html: '<h3>高斯公式与斯托克斯公式</h3><p><b>高斯公式（Gauss formula）</b>：设空间有界闭区域 Ω 由分片光滑闭曲面 S 围成，P、Q、R 在 Ω 上有一阶连续偏导数，S 取<b>外侧</b>，则</p><p><code>∬<sub>S</sub> P dydz + Q dzdx + R dxdy = ∭<sub>Ω</sub> (∂P/∂x + ∂Q/∂y + ∂R/∂z) dV</code></p><p>它把<b>闭曲面上的第二类曲面积分（通量）</b>化为<b>三重积分</b>。∂P/∂x + ∂Q/∂y + ∂R/∂z 称为向量场 (P, Q, R) 的<b>散度（divergence）</b>。</p><p><b>斯托克斯公式（Stokes formula）</b>：设光滑曲面 S 的边界为分段光滑闭曲线 L，S 取正侧（与 L 的正向按右手法则一致），则</p><p><code>∮<sub>L</sub> P dx + Q dy + R dz = ∬<sub>S</sub> (∂R/∂y − ∂Q/∂z) dydz + (∂P/∂z − ∂R/∂x) dzdx + (∂Q/∂x − ∂P/∂y) dxdy</code></p><p>它把<b>空间封闭曲线上的积分</b>化为<b>曲面积分</b>，被积向量 (∂R/∂y − ∂Q/∂z, ∂P/∂z − ∂R/∂x, ∂Q/∂x − ∂P/∂y) 称为<b>旋度（curl）</b>。格林公式是斯托克斯公式在平面情形（S 取在 xOy 面内）的特例。</p>',
    },
    {
      type: 'code',
      title: '例题：用高斯公式计算通量',
      code: `计算 ∬_S x dydz + y dzdx + z dxdy，S 为球面 x² + y² + z² = 4 的外侧。

① 高斯公式：P = x，Q = y，R = z，
   ∂P/∂x + ∂Q/∂y + ∂R/∂z = 1 + 1 + 1 = 3，
   所以 ∬_S x dydz + y dzdx + z dxdy = ∭_Ω 3 dV = 3V；
② Ω 是半径为 2 的球，体积 V = (4/3)π·2³ = 32π/3；
③ 原积分 = 3 × 32π/3 = 32π。

结论：通量 = 32π。
若直接在球面上分块投影计算第二类曲面积分，
运算很复杂；高斯公式把面积分化成体积分，一步到位。`,
      note: '高斯公式三个使用条件：Ω 为闭区域、S 取外侧、P/Q/R 有连续一阶偏导。被积函数在内部有奇点时不可直接使用。',
    },
    {
      type: 'text',
      html: '<h3>积分与路径无关的条件</h3><p>设 D 是平面<b>单连通</b>区域，P、Q 在 D 上有一阶连续偏导数，则下列命题<b>等价</b>：</p><ul><li>曲线积分 ∫<sub>L</sub> P dx + Q dy 在 D 内<b>与路径无关</b>（只与起点、终点有关）；</li><li>沿 D 内任意闭曲线 L 有 ∮ P dx + Q dy = 0；</li><li>在 D 内处处成立 <b>∂P/∂y = ∂Q/∂x</b>；</li><li>存在函数 u(x, y) 使 du = P dx + Q dy，即 P dx + Q dy 是<b>全微分（total differential）</b>，u 称为<b>势函数（potential function）</b>。</li></ul><p>求势函数常用路径积分法：u(x, y) = ∫<sub>(x₀,y₀)</sub><sup>(x,y)</sup> P dx + Q dy，常取折线路径。例如 du = y dx + x dy：因 ∂y/∂y = 1 = ∂x/∂x，是全微分，取路径 (0,0) → (x,0) → (x,y) 得 u = xy（可加任意常数）。此时 ∫<sub>(a,b)</sub><sup>(c,d)</sup> y dx + x dy = u(c, d) − u(a, b) = cd − ab，这是牛顿—莱布尼茨公式在平面上的推广。</p>',
    },
    {
      type: 'tip',
      kind: 'warn',
      html: '<p><b>易错点：</b>① 第一类曲线积分与方向无关、第二类与方向有关（反向变号），两类公式不要混用；② 格林公式要求 L 封闭且取正向，非封闭曲线要先"补线"再减回去；③ 高斯公式要求曲面为闭曲面的外侧，散度三项不要漏；④ 判断路径无关时区域必须<b>单连通</b>——去掉原点的平面（含洞）即使处处 ∂P/∂y = ∂Q/∂x 也未必路径无关；⑤ 斯托克斯公式的侧向与曲线正向由右手法则确定，取侧错误整体差一个负号。</p>',
    },
  ],
  exercises: [
    {
      id: 'math-11-q1',
      type: 'choice',
      question: '计算第一类曲线积分 ∫_L y ds，其中 L 为从 (0,0) 到 (1,2) 的直线段，结果为？',
      options: ['√5', '2√5', '√5/2', '2'],
      answer: 0,
      explanation: '直线段参数化：x = t，y = 2t，0 ≤ t ≤ 1，ds = √(1² + 2²) dt = √5 dt。∫_L y ds = ∫₀¹ 2t·√5 dt = 2√5·(t²/2)|₀¹ = √5。选 2√5 是把 ∫₀¹ 2t dt 直接算成 2（忘了 1/2）；选 √5/2 是端点代入错误或把 2t 的系数弄错；选 2 是漏乘 ds 中的 √5。第一类曲线积分与方向无关，ds 必含 √(x′² + y′²)。',
    },
    {
      id: 'math-11-q2',
      type: 'choice',
      question: '计算第二类曲线积分 ∫_L x dy，其中 L 为从 (0,0) 到 (1,1) 的直线段，结果为？',
      options: ['1/2', '1', '0', '2'],
      answer: 0,
      explanation: '参数化：x = t，y = t，0 ≤ t ≤ 1，dy = dt。∫_L x dy = ∫₀¹ t dt = t²/2 |₀¹ = 1/2。选 1 是把 ∫₀¹ t dt 误算为 1；选 0 是误认为沿直线段积分为 0（只有闭曲线沿某些特定场的积分才可能为 0）；选 2 是端点代入错误。注意第二类曲线积分与方向有关：若沿 (1,1) 到 (0,0) 的方向积分，结果为 −1/2。',
    },
    {
      id: 'math-11-q3',
      type: 'code',
      question: '用格林公式计算 ∮_L (x²y) dx + (x² + y) dy，其中 L 为单位圆 x² + y² = 1，逆时针方向。',
      code: `P = x²y，Q = x² + y，L 为单位圆正向，满足格林公式条件。

∂Q/∂x = 2x，∂P/∂y = x²
∮_L P dx + Q dy = ∬_D (2x − x²) dσ

极坐标：x = r cos θ，dσ = r dr dθ，0 ≤ r ≤ 1，0 ≤ θ ≤ 2π。
∬_D (2x − x²) dσ
= ∫₀^{2π} dθ ∫₀¹ (2r cos θ − r² cos²θ)·r dr
= ∫₀^{2π} [ (2/3)cos θ − (1/4)cos²θ ] dθ
= 0 − (1/4)·π = −π/4

答案：−π/4。`,
      options: ['−π/4', 'π/4', '0', 'π/2'],
      answer: 0,
      explanation: '∂Q/∂x = 2x，∂P/∂y = x²，格林公式给出 ∮ = ∬_D (2x − x²) dσ。极坐标下 ∫₀^{2π}∫₀¹ (2r²cos θ − r³cos²θ) dr dθ = ∫₀^{2π} (2cos θ/3 − cos²θ/4) dθ = 0 − π/4 = −π/4（∫₀^{2π} cos θ dθ = 0，∫₀^{2π} cos²θ dθ = π）。选 π/4 是把公式写成 ∂P/∂y − ∂Q/∂x（次序颠倒）；选 0 是误以为 2x 与 x² 两项抵消；选 π/2 是把 ∫ cos²θ dθ = π 误算为 2π 或漏除 4。',
    },
    {
      id: 'math-11-q4',
      type: 'multiple',
      question: '下列微分形式中，哪些是某个函数 u(x, y) 的全微分（即在平面内积分与路径无关）？',
      options: ['y dx + x dy', '2xy dx + x² dy', 'y dx − x dy', 'x² dx + y² dy'],
      answer: [0, 1, 3],
      explanation: '判断标准：∂P/∂y 与 ∂Q/∂x 是否处处相等。A：P = y，Q = x，∂P/∂y = 1 = ∂Q/∂x，是全微分（u = xy），正确。B：P = 2xy，Q = x²，∂P/∂y = 2x = ∂Q/∂x，正确（u = x²y）。C：P = y，Q = −x，∂P/∂y = 1 ≠ −1 = ∂Q/∂x，不是全微分——沿单位圆 ∮ y dx − x dy = ∬(−2)dσ = −2π ≠ 0，积分与路径有关。D：P = x²，Q = y²，∂P/∂y = 0 = ∂Q/∂x，正确（u = x³/3 + y³/3）。',
    },
    {
      id: 'math-11-q5',
      type: 'fill',
      question: '利用面积公式 S = (1/2)∮ x dy − y dx（或直接公式）求椭圆 x²/4 + y² = 1 所围区域的面积，结果是多少？（可填 π 表达式或小数）',
      accept: ['2π', '2pi', '6.28', '6.283', '6.2832', '2π ', '6.28 '],
      explanation: '椭圆 x²/4 + y² = 1 的半长轴 a = 2、半短轴 b = 1，面积 S = πab = 2π。参数化验证：x = 2cos t，y = sin t，则 S = (1/2)∫₀^{2π} (x dy − y dx) = (1/2)∫₀^{2π} (2cos²t + 2sin²t) dt = (1/2)·2·2π = 2π。注意半长轴是 x² 的分母 4 开方得 2，不是 4。',
    },
    {
      id: 'math-11-q6',
      type: 'code',
      question: '用高斯公式计算 ∬_S x dydz + y dzdx + z dxdy，其中 S 为球面 x² + y² + z² = 4 的外侧。',
      code: `高斯公式：∬_S x dydz + y dzdx + z dxdy
= ∭_Ω (1 + 1 + 1) dV = 3·V

Ω 为球 x² + y² + z² ≤ 4，半径 R = 2，
体积 V = (4/3)πR³ = (4/3)π·8 = 32π/3。
原积分 = 3 × 32π/3 = 32π。

答案：32π。`,
      options: ['32π', '4π', '16π', '12π'],
      answer: 0,
      explanation: '高斯公式：∬_S x dydz + y dzdx + z dxdy = ∭_Ω (1+1+1) dV = 3V。半径为 2 的球体积 V = (4/3)π·2³ = 32π/3，故结果为 3 × 32π/3 = 32π。选 4π 是误用半径 1（单位球的正确答案是 3·(4π/3) = 4π）；选 16π 是误用球表面积 4πR² = 16π；选 12π 是把 3 与单位球面积 4π 相乘。关键是散度为常数 3，面积分化为体积分后直接乘以体积。',
    },
    {
      id: 'math-11-q7',
      type: 'multiple',
      question: '关于格林公式、高斯公式与斯托克斯公式，下列说法正确的有？',
      options: ['斯托克斯公式将空间封闭曲线上的积分化为曲面积分', '高斯公式将闭曲面上的第二类曲面积分化为二重积分', '格林公式可看成斯托克斯公式在平面情形的特例', '平面曲线积分与路径无关的充要条件是在区域内处处成立 ∂P/∂x = ∂Q/∂y'],
      answer: [0, 2],
      explanation: 'A 正确：斯托克斯公式把空间闭曲线 L 上的积分化为以 L 为边界的曲面 S 上的积分。B 错误：高斯公式把闭曲面上的第二类曲面积分化为三重积分，不是二重积分。C 正确：当斯托克斯公式中的曲面取在 xOy 平面内时，公式就退化为格林公式。D 错误：路径无关（单连通区域内）的充要条件是 ∂P/∂y = ∂Q/∂x 处处成立，而不是 ∂P/∂x = ∂Q/∂y。',
    },
    {
      id: 'math-11-q8',
      type: 'choice',
      question: '计算第一类曲面积分 ∬_S dS，其中 S 是锥面 z = √(x² + y²) 在圆域 x² + y² ≤ 1 上方的部分。',
      options: ['π√2', 'π', '2π', '√2'],
      answer: 0,
      explanation: 'z = √(x² + y²)，偏导数 z_x = x/√(x²+y²)，z_y = y/√(x²+y²)，故 1 + z_x² + z_y² = 1 + 1 = 2，dS = √2 dσ。∬_S dS = ∬_D √2 dσ = √2·π·1² = π√2。选 π 是漏乘 √2（把 dS 当成 dσ）；选 2π 是把 √2 平方当成系数 2；选 √2 是把投影区域面积误算成 1。注意 ∬_S dS 的几何意义就是曲面面积。',
    },
  ],
};
