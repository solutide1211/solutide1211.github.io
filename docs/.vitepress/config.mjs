import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  markdown: {
    theme: {
      dark: 'dracula-soft',
      light: 'github-dark'
    }
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
  {
    text: 'Java',
    collapsed: false, // 默认展开
    items: [
      { text: '源码阅读',
        collapsed: true, // 子目录是否折叠
        items:[
          {text: 'LinkedList',link: '/java/SourceCodeLearn/LinkedList.md'}
        ]  
      },
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
      {
        text: 'JavaIO',
        collapsed: true,
        items: [
          {text: 'IO概述', link: '/java/JavaIO'},
          {text: 'javaIO-装饰器模式', link: 'java/javaIO-装饰器模式'}
        ]
      },
      {text: 'IO模型',link: '/java/IOModel'},
      {
        text: 'Netty',
        collapsed: true, // 子目录是否折叠
        items: [
          {text: 'Netty基础',link: '/java/Netty/Netty基础'},
        ]
      },
      {text: '线程',link: '/java/线程Thread'}
    ]
  },
  {
    text: '设计模式',
    collapsed: false, // 默认展开
    items: [
      {text: '工厂模式', link:'/DesignPatterns/CreationalPatterns/FactoryPattern'},
      {text: '抽象工厂模式', link:'/DesignPatterns/CreationalPatterns/AbstractFactoryPattern'},
      {text: '单例模式', link:'/DesignPatterns/CreationalPatterns/SingletonPattern'},
      {text: '建造者模式', link:'/DesignPatterns/CreationalPatterns/BuilderPattern'},
      {text: '原型模式', link:'/DesignPatterns/CreationalPatterns/PrototypePattern'},
      {text: '适配器模式', link:'/DesignPatterns/StructuralPatterns/AdapterPattern'},
      {text: '组合模式', link:'/DesignPatterns/StructuralPatterns/CompositePattern'},
      {text: '装饰器模式', link:'/DesignPatterns/StructuralPatterns/DecoratorPattern'},
      {text: '代理模式', link:'/DesignPatterns/StructuralPatterns/ProxyPattern'},
      {text: '责任链模式', link:'/DesignPatterns/BehavioralPatterns/ChainOfResponsibilityPattern'},
      {text: '观察者模式', link:'/DesignPatterns/BehavioralPatterns/ObserverPattern'},
      {text: '策略模式', link:'/DesignPatterns/BehavioralPatterns/StrategyPattern'},
    ]
  },
  {
  text: '其他',
  collapsed: false, // 默认展开
  items: [
    {
      text: 'Linux',
      collapsed: false, // 二级目录默认展开
      items: [
        { text: 'Linux概述', link: 'Other/Linux/Linux概述' },
        { text: '命令速查', link: 'Other/Linux/命令速查' },
      ]
    },
    {
      text: 'Docker',
      collapsed: false, // 二级目录默认展开
      items: [
        { text: 'Docker概述', link: 'Other/Docker/Docker概述' },
        { text: '镜像管理', link: 'Other/Docker/镜像管理' },
      ]
    },
    {
      text: '随记',
      collapsed: true,
      items: [
        {text: 'ThreadLocal基础使用', link: 'Other/随记/ThreadLocal基础使用'},
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
