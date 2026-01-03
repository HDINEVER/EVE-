# 🚀 快速开始指南

## ✅ 已完成的功能

### 1. iframe 嵌入支持
- ✅ 修改 `_headers` 文件，允许跨域 iframe 嵌入
- ✅ 配置 `vite.config.ts` 支持本地开发测试
- ✅ 支持来自 `*.pages.dev` 和 `localhost` 的嵌入

### 2. 多飞船切换系统
- ✅ 支持 9 艘飞船（3个势力 × 3艘飞船）
- ✅ 通过 URL 参数动态切换：`?ship={shipId}&faction={factionId}`
- ✅ 自动应用势力主题色（艾玛金色、加达里青色、盖伦特紫色）

### 3. 配置文件
- ✅ `config/ships.ts` - 飞船配置
- ✅ `config/factions.ts` - 势力主题
- ✅ `hooks/useShipParams.ts` - URL 参数解析
- ✅ `types.ts` - TypeScript 类型定义

### 4. 组件更新
- ✅ `App.tsx` - 支持动态飞船和主题切换
- ✅ `SceneViewer.tsx` - 支持主题色和飞船配置
- ✅ `Spaceship.tsx` - 支持动态模型加载
- ✅ `EveUI.tsx` - 支持主题色和势力名称显示

## 📋 测试步骤

### 本地开发测试

1. **启动开发服务器**
```bash
npm run dev
```

2. **测试不同的飞船**

访问以下 URL：
```
http://localhost:3000/?ship=imperial&faction=amarr
http://localhost:3000/?ship=naga&faction=caldari
http://localhost:3000/?ship=tristan&faction=gallente
```

3. **测试 iframe 嵌入**

在浏览器中打开 `demo-iframe.html` 文件：
```bash
# Windows
start demo-iframe.html

# macOS
open demo-iframe.html

# Linux
xdg-open demo-iframe.html
```

### 部署到 Cloudflare Pages

1. **构建项目**
```bash
npm run build
```

2. **提交到 Git**
```bash
git add .
git commit -m "feat: 支持9艘飞船切换和iframe嵌入"
git push origin main
```

3. **等待 Cloudflare Pages 自动部署**

部署完成后，访问：
```
https://eve-ss-empire-eve.pages.dev/?ship=imperial&faction=amarr
```

## 📝 使用示例

### HTML iframe 嵌入
```html
<iframe 
  src="https://eve-ss-empire-eve.pages.dev/?ship=imperial&faction=amarr"
  width="800"
  height="600"
  frameborder="0"
  allowfullscreen
></iframe>
```

### React 组件
```tsx
const ShipViewer = ({ shipId = 'imperial', factionId = 'amarr' }) => {
  return (
    <iframe
      src={`https://eve-ss-empire-eve.pages.dev/?ship=${shipId}&faction=${factionId}`}
      style={{
        width: '100%',
        height: '600px',
        border: 'none',
        borderRadius: '8px'
      }}
      allowFullScreen
    />
  );
};

// 使用
<ShipViewer shipId="naga" factionId="caldari" />
```

## 🎨 支持的飞船列表

| Faction | Ship ID | 中文名 | English Name | Class |
|---------|---------|--------|--------------|-------|
| amarr | imperial | 帝国号 | Imperial Issue | Battleship |
| amarr | paladin | 先锋者级 | Paladin | Marauder |
| amarr | avatar | 神使级泰坦 | Avatar | Titan |
| caldari | naga | 娜迦级 | Naga | Battlecruiser |
| caldari | cerberus | 希尔博拉斯 | Cerberus | Heavy Assault Cruiser |
| caldari | corax | 渡鸦级 | Corax | Destroyer |
| gallente | tristan | 特里斯坦 | Tristan | Frigate |
| gallente | thalia | 塔利亚 | Thalia | Logistics Frigate |
| gallente | atron | 阿特龙级 | Atron | Interceptor |

## ⚠️ 注意事项

### 3D 模型文件
当前所有飞船使用相同的默认模型（Imperial Issue）。如需为每艘飞船使用不同模型：

1. 准备 9 个 GLB 模型文件
2. 命名为：`imperial.glb`, `paladin.glb`, `avatar.glb`, `naga.glb`, 等
3. 将文件放入 `/public/models/` 目录
4. 或上传到 R2 CDN，并更新 `config/ships.ts` 中的 `modelPath`

### 性能优化
- 建议使用 Draco 压缩的 GLB 模型
- 纹理使用 WebP 格式
- 单个模型文件建议不超过 10MB

## 📚 相关文档

- [README-URL-PARAMS.md](./README-URL-PARAMS.md) - 详细的 URL 参数使用指南
- [demo-iframe.html](./demo-iframe.html) - iframe 嵌入演示页面
- [3D-MODEL-API.md](../docs/3D-MODEL-API.md) - API 接口规范

## 🔧 故障排除

### iframe 显示 "Refused to display in a frame"
- 确认 `_headers` 文件已正确部署
- 检查 Cloudflare Pages 的构建日志
- 清除浏览器缓存

### 主题色未生效
- 检查 URL 参数格式是否正确
- 打开浏览器控制台查看错误信息
- 确认 `faction` 参数为 `amarr`, `caldari`, 或 `gallente`

### 模型未加载
- 当前默认使用 R2 CDN 的模型
- 如果是自定义模型，确认文件路径正确
- 检查模型文件是否存在且可访问

## 📞 技术支持

如有问题，请查看：
1. 浏览器开发者工具的 Console 和 Network 标签
2. Cloudflare Pages 的部署日志
3. 项目的 GitHub Issues

---

**项目状态**: ✅ 就绪可用  
**最后更新**: 2026-01-03
