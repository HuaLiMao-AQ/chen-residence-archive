# 红色记忆轴

《红色记忆轴：从独秀园走近陈独秀与〈新青年〉》专题博客式互动网页项目，使用 Vue 3 + Vite + TypeScript 构建，适合课程实践汇报、课堂展示与静态部署。

## 运行方式

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

## 项目结构

```text
src/
  components/
    AppHeader.vue
    BackToTop.vue
    HeroSection.vue
    ImagePlaceholderCard.vue
    InfoTagGroup.vue
    QuoteBlock.vue
    ReadingProgress.vue
    SectionBlock.vue
    SummaryCard.vue
    TimelineItem.vue
    TimelineSidebar.vue
  data/
    sections.ts
  styles/
    global.scss
    variables.scss
  App.vue
  main.ts
```

## 页面特性

- 左侧固定时间轴导航，支持点击跳转与滚动高亮
- 顶部阅读进度条与右下角返回顶部按钮
- Hero 专题封面、资料卡片、引言块、总结卡片等视觉模块
- 所有实践照片统一使用占位图组件，并预留后续替换空间
- 响应式布局，适配桌面、平板与手机场景

## 部署说明

`vite.config.ts` 已设置 `base: './'`，静态构建产物可直接部署到 GitHub Pages、Vercel 或 Netlify。
