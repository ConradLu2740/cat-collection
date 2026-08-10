/* 图片收藏页：瀑布流 + 分类/标签筛选 + 搜索 + 灯箱 */
(async function () {
  renderNav('gallery');

  const state = {
    images: [],
    category: '全部',
    tag: '',
    keyword: ''
  };

  const galleryEl = document.getElementById('gallery');
  const emptyEl = document.getElementById('empty-tip');
  const countLabel = document.getElementById('count-label');

  try {
    const { config, images } = await loadSiteData();
    state.images = images;

    // 分类筛选按钮
    const cats = ['全部', ...(config.imageCategories || [])];
    document.getElementById('category-filters').innerHTML = cats.map(c =>
      `<button class="filter-btn ${c === state.category ? 'active' : ''}" data-cat="${escapeHtml(c)}">${escapeHtml(c)}</button>`
    ).join('');

    // 标签筛选按钮（动态生成）
    const tags = collectTags(images);
    document.getElementById('tag-filters').innerHTML = tags.map(([t, n]) =>
      `<button class="filter-btn" data-tag="${escapeHtml(t)}">${escapeHtml(t)} (${n})</button>`
    ).join('');

    document.getElementById('category-filters').addEventListener('click', e => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      state.category = btn.dataset.cat;
      document.querySelectorAll('#category-filters .filter-btn').forEach(b => b.classList.toggle('active', b === btn));
      render();
    });

    document.getElementById('tag-filters').addEventListener('click', e => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      state.tag = (state.tag === btn.dataset.tag) ? '' : btn.dataset.tag;
      document.querySelectorAll('#tag-filters .filter-btn').forEach(b => b.classList.toggle('active', b.dataset.tag === state.tag));
      render();
    });

    document.getElementById('search-input').addEventListener('input', e => {
      state.keyword = e.target.value.trim().toLowerCase();
      render();
    });

    // 灯箱
    const lb = document.getElementById('lightbox');
    document.getElementById('lb-close').addEventListener('click', closeLb);
    lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });

    function closeLb() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
    }

    function openLb(img) {
      document.getElementById('lb-img').src = assetPath(img.file);
      document.getElementById('lb-img').alt = img.title || '';
      document.getElementById('lb-title').textContent = img.title || '';
      document.getElementById('lb-note').textContent = img.note || '';
      const meta = document.createElement('div');
      const sourceHtml = img.source
        ? (img.sourceUrl ? `<a href="${escapeHtml(img.sourceUrl)}" target="_blank" rel="noopener">${escapeHtml(img.source)}</a>` : escapeHtml(img.source))
        : '未知来源';
      document.getElementById('lb-meta').innerHTML =
        `<div class="meta-row"><span>📅 ${escapeHtml(img.date || '')}</span><span>🏷️ ${escapeHtml(img.category || '未分类')}</span><span>🔗 ${sourceHtml}</span></div>` +
        `<div>${renderChips(img.tags)}</div>`;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function render() {
      let list = state.images;
      if (state.category !== '全部') list = list.filter(i => i.category === state.category);
      if (state.tag) list = list.filter(i => (i.tags || []).includes(state.tag));
      if (state.keyword) {
        list = list.filter(i =>
          (i.title || '').toLowerCase().includes(state.keyword) ||
          (i.note || '').toLowerCase().includes(state.keyword) ||
          (i.tags || []).some(t => t.toLowerCase().includes(state.keyword))
        );
      }
      countLabel.textContent = `共 ${list.length} 张`;
      emptyEl.style.display = list.length ? 'none' : 'block';

      galleryEl.innerHTML = list.map(img => `
        <div class="img-card" data-id="${escapeHtml(img.id)}">
          <img class="thumb" src="${assetPath(img.file)}" alt="${escapeHtml(img.title)}" loading="lazy">
          <div class="info">
            <h3>${escapeHtml(img.title)}</h3>
            <div class="meta">📅 ${escapeHtml(img.date || '')} · ${escapeHtml(img.category || '未分类')}</div>
            <div>${renderChips(img.tags)}</div>
          </div>
        </div>
      `).join('');

      galleryEl.querySelectorAll('.img-card').forEach(card => {
        card.addEventListener('click', () => {
          const img = list.find(i => i.id === card.dataset.id);
          if (img) openLb(img);
        });
      });
    }

    render();
  } catch (e) {
    console.error(e);
    galleryEl.innerHTML = '';
    emptyEl.style.display = 'block';
    emptyEl.textContent = '数据加载失败，请确认 data/ 目录存在。';
  }
})();
