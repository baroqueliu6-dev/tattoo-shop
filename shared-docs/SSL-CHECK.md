# SSL/HTTPS 问题排查

**问题:** 浏览器地址栏显示"不安全"
**域名:** 13801380.site
**时间:** 2026-03-19 16:40

---

## 🔍 排查结果

### ✅ 已检查
1. **网站能正常 HTTPS 访问** - https://13801380.site 可以打开
2. **无混合内容** - 没有引用 HTTP 资源
3. **Vercel 自动 SSL** - Vercel 默认提供 Let's Encrypt 证书

### ⚠️ 可能原因

1. **SSL 证书刚签发，浏览器缓存**
   - Vercel 新域名需要 24-48 小时完全生效
   - 浏览器可能缓存了旧的 HTTP 状态

2. **DNS 传播未完成**
   - 域名 DNS 记录可能还在传播中
   - 部分地区可能还没指向 Vercel

3. **浏览器缓存问题**
   - 之前访问过 HTTP 版本
   - 浏览器记住了"不安全"状态

---

## 🛠️ 解决方案

### 方案 1: 强制刷新（推荐先试）
**Windows/Linux:** `Ctrl + Shift + R`  
**Mac:** `Cmd + Shift + R`

这会清除缓存并重新加载页面。

### 方案 2: 清除浏览器缓存
1. 打开浏览器设置
2. 隐私和安全 → 清除浏览数据
3. 选择"缓存的图片和文件"
4. 清除数据，重新访问网站

### 方案 3: 检查 Vercel SSL 配置
1. 访问 https://vercel.com
2. 登录 baroqueliu6@gmail.com
3. 进入 tattoo-site 项目
4. 设置 → Domains
5. 确认 13801380.site 状态是"Configured"且有绿色勾

### 方案 4: 等待 SSL 完全生效
- Vercel 自动 SSL 通常需要 24 小时
- 如果刚配置，可以等明天再检查

---

## 📝 检查清单

访问 https://13801380.site 后：

- [ ] 地址栏是否有锁图标？
- [ ] 点击锁图标，证书是否有效？
- [ ] 浏览器控制台 (F12) 是否有安全警告？
- [ ] Vercel 控制台域名状态是否正常？

---

## 🎯 最佳实践

### 1. 始终使用 HTTPS 链接
- 所有外部资源用 `https://` 或 `//` 开头
- Gumroad 链接已经是 HTTPS ✅

### 2. 启用 HSTS（可选）
在 Vercel 项目设置中启用强制 HTTPS 重定向

### 3. 定期检查 SSL
使用工具检查 SSL 状态：
- https://www.ssllabs.com/ssltest/
- https://www.whynopadlock.com/

---

**下一步:** 
1. 先尝试强制刷新（Cmd+Shift+R）
2. 如果还有问题，检查 Vercel 控制台域名状态
3. 还是不行，等 24 小时让 SSL 完全生效
