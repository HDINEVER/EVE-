# 紧急修复: iframe 嵌入被阻止

## 问题诊断

实际测试显示 Cloudflare Pages 返回的响应头是:
```
X-Frame-Options: DENY  ❌ (阻止 iframe)
```

虽然 `_headers` 文件配置正确，但 Cloudflare Pages 可能使用了默认的安全设置。

## 解决方案（选择其一）

### ✅ 方案 1: 使用 Cloudflare Pages Functions (推荐)

已创建文件: `functions/_middleware.ts`

这个文件会在请求时动态设置正确的响应头。

**操作步骤:**
```bash
cd d:\桌面\编程\展示网页开发\EVE-SS-Empire-Eve

# functions/_middleware.ts 已创建

# 重新构建和部署
npm run build

# 提交到 Git
git add functions/_middleware.ts
git commit -m "feat: add middleware to allow iframe embedding"
git push

# Cloudflare Pages 会自动重新部署
```

**验证:**
```powershell
# 等待 2-3 分钟让部署完成，然后测试
Invoke-WebRequest -Uri "https://eve-ss-empire-eve.pages.dev/?ship=imperial&faction=amarr" -Method Head | Select-Object -ExpandProperty Headers | Select-Object "X-Frame-Options"
```

应该显示: `X-Frame-Options: ALLOWALL`

---

### 方案 2: Cloudflare Dashboard 配置

1. 登录 https://dash.cloudflare.com
2. 进入 **Workers & Pages**
3. 选择 **EVE-SS-Empire-Eve** 项目
4. 进入 **Settings** → **Functions**
5. 添加以下配置（如果有界面的话）

---

### 方案 3: 使用 `_headers` + 重新部署

有时 `_headers` 文件在首次部署时没有生效。

```bash
cd d:\桌面\编程\展示网页开发\EVE-SS-Empire-Eve

# 确认 _headers 文件存在
cat _headers

# 强制重新构建
rm -rf dist
npm run build

# 确认 dist/_headers 存在
ls dist/_headers

# 重新部署
git add .
git commit -m "fix: force redeploy with _headers"
git push
```

---

## 当前状态总结

### ✅ 主网站 (eve-star-ship-web)
- URL 生成: 正确 ✅
- 模态框组件: 正常 ✅
- Ship ID 映射: 完整 ✅

### ❌ 3D 模型项目 (EVE-SS-Empire-Eve)  
- URL 参数解析: 正常 ✅
- Ship 配置: 完整 ✅
- **响应头: 错误 ❌ (X-Frame-Options: DENY)**

### 需要做的事
1. ✅ 已创建 `functions/_middleware.ts`
2. ⏳ 提交并推送到 GitHub
3. ⏳ 等待 Cloudflare Pages 自动部署
4. ⏳ 测试验证

---

## 快速验证命令

### 测试响应头
```powershell
$r = Invoke-WebRequest -Uri "https://eve-ss-empire-eve.pages.dev/" -Method Head -UseBasicParsing
Write-Host "X-Frame-Options: $($r.Headers['X-Frame-Options'])"
Write-Host "CSP: $($r.Headers['Content-Security-Policy'])"
```

### 预期结果
```
X-Frame-Options: ALLOWALL
CSP: frame-ancestors 'self' https://*.pages.dev https://eve-star-ship-web.pages.dev ...
```

---

## 临时测试方案

在等待修复期间，你可以:

1. **直接在新标签页打开 3D 模型**
   ```typescript
   // 临时修改 ShipModelViewer.tsx
   // 将 iframe 改为直接打开新窗口
   onClick={() => window.open(modelUrl, '_blank')}
   ```

2. **使用本地开发服务器测试**
   ```bash
   # 在 EVE-SS-Empire-Eve 项目
   cd d:\桌面\编程\展示网页开发\EVE-SS-Empire-Eve
   npm run dev  # 会在 localhost:3000 运行

   # 在主网站项目修改测试URL
   const MODEL_BASE_URL = 'http://localhost:3000/';
   ```

   本地开发服务器的 `vite.config.ts` 已经配置了正确的响应头。

---

## 下一步

执行以下命令推送修复:

```bash
cd d:\桌面\编程\展示网页开发\EVE-SS-Empire-Eve
git status
git add functions/_middleware.ts
git commit -m "fix: add middleware to allow iframe embedding with correct headers"
git push origin main
```

然后等待 3-5 分钟让 Cloudflare Pages 重新部署。
