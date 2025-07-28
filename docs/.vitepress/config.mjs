import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "solutide",
  description: "test",
  themeConfig: {
    logo: {src: '../public/favicon.ico',width: 64,height: 64},
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Java', 
        items:  [
          {text: 'Java基础',link: '/java/BaseJava'},
          {text: '数据结构',link: '/java/java-data-structure'},
          {text: 'SpringBoot',link: '/java/SpringBoot'}
        ]
      },
      { 
        text: 'database',
        items: [
          {text: 'mysql',link: '/DataBases/MySQL'},
          {text: 'Redis',link: '/DataBases/Redis'}
        ]
       },
      { 
        text: '中间件',
        items: [
          {text: 'RabbitMQ',link: '/MiddleWare/RabbitMq'},
        ]
      }
    ],

    sidebar: [
  {
    text: 'Java',
    collapsed: false, // 默认展开
    items: [
      { text: 'Java基础', link: '/java/BaseJava' },
      { 
        text: '数据结构', 
        collapsed: true, // 子目录是否折叠
        items: [
          { text: '概述', link: '/java/java-data-structure/' }, // index.md
          { text: '链表', link: '/java/java-data-structure/LinkedList' },
          { text: '动态数组', link: '/java/java-data-structure/ArrayList' },
          { text: '哈希表', link: '/java/java-data-structure/HashMap' },
          { text: '树结构', link: '/java/java-data-structure/Tree' },
          { text: '队列', link: '/java/java-data-structure/queue' },
        ]
      },
      { text: 'SpringBoot', link: '/java/SpringBoot' },
      {text: 'JavaIO',link: '/java/JavaIO'},
      {text: 'IO模型',link: '/java/IOModel'},
      {
        text: 'Netty',
        collapsed: true, // 子目录是否折叠
        items: [
          {text: 'Netty基础',link: '/java/Netty/Netty基础'},
        ]
      }
    ]
  }
],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
