# 工科数学学习 App（PWA）

一个专为 **iPhone / iPad（也支持 Android）** 优化的**工科数学系统学习应用**，内置两门课程：

- 📐 **工科数学分析**：极限 → 导数 → 积分 → 级数 → 多元微积分 → 微分方程
- 🧮 **线性代数**：行列式 → 矩阵 → 向量组 → 方程组 → 特征值 → 二次型

**双课程共 24 章精讲 + 192 道练习题**，支持**离线使用**、**学习进度追踪**、**暗色模式**。

> 无需 Mac、无需 Xcode、无需上架 App Store：用 Safari 打开后"添加到主屏幕"即可像原生 App 一样全屏使用，**断网也能学**。

## ✨ 功能

| 功能 | 说明 |
| --- | --- |
| 📚 双课程 | 顶部一键切换"工科数学分析 / 线性代数"，进度分别统计 |
| 📖 系统课程 | 每门课 12 章：概念精讲 + 例题推导 + 易错提示 + 方法总结 |
| ✍️ 例题推导 | 每章多个例题，完整解题步骤，一键复制 |
| ✏️ 习题练习 | 单选 / 多选 / 解题推导 / 填空四种题型，答完立即给解析（计算题含完整推导），章节练习分数自动记录 |
| 📊 学习进度 | 总进度环 + 各课程进度、已学完章节、每章最佳练习分数 |
| 🔍 全局搜索 | 跨两门课搜索章节标题、知识点、例题 |
| 🌙 暗色模式 | 跟随系统 / 手动切换 |
| 📴 离线可用 | Service Worker 预缓存全部资源，断网也能学 |

## 📱 在线使用（推荐：GitHub Pages 部署后）

部署完成后，用 iPhone **Safari** 打开 HTTPS 网址：
1. **保持联网完整浏览一遍**（自动把两门课全部内容缓存进手机）；
2. 点 Safari **分享 → 添加到主屏幕**；
3. 打开「设置 → 飞行模式」验证：**断网后 App 照常可用** ✅

## 🖥 本地预览（电脑上）

```bash
cd math-learning-app
node server.js          # 或 powershell -ExecutionPolicy Bypass -File serve.ps1
# 电脑浏览器打开 http://localhost:8000
```

> ⚠️ 局域网 HTTP 地址不支持 iOS 离线缓存；要断网可用必须部署到 HTTPS（GitHub Pages / Netlify）。

## 🚀 部署到公网（免费 HTTPS，支持离线）

- **GitHub Pages**：把 `math-learning-app` 文件夹推到新仓库 → Settings → Pages → Deploy from branch（main / root）。
- **Netlify Drop**：打开 app.netlify.com/drop，直接把文件夹拖进去。

## 📂 目录结构

```
math-learning-app/
├── index.html            # 入口页面（引用 24 个章节脚本）
├── manifest.webmanifest  # PWA 清单
├── sw.js                 # Service Worker（离线缓存 24 个数据文件）
├── css/app.css           # 全部样式（iOS 风格、暗色主题、课程切换）
├── js/
│   ├── app.js            # 应用逻辑（双课程路由/阅读/练习/进度/搜索）
│   └── highlight.js      # 语法高亮（用于例题推导块）
├── data/
│   ├── math-01.js … math-12.js        # 工科数学分析 12 章
│   └── linear-01.js … linear-12.js    # 线性代数 12 章
├── icons/                # App 图标（180/192/512）
└── docs/
    ├── CONTENT_SPEC.md   # 章节数据格式规范（含数学公式书写规则）
    └── validate.js       # 数据校验脚本（node docs/validate.js）
```

## ✍️ 自定义 / 增删章节

1. 按 `docs/CONTENT_SPEC.md` 的格式新建 `data/math-XX.js` 或 `data/linear-XX.js`（参考 `data/math-01.js` / `data/linear-01.js`）。
2. 在 `index.html` 和 `sw.js` 的预缓存列表中加入该文件。
3. 运行 `node docs/validate.js` 校验。

## 🔧 技术要点

- 纯原生 HTML/CSS/JS，**零依赖、零 CDN**，完全离线可用。
- 数学公式用 Unicode 符号 + HTML 上下标渲染（如 x²、lim(x→0)、∫），不依赖任何公式库。
- 进度与成绩保存在 `localStorage`（键 `mathlearn.v1`）。
- Service Worker 采用"导航请求网络优先、静态资源缓存优先"策略，更新后刷新页面即可生效。
