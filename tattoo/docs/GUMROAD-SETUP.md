# Gumroad 配置指南 - Oriental Symbols

## 📋 准备工作

### 需要的材料
- [x] 邮箱地址（注册 Gumroad 用）
- [ ] PayPal 账号（接收款项）
- [x] 4 个产品的 SVG 文件（已生成在 `products/` 文件夹）
- [ ] PNG 文件（用在线工具转换 SVG，见 `products/README.md`）
- [ ] 产品封面图（打开 `products/cover-templates.html` 截图）
- [ ] 文化解读 PDF（用浏览器打开 HTML 后打印为 PDF）

---

## 🚀 配置步骤

### 第 1 步：注册 Gumroad 账号

1. 访问 https://gumroad.com
2. 点击右上角 **"Sign Up"**
3. 用邮箱注册（或用 Google 账号快捷登录）
4. 验证邮箱

**预计时间：** 5 分钟

---

### 第 2 步：完善卖家资料

1. 点击右上角头像 → **"Settings"**
2. 填写：
   - **Display Name:** Oriental Symbols
   - **Bio:** Authentic Oriental symbol tattoo designs with deep cultural meanings.
   - **Profile Picture:** 品牌 Logo（可选）
3. 连接 PayPal：
   - 在 Settings 里找到 **"Payouts"**
   - 点击 **"Connect PayPal Account"**
   - 登录 PayPal 授权

**预计时间：** 10 分钟

---

### 第 3 步：创建第一个产品（以"爱"为例）

1. 点击右上角 **"New Product"**
2. 填写产品信息：
   - **Name:** 爱 (Love) - Chinese Character Tattoo Design
   - **Type:** Digital Product
   - **Price:** $9.99（原价 $19.99，设置 Discount 即可）
   - **Description:** 复制下面的文案

**产品描述模板：**
```
🎨 爱 (Love) - Authentic Chinese Character Tattoo Design

A Chinese character representing love, affection, and deep emotional bonds. A timeless choice for expressing care and warmth.

📦 What You'll Receive:
✓ High-resolution PNG file (300 DPI) - ready for tattoo application
✓ SVG vector file - scalable to any size
✓ Cultural meaning guide (PDF) - understand the history and significance
✓ Stroke order diagram - for accurate reproduction

✨ Professional Quality:
- Clean lines optimized for tattooing
- Balanced stroke thickness
- Culturally accurate character design
- Instant download after purchase

💡 Perfect for:
- Your next meaningful tattoo
- Understanding Chinese calligraphy
- Cultural appreciation

Note: This is a digital product. No physical item will be shipped.
```

3. 上传文件：
   - 在 **"Content"** 标签页
   - 上传：PNG 文件 + SVG 文件 + PDF 指南
   - 确保文件命名清晰：`love-character.png`, `love-character.svg`, `love-meaning.pdf`

4. 上传封面图：
   - 在 **"Cover"** 标签页
   - 建议尺寸：1280x720px
   - 格式：JPG 或 PNG

5. 设置价格：
   - 在 **"Checkout"** 标签页
   - Price: $9.99
   - 可选：设置 "Original price" 为 $19.99（显示折扣）

6. 发布产品：
   - 点击右上角 **"Publish"**
   - 产品状态变为 **"Published"**

**预计时间：** 15 分钟/产品

---

### 第 4 步：获取嵌入代码

1. 在产品页面，点击 **"Share"** 按钮
2. 选择 **"Embed on your website"**
3. 选择 **"Button"** 样式（推荐）
4. 复制 HTML 代码

**示例代码：**
```html
<div class="gumroad-product-embed" data-gumroad-product-id="xxxxx"></div>
<script src="https://gumroad.com/js/gumroad-embed.js"></script>
```

**预计时间：** 2 分钟/产品

---

### 第 5 步：替换网站上的 PayPal 按钮

1. 打开 `index.html`
2. 找到 PayPal 按钮代码（搜索 `paypal-button-container`）
3. 替换为 Gumroad 嵌入代码

**修改前：**
```html
<div id="paypal-container-RKC7U9LT7PXX8" class="paypal-button-container"></div>
```

**修改后：**
```html
<div class="gumroad-product-embed" data-gumroad-product-id="你的产品 ID"></div>
```

4. 保存文件
5. 运行 `./deploy.sh` 部署

**预计时间：** 10 分钟

---

### 第 6 步：测试购买流程

1. 打开网站 https://13801380.site
2. 点击一个产品的购买按钮
3. 确认 Gumroad 弹窗出现
4. 用另一个账号完成测试购买（可以用 1 美元测试）
5. 确认：
   - ✅ 支付成功
   - ✅ 下载按钮出现
   - ✅ 下载邮件收到
   - ✅ 文件能正常打开

**预计时间：** 15 分钟

---

## 📊 费用说明

### Gumroad 费率
- **手续费：** 10% 每笔交易
- **支付处理费：** 2.9% + $0.30（PayPal 标准费率）
- **举例：** 卖 $9.99
  - Gumroad 抽成：$1.00
  - 支付处理费：$0.59
  - 你到手：$8.40

### 提现
- **周期：** 每日自动提现到 PayPal
- **最低提现：** $10
- **到账时间：** 1-2 个工作日

---

## ⚠️ 注意事项

### 税务
- Gumroad 自动处理全球 VAT/销售税
- 你不需要自己报税（Gumroad 代扣）
- 年终 Gumroad 会提供税务报表

### 退款
- Gumroad 支持卖家自主设置退款政策
- 建议：7 天内无理由退款（数字商品）
- 退款后 Gumroad 会扣除已收手续费

### 文件更新
- 可以随时更新产品文件
- 已购买用户会自动收到更新通知
- 用户可以重新下载最新版本

---

## 🎯 下一步行动

1. **准备素材**（最紧急！）
   - 4 个汉字的 SVG/PNG 文件
   - 4 个产品封面图
   - 4 份文化解读 PDF

2. **注册 Gumroad**（网络恢复后）
   - 按上面步骤执行
   - 预计总时间：1 小时

3. **替换网站按钮**
   - 等 Gumroad 产品创建好后
   - 替换 PayPal 按钮为 Gumroad 嵌入代码

4. **测试上线**
   - 完整测试购买流程
   - 确认无误后正式上线

---

*文档创建时间：2026-03-16*
*最后更新：2026-03-16*
