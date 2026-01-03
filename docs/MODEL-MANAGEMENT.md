# 模型管理和部署指南

## 目录结构

```
public/models/
├── imperial/ paladin/ avatar/ etc.glb  # 原始模型 (70-95MB each, 开发环境使用)
├── ship_optimized.glb                  # Imperial 优化版 (6MB, 已存在)
└── optimized/                          # 压缩模型目录 (生产环境使用)
    ├── imperial_optimized.glb          # 6MB
    ├── paladin_optimized.glb           # 44MB
    ├── avatar_optimized.glb            # 52MB
    ├── naga_optimized.glb              # 37MB
    ├── cerberus_optimized.glb          # 37MB
    ├── corax_optimized.glb             # 31MB
    ├── tristan_optimized.glb           # 35MB
    ├── thalia_optimized.glb            # 36MB
    └── atron_optimized.glb             # 36MB
```

## 模型加载策略

| 环境 | 使用的文件 | 位置 | 优点 |
|------|-----------|------|------|
| **开发环境** (`npm run dev`) | 原始模型 | 本地 `public/models/*.glb` | 高质量、快速开发 |
| **生产环境** (Cloudflare Pages) | 优化模型 | R2 CDN | 快速加载、节省带宽 |

## 压缩统计

| 飞船 | 原始大小 | 优化后 | 减少比例 |
|------|---------|--------|---------|
| Imperial | 6.05 MB | 6.05 MB | 0% (已优化) |
| Paladin | 84.13 MB | 43.70 MB | 48.1% |
| Avatar | 95.15 MB | 52.25 MB | 45.1% |
| Naga | 78.72 MB | 36.94 MB | 53.1% |
| Cerberus | 79.48 MB | 36.91 MB | 53.6% |
| Corax | 72.88 MB | 31.44 MB | 56.9% |
| Tristan | 76.07 MB | 35.37 MB | 53.5% |
| Thalia | 77.02 MB | 35.84 MB | 53.5% |
| Atron | 77.29 MB | 36.16 MB | 53.2% |
| **总计** | **646.78 MB** | **314.66 MB** | **51.3%** |

## 工作流程

### 步骤 1: 压缩模型

```bash
cd d:\桌面\编程\展示网页开发\EVE-SS-Empire-Eve
node scripts/compress-models.cjs
```

**输出**: `public/models/optimized/*_optimized.glb`

### 步骤 2: 上传到 Cloudflare R2

```bash
# 确保已登录 Wrangler
wrangler login

# 上传优化模型
.\scripts\upload-to-r2.ps1
```

**R2 位置**: `eve-starship-models/models/optimized/`  
**CDN URL**: `https://pub-ef918f4135654b1caa2833736c639ae1.r2.dev/models/optimized/`

### 步骤 3: 提交代码到 GitHub

```bash
# 只提交代码和原始模型，不提交 optimized 目录
git add .
git commit -m "feat: add all 9 ship models with smart loading strategy"
git push origin main
```

**注意**: `.gitignore` 已配置排除 `public/models/optimized/` 目录

## 配置说明

### `config/ships.ts` - 智能路径选择

```typescript
const IS_PRODUCTION = import.meta.env.PROD;
const R2_CDN_BASE_URL = 'https://pub-ef918f4135654b1caa2833736c639ae1.r2.dev/models/optimized';

const getModelPath = (shipId: string): string => {
  if (IS_PRODUCTION) {
    // 生产: R2 CDN 优化模型
    return `${R2_CDN_BASE_URL}/${shipId}_optimized.glb`;
  } else {
    // 开发: 本地原始模型
    return `/models/${shipId}.glb`;
  }
};
```

### 为什么这样设计？

1. **开发体验** - 本地使用高质量原始模型，无需等待 R2 同步
2. **生产性能** - 线上使用优化模型，快速加载，节省带宽
3. **灵活性** - 可以轻松切换模型版本
4. **成本控制** - R2 按流量计费，只在生产环境使用

## 测试

### 本地测试（使用原始模型）

```bash
npm run dev
# 访问: http://localhost:3000/?ship=paladin&faction=amarr
```

### 生产测试（使用 R2 优化模型）

```bash
npm run build
npm run preview
# 或访问: https://eve-ss-empire-eve.pages.dev/?ship=paladin&faction=amarr
```

## 主网站集成

主网站 (`eve-star-ship-web`) 通过 URL 参数调用:

```typescript
// data.ts
const MODEL_BASE_URL = 'https://eve-ss-empire-eve.pages.dev/';

const getModelUrl = (shipId: string, factionId: string): string => {
  return `${MODEL_BASE_URL}?ship=${shipId}&faction=${factionId}`;
};

// 示例
{
  name: "先锋者级 (Paladin)",
  modelUrl: getModelUrl('paladin', 'amarr')
  // => https://eve-ss-empire-eve.pages.dev/?ship=paladin&faction=amarr
}
```

## 添加新飞船

1. 将 GLB 模型文件放入 `public/models/{ship_id}.glb`
2. 运行 `node scripts/compress-models.cjs` (修改脚本添加新 shipId)
3. 运行 `.\scripts\upload-to-r2.ps1`
4. 在 `config/ships.ts` 中添加配置
5. 在主网站 `data.ts` 中添加相应数据

## 故障排除

### 问题: 本地开发模型加载失败
**解决**: 确认原始模型文件存在于 `public/models/*.glb`

### 问题: 生产环境模型加载失败
**解决**: 
1. 检查 R2 文件是否正确上传
2. 验证 CORS 配置 (已在 `r2-cors.json` 中设置)
3. 检查 R2 CDN URL 是否正确

### 问题: 模型文件太大，无法推送到 GitHub
**解决**: 
- 原始模型 < 100MB: 可以推送
- 优化模型: 已排除在 `.gitignore` 中，不会推送

## 维护

- **定期清理**: R2 存储的旧版本模型
- **监控**: R2 流量和存储使用情况
- **优化**: 根据需要调整压缩参数
