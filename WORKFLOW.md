# 网站项目工作流程

**版本:** 1.0  
**生效日期:** 2026-03-18

---

## 📌 核心原则

1. **确认优先** - 操作前先确认，别盲目动手
2. **同步及时** - 关键节点必须同步结果
3. **记录一切** - 关键信息写文件，别靠脑子记
4. **验证闭环** - 任何操作后必须验证结果

---

## 🔄 标准部署流程

### 阶段 1: 准备（操作前）
```
□ 确认修改内容（git status）
□ 确认目标分支（git branch）
□ 确认当前网络状态
```

### 阶段 2: 推送
```bash
cd ~/.openclaw/workspace/tattoo-shop/
git status          # 确认修改
git add -A
git commit -m "描述清楚改了什么"
git push origin main
```

### 阶段 3: 验证（推送后 2 分钟内）
```
□ GitHub 确认 commit 已出现
□ Vercel 确认部署开始（控制台）
□ Vercel 确认部署完成（Ready 状态）
□ 访问预览 URL 确认内容正确
□ 访问生产域名（强制刷新）确认
```

### 阶段 4: 同步
发送消息给负责人：
```
【部署完成】
- Commit: xxxxx
- 时间: HH:MM
- 状态: ✅ 成功 / ❌ 失败
- 预览: https://tatoo-shop-2024.vercel.app
- 备注: （如有问题说明情况）
```

---

## 🛒 Gumroad 集成流程（2026-03-18 更新）

### 创建 Gumroad 产品
1. 访问 `https://gumroad.com`（已自动登录）
2. 点 "Create new product" 或访问 `/products/new`
3. 填写产品信息：
   - **Name**: 产品名（如 "Love - Oriental Symbol Tattoo Design"）
   - **Price**: 价格（如 $9.99）
   - **URL**: 自定义链接（如 `love-tattoo-design`）
   - **Description**: 产品描述（简短、突出卖点）
4. 创建产品版本（Version）：
   - 点 "Add version"
   - 填写版本名称（如 "Love Design - PNG + SVG + Guide"）
5. 上传产品文件（需要手动操作）：
   - 点 "Upload your files"
   - 上传 PNG、SVG、PDF 等文件
6. 上传封面图和缩略图（需要手动操作）：
   - Cover: 横图（1280x720px）
   - Thumbnail: 方图（600x600px）
7. 连接支付方式（需要手动操作）：
   - 点 "Publish and continue"
   - 绑定 PayPal 或银行账户
8. 发布产品，获取产品链接：
   - 格式：`https://baroquelium.gumroad.com/l/产品名`

### Gumroad 产品链接汇总
```
1. Love:    https://baroquelium.gumroad.com/l/love-tattoo-design
2. Joy:     https://baroquelium.gumroad.com/l/joy-tattoo-design
3. Cool:    https://baroquelium.gumroad.com/l/cool-tattoo-design
4. Good:    https://baroquelium.gumroad.com/l/good-tattoo-design
5. Beauty:  https://baroquelium.gumroad.com/l/beauty-tattoo-design
6. History: https://baroquelium.gumroad.com/l/history-tattoo-design
```

### 网站集成 Gumroad 链接
1. 找到产品卡片中的 PayPal 按钮容器
2. 替换为 Gumroad 购买链接：
```html
<a href="https://baroquelium.gumroad.com/l/产品名" 
   class="btn btn-primary btn-buy" 
   target="_blank">Buy Now →</a>
```
3. 添加 CSS 样式（如需要）：
```css
.btn-buy {
    display: inline-block;
    text-align: center;
    padding: 12px 30px;
    width: 100%;
    margin-top: 10px;
}
```
4. 提交并推送代码
5. Vercel 自动部署（无需手动操作）

---

## 🚀 Vercel 部署要点（重要！）

### 自动部署机制
- **推送到 GitHub 后自动部署**，不需要手动 Redeploy！
- Vercel 检测到 `main` 分支更新后自动开始部署
- 部署时间：通常 1-2 分钟

### 检查部署状态
1. 访问 Vercel 控制台：`https://vercel.com/baroqueliu6-devs-projects/tatoo-shop-2024`
2. 查看最新部署：
   - 状态：**Ready** = 成功
   - 状态：**Building** = 部署中
   - 状态：**Failed** = 失败（查看 Logs）
3. 访问预览链接验证：`https://tatoo-shop-2024.vercel.app`

