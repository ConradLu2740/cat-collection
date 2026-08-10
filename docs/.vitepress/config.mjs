import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '猫咪知识库',
  description: '关于猫的知识 wiki —— 品种、行为、健康、饲养',
  lang: 'zh-CN',
  base: '/cat-collection/',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#0071E3' }],
    ['link', { rel: 'icon', href: '/cat-collection/favicon.svg' }]
  ],
  themeConfig: {
    logo: '/paw.svg',
    siteTitle: '猫咪知识库',
    nav: [
      { text: '首页', link: '/' },
      { text: '品种百科', link: '/breeds/' },
      { text: '行为与沟通', link: '/behavior/' },
      { text: '健康与疾病', link: '/health/' },
      { text: '饲养与养护', link: '/care/' },
      { text: '领养与救助', link: '/adoption/' },
      { text: '历史与文化', link: '/culture/' },
      { text: '内容规范', link: '/guide/content-guide' }
    ],
    sidebar: {
      '/breeds/': [
        { text: '品种百科', items: [
          { text: '品种百科总览', link: '/breeds/' },
          { text: '橘猫', link: '/breeds/orange-tabby' },
          { text: '布偶猫', link: '/breeds/ragdoll' },
          { text: '英国短毛猫', link: '/breeds/british-shorthair' },
          { text: '美国短毛猫', link: '/breeds/american-shorthair' },
          { text: '中华田园猫', link: '/breeds/domestic-cat' }
        ]}
      ],
      '/behavior/': [
        { text: '行为与沟通', items: [
          { text: '行为与沟通总览', link: '/behavior/' },
          { text: '猫的行为语言', link: '/behavior/cat-body-language' },
          { text: '猫的尾巴语言', link: '/behavior/tail-language' },
          { text: '猫的耳朵语言', link: '/behavior/ear-language' },
          { text: '猫的瞳孔语言', link: '/behavior/eye-language' },
          { text: '踩奶', link: '/behavior/kneading' }
        ]}
      ],
      '/health/': [
        { text: '健康与疾病', items: [
          { text: '健康与疾病总览', link: '/health/' },
          { text: '常见健康问题自查清单', link: '/health/common-issues-checklist' },
          { text: '疫苗与驱虫', link: '/health/vaccination-deworming' },
          { text: '绝育', link: '/health/spay-neuter' }
        ]}
      ],
      '/care/': [
        { text: '饲养与养护', items: [
          { text: '饲养与养护总览', link: '/care/' },
          { text: '新手养猫全指南', link: '/care/new-owner-guide' },
          { text: '猫的饮食与营养', link: '/care/diet-nutrition' },
          { text: '猫砂与如厕训练', link: '/care/litter-box' }
        ]}
      ],
      '/adoption/': [
        { text: '领养与救助', items: [
          { text: '领养与救助总览', link: '/adoption/' },
          { text: '流浪猫领养指南', link: '/adoption/adoption-guide' },
          { text: '流浪猫救助与 TNR', link: '/adoption/tnr' }
        ]}
      ],
      '/culture/': [
        { text: '历史与文化', items: [
          { text: '历史与文化总览', link: '/culture/' }
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
