import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '猫咪知识库',
  description: '关于猫的知识 wiki —— 品种、行为、健康、饲养',
  lang: 'zh-CN',
  base: '/cat-collection/',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: 'https://conradlu2740.github.io/cat-collection'
  },
  head: [
    ['meta', { name: 'theme-color', content: '#0071E3' }],
    ['link', { rel: 'icon', href: '/cat-collection/favicon.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: '猫咪知识库' }],
    ['meta', { property: 'og:title', content: '猫咪知识库' }],
    ['meta', { property: 'og:description', content: '关于猫的知识 wiki —— 品种、行为、健康、饲养、领养、文化' }],
    ['meta', { property: 'og:image', content: '/cat-collection/images/hero-wide.svg' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: '猫咪知识库' }],
    ['meta', { name: 'twitter:description', content: '关于猫的知识 wiki —— 品种、行为、健康、饲养、领养、文化' }]
  ],
  transformHead({ pageData }) {
    const rel = pageData.relativePath.replace(/\.md$/, '')
    const url = rel === 'index'
      ? 'https://conradlu2740.github.io/cat-collection/'
      : `https://conradlu2740.github.io/cat-collection/${rel}`
    return [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:url', content: url }]
    ]
  },
  themeConfig: {
    font: false,
    logo: '/paw.svg',
    siteTitle: '猫咪知识库',
    nav: [
      { text: '首页', link: '/' },
      { text: '品种百科', link: '/breeds/' },
      { text: '行为与沟通', link: '/behavior/' },
      { text: '健康与疾病', link: '/health/' },
      { text: '饲养与养护', link: '/care/' },
      { text: '领养与救助', link: '/adoption/' },
      { text: '历史与文化', link: '/culture/' }
    ],
    sidebar: {
      '/breeds/': [
        { text: '品种百科', items: [
          { text: '品种百科总览', link: '/breeds/' },
          { text: '中华田园猫', link: '/breeds/domestic-cat' },
          { text: '橘猫', link: '/breeds/orange-tabby' },
          { text: '猫咪毛色大全', link: '/breeds/coat-colors' },
          { text: '幼猫成长阶段', link: '/breeds/kitten-growth' },
          { text: '流浪猫', link: '/breeds/stray-cat' },
          { text: '布偶猫', link: '/breeds/ragdoll' },
          { text: '英国短毛猫', link: '/breeds/british-shorthair' },
          { text: '美国短毛猫', link: '/breeds/american-shorthair' }
        ]}
      ],
      '/behavior/': [
        { text: '行为与沟通', items: [
          { text: '行为与沟通总览', link: '/behavior/' },
          { text: '猫的行为语言', link: '/behavior/cat-body-language' },
          { text: '猫的尾巴语言', link: '/behavior/tail-language' },
          { text: '猫的耳朵语言', link: '/behavior/ear-language' },
          { text: '猫的瞳孔语言', link: '/behavior/eye-language' },
          { text: '猫的叫声与喵喵叫', link: '/behavior/cat-vocalizations' },
          { text: '踩奶', link: '/behavior/kneading' },
          { text: '猫的睡眠习性', link: '/behavior/sleeping-habits' }
        ]}
      ],
      '/health/': [
        { text: '健康与疾病', items: [
          { text: '健康与疾病总览', link: '/health/' },
          { text: '常见健康问题自查清单', link: '/health/common-issues-checklist' },
          { text: '猫的常见传染病', link: '/health/infectious-diseases' },
          { text: '疫苗与驱虫', link: '/health/vaccination-deworming' },
          { text: '绝育', link: '/health/spay-neuter' }
        ]}
      ],
      '/care/': [
        { text: '饲养与养护', items: [
          { text: '饲养与养护总览', link: '/care/' },
          { text: '新手养猫全指南', link: '/care/new-owner-guide' },
          { text: '猫的饮食与营养', link: '/care/diet-nutrition' },
          { text: '猫的日常护理', link: '/care/grooming' },
          { text: '猫砂与如厕训练', link: '/care/litter-box' },
          { text: '猫的玩具与丰容', link: '/care/enrichment' }
        ]}
      ],
      '/adoption/': [
        { text: '领养与救助', items: [
          { text: '领养与救助总览', link: '/adoption/' },
          { text: '流浪猫领养指南', link: '/adoption/adoption-guide' },
          { text: '领养前的心理准备', link: '/adoption/mindset' },
          { text: '流浪猫救助与 TNR', link: '/adoption/tnr' }
        ]}
      ],
      '/culture/': [
        { text: '历史与文化', items: [
          { text: '历史与文化总览', link: '/culture/' },
          { text: '猫的历史', link: '/culture/cat-history' },
          { text: '猫在中国文化中', link: '/culture/cat-in-china' },
          { text: '猫的冷知识合集', link: '/culture/cat-facts' }
        ]}
      ],
      '/guide/': [
        { text: '关于本站', items: [
          { text: '内容体系规范', link: '/guide/content-guide' },
          { text: '关于猫咪知识库', link: '/guide/about' }
        ]}
      ]
    },
    search: { provider: 'local' },
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdated: { text: '最后更新', formatOptions: { dateStyle: 'medium', timeStyle: 'short' } },
    footer: {
      message: '猫咪知识库 · 中文猫友实用知识库',
      copyright: 'Made with <a href="https://proma.cool" target="_blank" rel="noopener">Proma</a> · <a href="https://github.com/proma-ai/Proma" target="_blank" rel="noopener">GitHub</a>'
    }
  }
})
