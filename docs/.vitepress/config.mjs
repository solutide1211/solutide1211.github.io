import { defineConfig } from 'vitepress'
import {getThemeConfig} from '@sugarat/theme/node'

const blogTheme = getThemeConfig({
  mermaid: true,
  oml2d: {
    mobileDisplay: true,
    models: [
      {
        path: 'https://registry.npmmirror.com/oml2d-models/latest/files/models/Senko_Normals/senko.model3.json'
      }
    ]
  }
})

// https://vitepress.dev/reference/site-config
export default defineConfig({

  extends: blogTheme,

  markdown: {
    theme: {
      dark: 'dracula-soft',
      light: 'github-dark'
    }
  },
  title: "solutide",
  description: "一个专注于技术学习的博客",
  themeConfig: {
    
    nav: [
      { text: '首页', link: '/' },
      { 
        text: '归档', 
        items: [
          {text: 'ThreadLocal基础使用',link: '/archives/ThreadLocal基础使用'},
          {text: 'ThreadLocal内存泄漏，如何解决', link: '/archives/ThreadLocal内存泄漏,如何解决'}
        ]  
      },
      { 
        text: '标签',
        items: [
          {
            text: 'Docker',
            items: [
              {text: 'Docker概述',link: '/tags/Docker概述'},
              {text: '镜像管理', link: '/tags/镜像管理'}
            ]
          },
          {
            text: 'Linux',
            items: [
              {text: 'Linux概述', link: '/tags/Linux概述'},
              {text: '命令速查', link: '/tags/命令速查'}
            ]
          }
        ]
      },
      { 
        text: '技术栈', 
        collapsed: true,
        items: [
          { 
            text: 'Java', 
            collapsed: true,
            items: [
              {text: 'javaIO', link: '/posts/JavaIO'},
              {text: '网络编程', link: '/posts/网络编程.md'},
              {text: 'IO模型', link: '/posts/IOModel.md'},
              {text: 'javaIO-装饰器模式', link: '/posts/javaIO-装饰器模式.md'},
              {text: '多线程Thread',link: '/posts/线程Thread.md'}
            ]
          },
          { text: 'SpringBoot', link: '/posts/SpringBoot' },
          { text: 'MySQL', link: '/posts/MySQL' },
          { text: 'Redis', link: '/posts/Redis' },
          { text: 'RabbitMQ', link: '/posts/RabbitMq' }
        ]
      }
    ],
    // 博客专属：首页配置
    home: true,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
