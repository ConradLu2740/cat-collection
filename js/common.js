/* ============================================================
   猫咪收藏馆 · 公共工具
   ============================================================ */

const BASE = (window.location.pathname.startsWith('/cat-collection/')) ? '/cat-collection/' : './';

async function loadJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`加载失败: ${path}`);
  return res.json();
}

async function loadSiteData() {
  const [config, imagesData, articlesData] = await Promise.all([
    loadJSON(BASE + 'data/config.json'),
    loadJSON(BASE + 'data/images.json'),
    loadJSON(BASE + 'data/articles.json')
  ]);
  return {
    config,
    images: imagesData.images || [],
    articles: articlesData.articles || []
  };
}

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);
}

function formatDate(str) {
  if (!str) return '';
  return str;
}

/** 收集所有标签并按出现次数排序 */
function collectTags(items, key = 'tags') {
  const map = new Map();
  for (const it of items) {
    for (const t of (it[key] || [])) {
      map.set(t, (map.get(t) || 0) + 1);
    }
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
}

/** 渲染一组标签 chip，返回 HTML */
function renderChips(tags) {
  return (tags || []).map(t => `<span class="chip">${escapeHtml(t)}</span>`).join('');
}

/** 文件路径转为可访问的绝对站内路径（兼容子路径部署） */
function assetPath(p) {
  if (/^https?:/.test(p)) return p;
  if (p.startsWith('/')) return p;
  return BASE + p;
}

/* ---------- 猫爪 SVG（品牌与装饰用） ---------- */
const PAW_SVG = `
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g fill="#F5A623">
    <circle cx="14" cy="38" r="10"/>
    <circle cx="32" cy="44" r="11"/>
    <circle cx="50" cy="38" r="10"/>
    <path d="M10 22 a5.5 6 0 1 1 0.1 0z M32 14 a5.5 6 0 1 1 0.1 0z M54 22 a5.5 6 0 1 1 0.1 0z" fill="#E8836B"/>
  </g>
  <g fill="#E8836B">
    <circle cx="11" cy="23" r="3.4"/>
    <circle cx="53" cy="23" r="3.4"/>
    <circle cx="33" cy="15" r="3.4"/>
  </g>
</svg>`;

/* ---------- 页脚 ---------- */
const FOOTER_HTML = `
<footer class="site-footer">
  <div class="footer-inner">
    <div>Copyright © 2026 猫咪收藏馆 · 由 Conrad 维护 · 数据存储在 <a href="https://github.com/ConradLu2740/cat-collection" target="_blank" rel="noopener">GitHub</a></div>
    <div>Made with <a href="https://proma.cool" target="_blank" rel="noopener">Proma</a> · <a href="https://github.com/proma-ai/Proma" target="_blank" rel="noopener">GitHub</a></div>
  </div>
</footer>`;

/** 渲染顶部导航（标记当前页） */
function renderNav(activeKey) {
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  const links = [
    { key: 'index', label: '首页', href: 'index.html' },
    { key: 'gallery', label: '图片收藏', href: 'gallery.html' },
    { key: 'articles', label: '文章收藏', href: 'articles.html' },
    { key: 'analytics', label: '数据分析', href: 'analytics.html' }
  ];
  nav.innerHTML = links.map(l =>
    `<a href="${l.href}" class="${l.key === activeKey ? 'active' : ''}">${l.label}</a>`
  ).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  // 注入页脚
  if (!document.querySelector('.site-footer')) {
    const el = document.createElement('div');
    el.innerHTML = FOOTER_HTML;
    document.body.appendChild(el.firstElementChild);
  }
  // 注入品牌 SVG
  document.querySelectorAll('.brand-svg').forEach(el => { el.innerHTML = PAW_SVG; });
});
