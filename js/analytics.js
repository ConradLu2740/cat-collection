/* 分析页：Chart.js 可视化统计 */
(async function () {
  renderNav('analytics');

  try {
    const { config, images, articles } = await loadSiteData();

    if (typeof Chart === 'undefined') {
      document.querySelector('.chart-grid').innerHTML =
        '<div class="empty-tip">Chart.js 加载失败（需要联网访问 CDN）。</div>';
      return;
    }

    Chart.defaults.font.family = getComputedStyle(document.body).fontFamily;
    Chart.defaults.color = '#86868B';
    Chart.defaults.borderColor = 'rgba(0,0,0,0.08)';

    // iOS 系统色板
    const palette = ['#0071E3', '#AF52DE', '#FF9500', '#34C759', '#FF2D55', '#5856D6', '#FFCC00', '#5AC8FA'];

    /* 1. 标签排行 */
    const tagCounts = new Map();
    images.forEach(i => (i.tags || []).forEach(t => tagCounts.set(t, (tagCounts.get(t) || 0) + 1)));
    articles.forEach(a => (a.tags || []).forEach(t => tagCounts.set(t, (tagCounts.get(t) || 0) + 1)));
    const topTags = [...tagCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);

    new Chart(document.getElementById('chart-tags'), {
      type: 'bar',
      data: {
        labels: topTags.map(([t]) => t),
        datasets: [{
          label: '收藏次数',
          data: topTags.map(([, n]) => n),
          backgroundColor: palette,
          borderRadius: 6
        }]
      },
      options: {
        indexAxis: 'y',
        plugins: { legend: { display: false } },
        scales: { x: { beginAtZero: true, ticks: { precision: 0 } } }
      }
    });

    /* 2. 收藏时间趋势（按月） */
    const monthMap = new Map();
    [...images.map(i => i.date), ...articles.map(a => a.date)].forEach(d => {
      if (!d) return;
      const m = d.slice(0, 7);
      monthMap.set(m, (monthMap.get(m) || 0) + 1);
    });
    const months = [...monthMap.keys()].sort();
    const monthData = months.map(m => monthMap.get(m));

    new Chart(document.getElementById('chart-trend'), {
      type: 'line',
      data: {
        labels: months.map(m => m.replace('-', '年') + '月'),
        datasets: [{
          label: '新增收藏',
          data: monthData,
          borderColor: '#0071E3',
          backgroundColor: 'rgba(0, 113, 227, 0.10)',
          fill: true,
          tension: 0.35,
          pointBackgroundColor: '#0071E3',
          pointRadius: 5
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
      }
    });

    /* 3. 图片分类分布 */
    const catMap = new Map();
    images.forEach(i => catMap.set(i.category || '未分类', (catMap.get(i.category || '未分类') || 0) + 1));
    const cats = [...catMap.keys()];

    new Chart(document.getElementById('chart-category'), {
      type: 'doughnut',
      data: {
        labels: cats,
        datasets: [{
          data: cats.map(c => catMap.get(c)),
          backgroundColor: palette,
          borderWidth: 2,
          borderColor: '#FFFFFF'
        }]
      },
      options: {
        plugins: { legend: { position: 'bottom' } }
      }
    });

    /* 4. 文章来源排行 */
    const srcMap = new Map();
    articles.forEach(a => srcMap.set(a.source || '未知', (srcMap.get(a.source || '未知') || 0) + 1));
    const topSrc = [...srcMap.entries()].sort((a, b) => b[1] - a[1]);

    new Chart(document.getElementById('chart-source'), {
      type: 'bar',
      data: {
        labels: topSrc.map(([s]) => s),
        datasets: [{
          label: '文章数',
          data: topSrc.map(([, n]) => n),
          backgroundColor: '#0071E3',
          borderRadius: 6
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
      }
    });

    /* 底部迷你统计 */
    const readCount = articles.filter(a => a.read).length;
    const totalTags = new Set([...tagCounts.keys()]).size;
    const mini = [
      { num: images.length + articles.length, label: '总收藏' },
      { num: images.length, label: '图片' },
      { num: articles.length, label: '文章' },
      { num: `${readCount}/${articles.length}`, label: '已读文章' },
      { num: totalTags, label: '标签总数' },
      { num: months.length, label: '收藏月份' }
    ];
    document.getElementById('mini-stats').innerHTML = mini.map(s =>
      `<div class="stat-card"><div class="num">${s.num}</div><div class="label">${s.label}</div></div>`
    ).join('');

  } catch (e) {
    console.error(e);
    document.querySelector('.chart-grid').innerHTML =
      '<div class="empty-tip">数据加载失败，请确认 data/ 目录存在。</div>';
  }
})();
