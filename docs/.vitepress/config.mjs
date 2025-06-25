import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
  build: {
    outDir: 'docs/.vitepress/dist',
  },
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
      
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
