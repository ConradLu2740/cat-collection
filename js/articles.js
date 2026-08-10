/* 文章收藏页：卡片列表 + 标签筛选 + 搜索 + 阅读状态 */
(async function () {
  renderNav('articles');

  const state = {
    articles: [],
    tag: '',
    read: 'all',
    keyword: ''
  };

  const listEl = document.getElementById('articles-list');
  const emptyEl = document.getElementById('empty-tip');
  const countLabel = document.getElementById('count-label');

  try {
    const { config, articles } = await loadSiteData();
    state.articles = articles;

    // 标签筛选（动态生成）
    const tags = collectTags(articles);
    const tagRow = document.getElementById('tag-filters');
    tagRow.innerHTML = `<button class="filter-btn active" data-tag="">全部</button>` +
      tags.map(([t, n]) =>
        `<button class="filter-btn" data-tag="${escapeHtml(t)}">${escapeHtml(t)} (${n})</button>`
      ).join('');

    tagRow.addEventListener('click', e => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      state.tag = btn.dataset.tag || '';
      tagRow.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', (b.dataset.tag || '') === state.tag));
      render();
    });

    document.getElementById('read-filter').addEventListener('change', e => {
      state.read = e.target.value;
      render();
    });

    document.getElementById('search-input').addEventListener('input', e => {
      state.keyword = e.target.value.trim().toLowerCase();
      render();
    });

    function render() {
      let list = state.articles;
      if (state.tag) list = list.filter(a => (a.tags || []).includes(state.tag));
      if (state.read === 'read') list = list.filter(a => a.read);
      if (state.read === 'unread') list = list.filter(a => !a.read);
      if (state.keyword) {
        list = list.filter(a =>
          (a.title || '').toLowerCase().includes(state.keyword) ||
          (a.summary || '').toLowerCase().includes(state.keyword) ||
          (a.source || '').toLowerCase().includes(state.keyword) ||
          (a.tags || []).some(t => t.toLowerCase().includes(state.keyword))
        );
      }
      countLabel.textContent = `共 ${list.length} 篇`;
      emptyEl.style.display = list.length ? 'none' : 'block';

      listEl.innerHTML = list.map(art => `
        <div class="article-card">
          <h3><a href="${escapeHtml(art.url)}" target="_blank" rel="noopener">${escapeHtml(art.title)}</a></h3>
          <p class="summary">${escapeHtml(art.summary || '')}</p>
          <div>${renderChips(art.tags)}</div>
          <div class="meta-row">
            <span>🔗 ${escapeHtml(art.source || '未知来源')}</span>
            <span>📅 ${escapeHtml(art.date || '')}</span>
            <span class="${art.read ? 'read-badge' : 'unread-badge'}">${art.read ? '✓ 已读' : '○ 未读'}</span>
          </div>
        </div>
      `).join('');
    }

    render();
  } catch (e) {
    console.error(e);
    listEl.innerHTML = '';
    emptyEl.style.display = 'block';
    emptyEl.textContent = '数据加载失败，请确认 data/ 目录存在。';
  }
})();
