# 3D 模型展示页面 - URL 参数使用指南

## 概述

本项目已配置为支持通过 URL 参数动态切换飞船模型和势力主题。支持 **9 艘飞船**，分属 **3 个势力**。

## iframe 嵌入支持

✅ 已配置允许 iframe 嵌入：
- 修改了 `_headers` 文件，设置 `X-Frame-Options: ALLOWALL`
- 添加了 CSP 策略，允许 `*.pages.dev` 和 `localhost` 嵌入
- 支持跨域访问 (CORS)

## URL 参数格式

```
https://eve-ss-empire-eve.pages.dev/?ship={shipId}&faction={factionId}
```

### 参数说明

| 参数 | 说明 | 必需 | 默认值 |
|------|------|------|--------|
| `ship` | 飞船唯一标识符 | 可选 | `imperial` |
| `faction` | 势力标识符（用于主题色） | 可选 | `amarr` |

## 支持的飞船列表

### 艾玛帝国 (Amarr Empire)
| Ship ID | 飞船名称 | 舰船类型 | URL 示例 |
|---------|----------|----------|----------|
| `imperial` | 帝国号 Imperial Issue | 战列舰 | [查看](https://eve-ss-empire-eve.pages.dev/?ship=imperial&faction=amarr) |
| `paladin` | 先锋者级 Paladin | 掠夺舰 | [查看](https://eve-ss-empire-eve.pages.dev/?ship=paladin&faction=amarr) |
| `avatar` | 神使级泰坦 Avatar | 泰坦 | [查看](https://eve-ss-empire-eve.pages.dev/?ship=avatar&faction=amarr) |

**主题色**: 金色 (#d4af37) | **特点**: 厚重装甲，激光武器

---

### 加达里合众国 (Caldari State)
| Ship ID | 飞船名称 | 舰船类型 | URL 示例 |
|---------|----------|----------|----------|
| `naga` | 娜迦级 Naga | 战列巡洋舰 | [查看](https://eve-ss-empire-eve.pages.dev/?ship=naga&faction=caldari) |
| `cerberus` | 希尔博拉斯 Cerberus | 重型突击巡洋舰 | [查看](https://eve-ss-empire-eve.pages.dev/?ship=cerberus&faction=caldari) |
| `corax` | 渡鸦级 Corax | 驱逐舰 | [查看](https://eve-ss-empire-eve.pages.dev/?ship=corax&faction=caldari) |

**主题色**: 青色 (#44ffdd) | **特点**: 护盾防御，导弹系统

---

### 盖伦特联邦 (Gallente Federation)
| Ship ID | 飞船名称 | 舰船类型 | URL 示例 |
|---------|----------|----------|----------|
| `tristan` | 特里斯坦 Tristan | 护卫舰 | [查看](https://eve-ss-empire-eve.pages.dev/?ship=tristan&faction=gallente) |
| `thalia` | 塔利亚 Thalia | 后勤护卫舰 | [查看](https://eve-ss-empire-eve.pages.dev/?ship=thalia&faction=gallente) |
| `atron` | 阿特龙级 Atron | 截击舰 | [查看](https://eve-ss-empire-eve.pages.dev/?ship=atron&faction=gallente) |

**主题色**: 紫色 (#a855f7) | **特点**: 无人机战术，混合炮

---

## iframe 嵌入示例

### 基础嵌入
```html
<iframe 
  src="https://eve-ss-empire-eve.pages.dev/?ship=imperial&faction=amarr"
  width="800"
  height="600"
  frameborder="0"
  allowfullscreen
></iframe>
```

### React 组件示例
```tsx
const ShipViewer = ({ shipId, factionId }) => {
  const url = `https://eve-ss-empire-eve.pages.dev/?ship=${shipId}&faction=${factionId}`;
  
  return (
    <iframe
      src={url}
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
```

### 动态切换示例
```tsx
const [currentShip, setCurrentShip] = useState({ ship: 'imperial', faction: 'amarr' });

const ships = [
  { ship: 'imperial', faction: 'amarr', name: '帝国号' },
  { ship: 'naga', faction: 'caldari', name: '娜迦级' },
  { ship: 'tristan', faction: 'gallente', name: '特里斯坦' },
];

return (
  <div>
    <div>
      {ships.map(s => (
        <button 
          key={s.ship}
          onClick={() => setCurrentShip({ ship: s.ship, faction: s.faction })}
        >
          {s.name}
        </button>
      ))}
    </div>
    <iframe
      src={`https://eve-ss-empire-eve.pages.dev/?ship=${currentShip.ship}&faction=${currentShip.faction}`}
      style={{ width: '100%', height: '600px', border: 'none' }}
    />
  </div>
);
```

## 主题色配置

每个势力都有独特的主题色，会自动应用到：
- UI 界面颜色
- 光照效果
- 战术网格（Tactical Mode）
- 文字和边框高亮

| 势力 | 主色调 | 发光色 | 背景色 |
|------|--------|--------|--------|
| Amarr | `#d4af37` 金色 | `rgba(212, 175, 55, 0.8)` | `#1a1000` |
| Caldari | `#44ffdd` 青色 | `rgba(68, 255, 221, 0.8)` | `#001a18` |
| Gallente | `#a855f7` 紫色 | `rgba(168, 85, 247, 0.8)` | `#0f001a` |

## 默认行为

- 如果不提供任何参数：显示 **Imperial Issue (艾玛帝国号)**
- 如果只提供 `ship` 参数：使用该飞船所属势力的主题色
- 如果参数无效：回退到默认飞船和主题

## 测试链接

本地开发测试：
```
http://localhost:5173/?ship=imperial&faction=amarr
http://localhost:5173/?ship=naga&faction=caldari
http://localhost:5173/?ship=tristan&faction=gallente
```

生产环境测试：
```
https://eve-ss-empire-eve.pages.dev/?ship=paladin&faction=amarr
https://eve-ss-empire-eve.pages.dev/?ship=cerberus&faction=caldari
https://eve-ss-empire-eve.pages.dev/?ship=thalia&faction=gallente
```

## 技术架构

```
项目结构：
├── App.tsx                      # 主应用，使用 useShipParams hook
├── hooks/
│   └── useShipParams.ts         # URL 参数解析
├── config/
│   ├── ships.ts                 # 9艘飞船配置
│   └── factions.ts              # 3个势力主题
├── components/
│   ├── Scene/
│   │   ├── SceneViewer.tsx     # 3D 场景（支持动态主题色）
│   │   └── Spaceship.tsx        # 飞船模型（支持动态加载）
│   └── UI/
│       └── EveUI.tsx            # UI 界面（支持动态主题色）
└── types.ts                     # TypeScript 类型定义
```

## 部署说明

1. 确保 `_headers` 文件在项目根目录
2. 使用 `npm run build` 构建
3. 部署到 Cloudflare Pages
4. 测试 iframe 嵌入是否正常工作

## 与主网站对接

主网站项目 (eve-star-ship-web) 可以通过以下方式调用本项目：

```tsx
// 在主网站的飞船卡片组件中
const ShipCard = ({ ship }) => (
  <div className="ship-card">
    <h3>{ship.name}</h3>
    <iframe 
      src={ship.modelUrl}  // ship.modelUrl 即为本项目的完整URL
      width="100%"
      height="400px"
    />
  </div>
);
```

根据 3D-MODEL-API.md 文档，主网站中的 `FACTIONS` 数据已经包含了 `modelUrl` 字段，指向本项目的对应URL。

## 故障排除

### iframe 显示空白
- 检查浏览器控制台是否有 CSP 或 CORS 错误
- 确认 `_headers` 文件已正确部署
- 测试直接访问 URL 是否正常

### 模型未加载
- 当前默认使用 R2 存储的 Imperial Issue 模型
- 其他飞船的 3D 模型文件需要准备并上传到 `/public/models/` 目录
- 模型文件命名需与 `config/ships.ts` 中的 `modelPath` 一致

### 主题色未生效
- 检查 URL 参数是否正确
- 查看浏览器控制台的日志输出
- 确认 `faction` 参数与 `config/factions.ts` 中的 ID 匹配

---

**更新时间**: 2026-01-03  
**项目版本**: v2.0 (支持多飞船切换)
