# 猫咪收藏馆 🐱

Conrad 的个人猫咪收藏分析站，部署于 GitHub Pages。用于收集和分析猫相关的**图片**与**文章**。

## 功能

- 🖼️ **图片收藏**：瀑布流图库，按分类/标签筛选，支持搜索与大图灯箱
- 📰 **文章收藏**：猫科普、养护、行为等文章的收藏列表，标签筛选与搜索
- 📊 **数据分析**：标签排行、收藏趋势、分类分布、来源站排行（Chart.js 图表）
- 🏠 **首页仪表盘**：收藏总量统计与最新收藏预览

## 使用方式

### 本地预览

```bash
cd cat-collection
python3 -m http.server 8000
# 打开 http://localhost:8000
```

### 添加收藏

1. **图片**：把图片放入 `images/` 目录，在 `data/images.json` 的 `images` 数组追加一条记录（id 唯一，file 指向图片相对路径）。
2. **文章**：在 `data/articles.json` 的 `articles` 数组追加记录（含标题、原文 URL、来源、标签、摘要）。

数据均为 JSON，添加后页面自动生效（无需重新构建）。

### 部署

推送到 `main` 分支后，GitHub Actions 会自动部署到 GitHub Pages：
`https://conradlu2740.github.io/cat-collection/`

## 目录结构

```
cat-collection/
├── index.html          # 首页仪表盘
├── gallery.html        # 图片收藏页
├── articles.html       # 文章收藏页
├── analytics.html      # 数据分析页
├── css/style.css       # 全局样式
├── js/                 # 页面逻辑
├── data/               # 收藏数据（JSON）
├── images/             # 收藏图片（当前为示例 SVG 插画）
└── .github/workflows/  # Pages 部署工作流
```

> 当前内置的图片与文章均为**示例数据**，用于展示页面效果，可随时替换为真实收藏。

Made with [Proma](https://proma.cool) · [GitHub](https://github.com/proma-ai/Proma)
