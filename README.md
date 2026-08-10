# 猫咪知识库 🐱

关于猫的知识 wiki —— 品种、行为、健康、饲养、领养、文化。由「猫咪收藏馆」演化而来，基于 **VitePress** 构建，部署于 GitHub Pages。

## 线上地址

**https://conradlu2740.github.io/cat-collection/**

## 功能

- 📖 **词条式知识库**：6 大分类（品种百科 / 行为与沟通 / 健康与疾病 / 饲养与养护 / 领养与救助 / 历史与文化）
- 🔗 **词条互链**：相关词条双向链接，形成知识网络
- 🔍 **本地全文搜索**：无需后端
- 📱 响应式 + Apple 风格主题

## 开发

```bash
npm install        # 安装依赖
npm run dev        # 本地开发（http://localhost:5173）
npm run build      # 构建到 docs/.vitepress/dist
npm run preview    # 预览构建产物
```

## 访问统计（可选）

本站暂未启用访问统计。如需查看访客数据，推荐接入 **Cloudflare Web Analytics**（免费、轻量、无 cookie 横幅）：

1. 注册/登录 Cloudflare → Analytics → Web Analytics → 添加站点，获得 token
2. 在 `docs/.vitepress/config.mjs` 的 `head` 数组中取消注释「访问统计接入点」，替换为你的 token
3. 推送 `main` 即生效

## 如何添加词条

1. 在对应分类目录（`docs/breeds/`、`docs/behavior/` 等）新建 `.md` 文件
2. 按[内容体系规范](docs/guide/content-guide.md)填写 frontmatter 与正文
3. 在 `docs/.vitepress/config.mjs` 的 sidebar 中登记词条
4. 推送到 `main`，GitHub Actions 自动构建部署

## 目录结构

```
docs/
├── index.md              # 首页
├── .vitepress/           # 配置与主题
├── breeds/               # 品种百科
├── behavior/             # 行为与沟通
├── health/               # 健康与疾病
├── care/                 # 饲养与养护
├── adoption/             # 领养与救助
├── culture/              # 历史与文化
├── guide/                # 关于本站 / 内容规范
└── public/images/        # 图库资源
```

## 历史

- 2026-08-10：从「猫咪收藏站」（纯静态 HTML/JSON）迁移为 VitePress 知识 wiki，转化 18 个种子词条

> 免责声明：健康与疾病栏目内容仅供参考，不能替代兽医诊断。

Made with [Proma](https://proma.cool) · [GitHub](https://github.com/proma-ai/Proma)
