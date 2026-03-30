# 域名 DNS 配置说明

**域名:** 13801380.site  
**问题:** 浏览器显示"不安全"  
**原因:** DNS 记录未正确配置  
**日期:** 2026-03-19

---

## 🔍 问题诊断

### 当前状态
- ✅ SSL 证书已签发（两个域名都有有效证书）
- ✅ Vercel 项目已配置
- ❌ DNS 记录未正确指向 Vercel

### Vercel 显示的域名
1. `www.13801380.site` - DNS Change Recommended ⚠️
2. `tattoo-site-psi.vercel.app` - Valid Configuration ✅
3. `13801380.site` - 未添加 ❌

---

## 🛠️ 解决方案

### 需要添加的 DNS 记录

登录你的**域名注册商**（在哪里买的域名），添加以下 DNS 记录：

#### 记录 1: A 记录（主域名）
```
类型：A
名称/主机：@
值/目标：76.76.21.21
TTL: 自动
```

#### 记录 2: CNAME 记录（www 子域名）
```
类型：CNAME
名称/主机：www
值/目标：cname.vercel-dns.com
TTL: 自动
```

---

## 📝 常见域名注册商的 DNS 设置位置

### 阿里云（万网）
1. 登录阿里云控制台
2. 产品与服务 → 域名与网站 → 域名
3. 找到 13801380.site → 管理
4. 左侧菜单：DNS 修改

### GoDaddy
1. 登录 GoDaddy
2. My Products → Domains
3. 找到 13801380.site → DNS
4. 添加 A 记录和 CNAME 记录

### Namecheap
1. 登录 Namecheap
2. Domain List → 13801380.site → Manage
3. Advanced DNS 标签
4. 添加新记录

### Cloudflare
1. 登录 Cloudflare
2. 选择 13801380.site
3. DNS → Records
4. 添加记录

### 腾讯云（DNSPod）
1. 登录腾讯云控制台
2. 域名注册 → 我的域名
3. 找到 13801380.site → 解析
4. 添加记录

---

## ⏱️ 生效时间

- **DNS 更改后:** 通常 5-30 分钟开始生效
- **完全生效:** 最多 48 小时
- **SSL 证书:** DNS 生效后自动签发（几分钟到几小时）

---

## ✅ 验证方法

### 方法 1: 在线 DNS 检查
访问：https://dnschecker.org/
输入：13801380.site
检查：A 记录是否指向 76.76.21.21

### 方法 2: 命令行检查
```bash
# Windows
nslookup 13801380.site

# Mac/Linux
dig 13801380.site
```

应该看到：
```
Name: 13801380.site
Address: 76.76.21.21
```

### 方法 3: Vercel 控制台
1. 访问 https://vercel.com/baroqueliu6-devs-projects/tattoo-site/settings/domains
2. 查看域名状态是否变成绿色"Valid Configuration"

---

## 🚨 注意事项

1. **删除冲突记录**
   - 如果已有 A 记录指向其他 IP，先删除
   - 如果已有 CNAME 记录，先删除

2. **不要修改 Nameservers**
   - 除非你想完全用 Vercel 管理 DNS
   - 目前只需添加 DNS 记录，不需要改 Nameservers

3. **清除浏览器缓存**
   - DNS 生效后，用 Cmd+Shift+R 强制刷新
   - 或者清除浏览器缓存

---

## 📞 需要帮助？

如果不确定域名在哪里注册的，可以：
1. 检查邮箱 - 找域名购买确认邮件
2. 检查银行卡 - 找域名续费扣款记录
3. 用 WHOIS 查询 - https://whois.domaintools.com/13801380.site

---

## 🔄 下一步

1. **找到域名注册商** - 问刘宇在哪里买的域名
2. **登录并修改 DNS** - 添加 A 记录和 CNAME 记录
3. **等待生效** - 24-48 小时
4. **验证** - 访问 https://13801380.site 检查是否还有"不安全"提示

---

**重要提示:** 
- 修改 DNS 后，Vercel 会自动检测并更新状态
- SSL 证书会自动续签，不需要手动操作
- 如果 48 小时后还有问题，联系 Vercel 支持
