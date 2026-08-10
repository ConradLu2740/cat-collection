/* 首页：统计概览 + 最新收藏 */
(async function () {
  renderNav('index');

  try {
    const { config, images, articles } = await loadSiteData();

    // 统计卡片
    const allTags = new Set();
    images.forEach(i => (i.tags || []).forEach(t => allTags.add(t)));
    articles.forEach(a => (a.tags || []).forEach(t => allTags.add(t)));
    const sources = new Set();
    images.forEach(i => sources.add(i.source || '未知'));
    articles.forEach(a => sources.add(a.source || '未知'));

    const stats = [
      { num: images.length, label: '收藏图片' },
      { num: articles.length, label: '收藏文章' },
      { num: allTags.size, label: '使用标签' },
      { num: sources.size, label: '来源站点' }
    ];
    document.getElementById('stats-grid').innerHTML = stats.map(s => `
      <div class="stat-card"><div class="num">${s.num}</div><div class="label">${s.label}</div></div>
    `).join('');

    // 最新图片（按日期倒序取前 6）
    const sortedImgs = [...images].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    document.getElementById('latest-images').innerHTML = sortedImgs.slice(0, 6).map(img => `
      <a class="latest-img" href="gallery.html" title="${escapeHtml(img.title)}">
        <img src="${assetPath(img.file)}" alt="${escapeHtml(img.title)}" loading="lazy">
      </a>
    `).join('');

    // 最近文章（按日期倒序取前 3）
    const sortedArts = [...articles].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    document.getElementById('latest-articles').innerHTML = sortedArts.slice(0, 3).map(art => `
      <div class="latest-art">
        <h4><a href="${escapeHtml(art.url)}" target="_blank" rel="noopener">${escapeHtml(art.title)}</a></h4>
        <div class="src">${escapeHtml(art.source)} · ${escapeHtml(art.date || '')}</div>
        <div>${renderChips(art.tags)}</div>
      </div>
    `).join('');

  } catch (e) {
    console.error(e);
    document.getElementById('stats-grid').innerHTML = '<div class="empty-tip">数据加载失败，请确认 data/ 目录存在。</div>';
  }
})();
