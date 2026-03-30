# Vercel 子域名配置指南

**子域名:** `service.13801380.site`  
**用途:** 北京陪诊服务介绍页面  
**日期:** 2026-03-19

---

## ✅ 代码已推送

GitHub 仓库已更新：
- 新文件：`/concierge/index.html`
- Commit: `fc380f7`
- 推送时间：2026-03-19 20:20

---

## 📋 配置步骤

### 第 1 步：在 Vercel 添加子域名

1. 访问：https://vercel.com/baroqueliu6-devs-projects/tattoo-site/settings/domains
2. 点击 **"Add Domain"** 按钮
3. 输入域名：`service.13801380.site`
4. 点击 **"Add"** 确认

### 第 2 步：配置 DNS 记录

**在你的域名注册商处添加以下 DNS 记录：**

#### CNAME 记录
```
类型：CNAME
名称/主机：service
值/目标：cname.vercel-dns.com
TTL: 自动
```

### 第 3 步：等待生效

- **DNS 生效时间:** 通常 5-30 分钟
- **完全生效:** 最多 48 小时
- **SSL 证书:** 自动签发（DNS 生效后）

### 第 4 步：验证部署

访问：https://service.13801380.site

**应该看到:**
- ✅ 陪诊服务介绍页面
- ✅ HTTPS 安全连接（绿色锁图标）
- ✅ 联系方式和价格表

---

## 🎯 域名注册商 DNS 设置位置

### 阿里云（万网）
1. 登录阿里云控制台
2. 产品与服务 → 域名与网站 → 域名
3. 找到 13801380.site → 管理
4. 左侧菜单：DNS 修改 → 添加记录

### GoDaddy
1. 登录 GoDaddy
2. My Products → Domains
3. 找到 13801380.site → DNS
4. 点击 "Add" → 选择 CNAME

### Namecheap
1. 登录 Namecheap
2. Domain List → 13801380.site → Manage
3. Advanced DNS 标签
4. 点击 "Add New Record" → 选择 CNAME

### Cloudflare
1. 登录 Cloudflare
2. 选择 13801380.site
3. DNS → Records
4. 点击 "Add record" → 选择 CNAME

### 腾讯云（DNSPod）
1. 登录腾讯云控制台
2. 域名注册 → 我的域名
3. 找到 13801380.site → 解析
4. 添加记录 → 选择 CNAME

---

## ⚠️ 常见问题

### Q1: 添加域名后显示"DNS 记录未找到"
**解决:** 等待 DNS 生效，或检查 DNS 记录是否正确

### Q2: SSL 证书显示"正在签发"
**解决:** 正常现象，DNS 生效后会自动签发（通常几分钟到几小时）

### Q3: 访问子域名显示 404
**解决:** 检查 Vercel 是否正确配置了 `/concierge` 目录

---

## 🔄 Vercel 自动部署配置

### 检查部署设置
1. 访问：https://vercel.com/baroqueliu6-devs-projects/tattoo-site/settings/git
2. 确认 **"Production Branch"** 设置为 `main`
3. 确认 **"Root Directory"** 是默认值（不是子目录）

### 如果 `/concierge` 没有自动部署
需要在 Vercel 配置重定向规则：

**vercel.json** (添加到项目根目录):
```json
{
  "rewrites": [
    {
      "source": "/service/(.*)",
      "destination": "/concierge/$1"
    }
  ]
}
```

---

## 📊 验证清单

部署完成后，检查以下项目：

- [ ] 访问 https://service.13801380.site 能正常打开
- [ ] 页面显示陪诊服务介绍
- [ ] HTTPS 证书有效（浏览器地址栏有锁图标）
- [ ] 邮件链接 `mailto:baroqueliu6@gmail.com` 能正常工作
- [ ] 页面在手机和电脑上都能正常显示
- [ ] Vercel 控制台域名状态显示"Valid Configuration"

---

## 🚀 下一步

配置完成后：

1. **测试页面** - 自己先完整浏览一遍
2. **准备推广文案** - Reddit、微信群等渠道
3. **开始推广** - 发布到各个平台
4. **追踪效果** - 记录咨询数量和成交情况

---

**重要提示:**
- 代码已推送到 GitHub，Vercel 会自动部署
- 子域名配置需要手动在 Vercel 控制台操作
- DNS 配置需要在域名注册商处操作
- 所有配置完成后，等待生效即可

---

**当前状态:** ⏳ 等待 Vercel 和 DNS 配置
