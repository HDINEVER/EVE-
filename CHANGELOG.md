# 更新日志

## [2.0.0] - 2026-01-03

### 🎉 重大更新

#### ✨ 新增功能

1. **多飞船支持系统**
   - 支持 9 艘 EVE Online 飞船的动态切换
   - 3 个势力（艾玛、加达里、盖伦特）× 3 艘飞船
   - 通过 URL 参数切换：`?ship={shipId}&faction={factionId}`

2. **势力主题系统**
   - 艾玛帝国：金色主题 (#d4af37)
   - 加达里合众国：青色主题 (#44ffdd)
   - 盖伦特联邦：紫色主题 (#a855f7)
   - 主题色自动应用到 UI、光照、战术网格

3. **iframe 嵌入支持**
   - 配置 Cloudflare Pages headers 允许跨域嵌入
   - 支持从 `*.pages.dev` 和 `localhost` 访问
   - 添加 CORS 支持

#### 📝 新增文件

- `config/ships.ts` - 9 艘飞船的完整配置
- `config/factions.ts` - 3 个势力的主题配置
- `hooks/useShipParams.ts` - URL 参数解析 Hook
- `README-URL-PARAMS.md` - URL 参数使用指南
- `QUICKSTART.md` - 快速开始指南
- `demo-iframe.html` - iframe 嵌入演示页面
- `CHANGELOG.md` - 本文件

#### 🔧 修改文件

1. **_headers**
   - 修改 `X-Frame-Options` 从 `DENY` 改为 `ALLOWALL`
   - 添加 `Content-Security-Policy` 允许特定域名嵌入
   - 添加 `Access-Control-Allow-Origin: *`

2. **types.ts**
   - 新增 `ShipConfig` 接口
   - 新增 `FactionTheme` 接口
   - 新增 `ShipParams` 接口

3. **App.tsx**
   - 重构以支持动态飞船和主题切换
   - 使用 `useShipParams` Hook 读取 URL 参数
   - 根据参数加载对应的飞船配置和势力主题
   - 动态设置背景色和氛围光晕效果

4. **components/Scene/SceneViewer.tsx**
   - 新增 `shipConfig`, `themeColor`, `glowColor` props
   - 根据势力主题动态设置光照颜色
   - 战术网格颜色跟随主题色变化

5. **components/Scene/Spaceship.tsx**
   - 支持通过 props 传入模型路径、缩放、位置、旋转
   - 支持动态模型加载（本地或 CDN）

6. **components/UI/EveUI.tsx**
   - 新增 `themeColor` 和 `factionName` props
   - UI 元素颜色动态跟随主题
   - 显示当前势力名称

7. **vite.config.ts**
   - 开发服务器添加 CORS 和 iframe 支持的 headers
   - 便于本地开发和测试

#### 🎨 功能增强

- **主题一致性**: 整个应用的颜色（UI、光照、网格）自动跟随势力主题
- **URL 驱动**: 所有状态通过 URL 参数控制，支持书签和分享
- **响应式设计**: 保持原有的响应式布局，支持多种屏幕尺寸
- **向后兼容**: 不提供参数时使用默认飞船（Imperial Issue + Amarr 主题）

#### 📚 文档

- 完整的 URL 参数使用指南（README-URL-PARAMS.md）
- 快速开始指南（QUICKSTART.md）
- 交互式 iframe 演示页面（demo-iframe.html）
- 包含所有飞船的测试链接和代码示例

#### 🔗 API 接口

符合 `3D-MODEL-API.md` 规范：

```
基础 URL: https://eve-ss-empire-eve.pages.dev/

参数:
  - ship: 飞船 ID (必需)
  - faction: 势力 ID (可选，用于主题色)

示例:
  - https://eve-ss-empire-eve.pages.dev/?ship=imperial&faction=amarr
  - https://eve-ss-empire-eve.pages.dev/?ship=naga&faction=caldari
  - https://eve-ss-empire-eve.pages.dev/?ship=tristan&faction=gallente
```

#### 🚀 部署

- 兼容 Cloudflare Pages 自动部署
- `_headers` 和 `_redirects` 自动复制到 `dist/` 目录
- 支持 Draco 压缩的 GLB 模型

---

## [1.0.0] - 之前版本

### 初始功能
- 单一飞船展示（Imperial Issue）
- 三种视图模式（战术、电影、检视）
- 自动旋转功能
- EVE Online 风格 UI
- 星空背景和 HDR 环境光照
- 响应式设计

---

## 待实现功能 (Roadmap)

### v2.1 计划
- [ ] 为每艘飞船添加独立的 3D 模型文件
- [ ] 添加飞船之间的切换动画
- [ ] 支持通过 postMessage 与父页面通信
- [ ] 添加飞船性能数据的可视化图表

### v2.2 计划
- [ ] 添加米玛塔尔共和国（Minmatar）势力
- [ ] 支持飞船皮肤切换
- [ ] 添加硬点（Hardpoint）可视化
- [ ] 支持多语言（中文/英文切换）

### v3.0 计划
- [ ] 飞船对比模式（并排显示多艘飞船）
- [ ] AR 模式支持（WebXR）
- [ ] 导出飞船截图功能
- [ ] 自定义配置保存（LocalStorage）

---

**当前版本**: 2.0.0  
**最后更新**: 2026-01-03  
**维护者**: HDINEVER
