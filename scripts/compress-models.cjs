// 批量压缩 GLB 模型文件
// 用法: node scripts/compress-models.cjs

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 配置
const MODELS_DIR = path.join(__dirname, '../public/models');
const OUTPUT_DIR = path.join(__dirname, '../public/models/optimized');

// 需要压缩的模型列表（9艘飞船）
const SHIPS = [
  'imperial',    // 帝国号 (当前使用 ship_optimized.glb)
  'paladin',     // 先锋者级
  'avatar',      // 神使级泰坦
  'naga',        // 娜迦级
  'cerberus',    // 希尔博拉斯
  'corax',       // 渡鸦级
  'tristan',     // 特里斯坦
  'thalia',      // 塔利亚
  'atron'        // 阿特龙级
];

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`✓ 创建目录: ${OUTPUT_DIR}`);
}

console.log('==========================================');
console.log('开始压缩 GLB 模型文件');
console.log('==========================================\n');

let totalOriginalSize = 0;
let totalOptimizedSize = 0;
const results = [];

SHIPS.forEach((shipId, index) => {
  console.log(`[${index + 1}/${SHIPS.length}] 处理: ${shipId}`);
  
  // 特殊处理 imperial - 它已经有优化版本
  let inputFile;
  if (shipId === 'imperial') {
    inputFile = path.join(MODELS_DIR, 'ship_optimized.glb');
  } else {
    inputFile = path.join(MODELS_DIR, `${shipId}.glb`);
  }
  
  const outputFile = path.join(OUTPUT_DIR, `${shipId}_optimized.glb`);

  // 检查输入文件是否存在
  if (!fs.existsSync(inputFile)) {
    console.log(`  ⚠ 跳过 (文件不存在): ${inputFile}\n`);
    return;
  }

  try {
    // 获取原始文件大小
    const originalStats = fs.statSync(inputFile);
    const originalSizeMB = (originalStats.size / (1024 * 1024)).toFixed(2);
    totalOriginalSize += originalStats.size;

    // 如果是 imperial，直接复制已优化的文件
    if (shipId === 'imperial') {
      fs.copyFileSync(inputFile, outputFile);
      console.log(`  ✓ 复制已优化文件`);
    } else {
      // 使用 gltf-pipeline 压缩
      const command = `npx gltf-pipeline -i "${inputFile}" -o "${outputFile}" -d`;
      execSync(command, { stdio: 'pipe' });
      console.log(`  ✓ 压缩完成`);
    }

    // 获取优化后文件大小
    const optimizedStats = fs.statSync(outputFile);
    const optimizedSizeMB = (optimizedStats.size / (1024 * 1024)).toFixed(2);
    totalOptimizedSize += optimizedStats.size;

    const reduction = ((1 - optimizedStats.size / originalStats.size) * 100).toFixed(1);

    results.push({
      ship: shipId,
      original: originalSizeMB,
      optimized: optimizedSizeMB,
      reduction: reduction
    });

    console.log(`  原始大小: ${originalSizeMB} MB`);
    console.log(`  优化后: ${optimizedSizeMB} MB`);
    console.log(`  减少: ${reduction}%\n`);

  } catch (error) {
    console.error(`  ✗ 错误: ${error.message}\n`);
  }
});

// 输出汇总
console.log('==========================================');
console.log('压缩结果汇总');
console.log('==========================================\n');

console.table(results);

const totalOriginalMB = (totalOriginalSize / (1024 * 1024)).toFixed(2);
const totalOptimizedMB = (totalOptimizedSize / (1024 * 1024)).toFixed(2);
const totalReduction = ((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1);

console.log(`\n总计原始大小: ${totalOriginalMB} MB`);
console.log(`总计优化后: ${totalOptimizedMB} MB`);
console.log(`总减少: ${totalReduction}%`);

// 检查是否适合 GitHub 推送
console.log('\n==========================================');
console.log('部署建议');
console.log('==========================================\n');

if (totalOptimizedSize < 20 * 1024 * 1024) {
  console.log('✓ 压缩后总大小 < 20MB，可以直接推送到 GitHub 和 Cloudflare Pages');
} else if (totalOptimizedSize < 100 * 1024 * 1024) {
  console.log('⚠ 压缩后总大小 > 20MB 但 < 100MB');
  console.log('  建议: 上传到 Cloudflare R2，但可以保留在 GitHub');
} else {
  console.log('✗ 压缩后总大小 > 100MB');
  console.log('  必须: 上传到 Cloudflare R2，不能推送到 GitHub');
}

console.log('\n完成! 优化后的文件位于: public/models/optimized/');