### 如果网站没更新
1. **等几分钟** - Vercel 部署需要时间
2. **强制刷新** - Cmd+Shift+R（Mac）或 Ctrl+Shift+R（Windows）
3. **检查 Vercel 部署状态** - 确认是 Ready 状态
4. **清除 DNS 缓存** - 域名更新可能需要 5-10 分钟

### 不需要手动 Redeploy
- Vercel 会自动检测 GitHub 推送
- 除非部署失败，否则不需要手动操作
- 找不到 Redeploy 按钮是正常的，因为不需要！

---

## 🧹 文件清理规则

**保留什么:**
- `index.html` - 主页面
- `css/style.css` - 样式
- `js/main.js` - 交互
- `products/` - 产品设计文件
- `PROJECT-STATUS.md` - 项目状态
- `WORKFLOW.md` - 工作流程

**可以删除:**
- `research/` - 调研报告（已完成）
- `*-template.md` - 模板文件
- `marketing-strategy.md` - 策略文档
- `GUMROAD-SETUP.md` - 过时配置
- `TODAY-PLAN.md` - 过期计划
- `deploy.sh` - 暂时用不到

**决策记录:**
- 2026-03-18: 删除 `research/`（调研已完成，无需保留在生产仓库）

---

## 📞 沟通协议

### 什么时候必须同步
- ✅ 部署完成/失败
- ✅ 发现严重 bug
- ✅ 配置修改（域名、DNS、webhook）
- ✅ 文件删除/大规模修改
- ✅ 遇到阻碍需要帮助

### 什么时候可以不同步
- ❌ 日常代码修改（小修小补）
- ❌ 文档更新
- ❌ 格式调整

### 同步格式
```
【类型】简短描述
- 关键信息 1
- 关键信息 2
- 需要我做什么：（如有）
```

---

## 🛠️ 工具使用规范

### Git
- 提交信息用英文或中文，但要清楚描述改动
- 小步提交，不要一次性改太多
- 推送前确认分支正确

### Vercel
- 部署后必须检查状态
- 失败时查看日志（Logs 标签）
- 域名绑定在项目 Settings → Domains

### GitHub
- 仓库是 `tattoo-shop`（两个 t）
- 分支是 `main`
- 推送后检查 Actions 和 Deployments

### Gmail 邮箱（2026-03-18 确认）✅
**重要能力确认：**
- ✅ **可以访问 Gmail**：`https://gmail.com`（已自动登录）
- ✅ **可以读取邮件**：查看收件箱、已发送等
- ✅ **可以写邮件**：填写收件人、主题、正文
- ✅ **可以发送邮件**：点击 Send 按钮发送

**邮箱账号：** `baroqueliu6@gmail.com`（Baroque Liu）

**使用场景：**
1. 回复客户咨询（文化含义、定制需求）
2. 发送确认邮件
3. 与供应商/合作伙伴沟通

**操作流程：**
```
1. 访问 https://gmail.com（自动登录）
2. 点"Compose"写新邮件
3. 填写收件人、主题、正文
4. 点"Send"发送
5. 在"Sent"文件夹确认已发送
```

**注意事项：**
- 邮件发送后检查"Sent"文件夹确认
- 重要邮件保留副本
- 客户咨询邮件及时回复（24 小时内）

**实测验证：** 2026-03-18 成功发送测试邮件至 `leo_cap@foxmail.com`

---

## 🚨 问题升级流程

**Level 1: 自行解决**
- 网络问题重试 1 次
- 部署失败查看日志
- 小问题自己处理

**Level 2: 同步负责人**
- 同一错误出现 2 次
- 不确定如何决策
- 需要权限/验证

**Level 3: 暂停等待**
- 需要密码/验证码
- 需要现实端操作
- 涉及资金/安全

---

## 📋 检查清单模板

### 每日检查（心跳）
```
□ 网站可访问
□ 无严重 bug 报告
□ 部署状态正常
```

### 发布前检查
```
□ 所有链接有效
□ 图片加载正常
□ 移动端显示正常
□ 支付流程测试通过
□ 域名 DNS 正确
```

### 故障排查
```
□ GitHub 最新 commit 是什么
□ Vercel 最新部署状态
□ 域名 DNS 指向
□ 浏览器缓存已清除
```

---

**最后提醒:** 这个文档是活的，遇到问题就更新它！
