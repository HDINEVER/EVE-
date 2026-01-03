# 上传优化模型到 Cloudflare R2
# 使用 Wrangler CLI 上传文件

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "上传优化模型到 Cloudflare R2" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$optimizedDir = "public\models\optimized"
$bucketName = "eve-starship-models"
$r2Prefix = "models/optimized"

# 检查目录是否存在
if (-not (Test-Path $optimizedDir)) {
    Write-Host "[ERROR] 优化模型目录不存在: $optimizedDir" -ForegroundColor Red
    Write-Host "请先运行: node scripts/compress-models.cjs" -ForegroundColor Yellow
    exit 1
}

# 获取所有优化模型文件
$files = Get-ChildItem -Path $optimizedDir -Filter "*.glb"

if ($files.Count -eq 0) {
    Write-Host "[ERROR] 没有找到优化模型文件" -ForegroundColor Red
    exit 1
}

Write-Host "找到 $($files.Count) 个优化模型文件`n" -ForegroundColor Green

# 检查 wrangler 是否安装
try {
    $null = wrangler --version
} catch {
    Write-Host "[ERROR] Wrangler CLI 未安装" -ForegroundColor Red
    Write-Host "请运行: npm install -g wrangler" -ForegroundColor Yellow
    exit 1
}

Write-Host "开始上传到 R2 存储桶: $bucketName`n" -ForegroundColor Cyan

$successCount = 0
$failCount = 0

foreach ($file in $files) {
    $fileName = $file.Name
    $filePath = $file.FullName
    $r2Path = "$r2Prefix/$fileName"
    
    Write-Host "[$(${successCount} + ${failCount} + 1)/$($files.Count)] 上传: $fileName" -ForegroundColor Yellow
    
    try {
        # 使用 wrangler r2 上传文件
        wrangler r2 object put "$bucketName/$r2Path" --file="$filePath"
        
        Write-Host "  [OK] 上传成功" -ForegroundColor Green
        $successCount++
    } catch {
        Write-Host "  [ERROR] 上传失败: $($_.Exception.Message)" -ForegroundColor Red
        $failCount++
    }
    
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "上传完成" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "成功: $successCount 个文件" -ForegroundColor Green
Write-Host "失败: $failCount 个文件" -ForegroundColor Red

if ($failCount -eq 0) {
    Write-Host "`n[SUCCESS] 所有文件上传成功!" -ForegroundColor Green
    Write-Host "`nR2 CDN URL: https://pub-ef918f4135654b1caa2833736c639ae1.r2.dev/models/optimized/" -ForegroundColor Cyan
} else {
    Write-Host "`n[WARNING] 部分文件上传失败，请检查错误信息" -ForegroundColor Yellow
}
