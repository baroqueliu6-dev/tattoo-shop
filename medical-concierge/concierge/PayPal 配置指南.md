# PayPal 支付配置指南

## 当前状态

网站已配置为付费咨询模式，使用 PayPal 收款。

---

## 需要完成的配置

### 1. 创建 PayPal 支付按钮

**步骤：**

1. 登录 PayPal 账号：`baroqueliu6@gmail.com`
2. 进入 **PayPal Buttons** 页面：https://www.paypal.com/buttons
3. 选择 **Create Button** → **Buy Now**
4. 配置按钮：
   - **Item Name:** `Medical Concierge Consultation`
   - **Price:** `$20.00 USD`
   - **Currency:** `USD`
   - **Advanced Features:** 开启 "Take customers to this URL when they click your button"（可选，跳转到感谢页）
5. 点击 **Create Button**
6. 复制生成的 **Payment Link** 或 **Button ID**

### 2. 替换网站中的 PayPal 链接

**需要替换的位置（index.html）：**

1. **Hero Section 付费咨询按钮**（约第 214 行）
   ```html
   <a href="https://www.paypal.com/ncp/payment/YOUR_PAYPAL_BUTTON_ID" ...>💳 Book Paid Consultation</a>
   ```

2. **价格页推荐按钮**（约第 850 行）
   ```html
   <a href="https://www.paypal.com/ncp/payment/YOUR_PAYPAL_BUTTON_ID" ...>💳 Book $20 Consultation</a>
   ```

**替换方法：**
- 将 `YOUR_PAYPAL_BUTTON_ID` 替换为你从 PayPal 获取的真实按钮 ID
- 或直接使用完整的 PayPal 支付链接

---

## PayPal 按钮类型选择

### 选项 A: Buy Now 按钮（推荐）
- **用途：** 单次付费咨询
- **价格：** 固定 $20
- **优点：** 简单直接，客户体验好

### 选项 B: Donate 按钮
- **用途：** 灵活金额
- **价格：** 客户自定义
- **优点：** 可用于不同服务等级预付款

### 选项 C: Subscription 按钮
- **用途：** VIP 客户月度服务
- **价格：** 按月扣款
- **优点：** 适合长期客户

---

## 测试流程

配置完成后，按以下步骤测试：

1. **打开网站：** `https://13801380.site`
2. **点击付费咨询按钮**
3. **确认跳转到 PayPal 支付页**
4. **用测试账号完成支付**
5. **检查 PayPal 是否收到款项**
6. **确认邮件通知正常**

---

## 后续优化建议

### 1. 自动确认邮件
- 配置 PayPal IPN（Instant Payment Notification）
- 客户付款后自动发送确认邮件
- 包含预约表单和下一步指引

### 2. 预约日历集成
- 使用 Calendly 或类似工具
- 客户付款后自动选择预约时间
- 同步到你的日历

### 3. 服务套餐按钮
创建多个 PayPal 按钮对应不同服务：
- **Consultation:** $20
- **Standard Package:** $800
- **Full Care Package:** $2500
- **VIP Package:** $4000

---

## 常见问题

### Q: PayPal 手续费是多少？
A: 国际支付约 4.4% + $0.30/笔。$20 咨询费手续费约 $1.18。

### Q: 客户可以用信用卡支付吗？
A: 可以，PayPal 支持信用卡/借记卡支付，客户不需要 PayPal 账号。

### Q: 退款怎么处理？
A: 在 PayPal 后台直接操作退款，手续费会退还。

### Q: 如何查看收款记录？
A: 登录 PayPal → Activity → All Transactions

---

## 联系方式配置汇总

| 渠道 | 配置值 | 位置 |
|------|--------|------|
| 邮箱 | hello@13801380.site | ✅ 已配置 |
| 微信 | louisleo99 | ✅ 已配置 |
| PayPal | 待配置 | ⏳ 需要创建按钮 |

---

**创建完 PayPal 按钮后，告诉我按钮 ID，我帮你替换到网站里。**
