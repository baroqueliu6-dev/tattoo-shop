# 陪诊项目配置记录

**创建日期:** 2026-03-20  
**创建人:** 巴洛克  
**状态:** ⏳ 待完成

---

## 📋 项目架构

| 项目 | Vercel 项目 | 域名 | 代码目录 | GitHub 仓库 |
|------|------------|------|----------|-------------|
| 纹身设计 | `tattoo-site` | `tattoo.13801380.site` | 根目录 `/` | `baroqueliu6-dev/tattoo-shop` |
| 陪诊服务 | `service-site` | `13801380.site` | 子目录 `/concierge` | `baroqueliu6-dev/tattoo-shop` |

---

## 🔑 关键配置

### service-site（陪诊服务）
- **Vercel 项目 URL:** https://vercel.com/baroqueliu6-devs-projects/service-site
- **预览域名:** https://service-site-gamma.vercel.app
- **Root Directory:** 需要设置为 `concierge`
- **部署分支:** `main`

### tattoo-site（纹身设计）
- **Vercel 项目 URL:** https://vercel.com/baroqueliu6-devs-projects/tattoo-site
- **预览域名:** https://tattoo-site-steel.vercel.app
- **Root Directory:** 默认（根目录）
- **部署分支:** `main`

---

## 📁 代码文件位置

### 陪诊服务
- **主页面:** `/concierge/index.html`
- **Commit:** `fc380f7` (Add Beijing Medical Concierge service page)
- **状态:** ✅ 已恢复到本地

### 纹身设计
- **主页面:** `/index.html` (根目录)
- **状态:** ✅ 正常

---

## 🎯 待完成操作

### 1. Vercel 配置（service-site）
1. 访问：https://vercel.com/baroqueliu6-devs-projects/service-site/settings/general
2. 找到 **Root Directory** 设置
3. 设置为：`concierge`
4. 保存 → 自动重新部署

### 2. 域名配置（service-site）
1. 访问：https://vercel.com/baroqueliu6-devs-projects/service-site/settings/domains
2. 添加域名：`13801380.site` 和 `www.13801380.site`
3. 配置 DNS：
   - A 记录：@ → `76.76.21.21`
   - CNAME: www → `cname.vercel-dns.com`

### 3. 域名配置（tattoo-site）
1. 访问：https://vercel.com/baroqueliu6-devs-projects/tattoo-site/settings/domains
2. 添加域名：`tattoo.13801380.site`
3. 配置 DNS：CNAME → `cname.vercel-dns.com`

### 4. GitHub 推送
```bash
cd ~/.openclaw/workspace/tattoo-shop
git add .
git commit -m "Restore concierge files and finalize project structure"
git push origin main
```

---

## ⚠️ 注意事项

1. **Root Directory 设置** - service-site 必须设置为 `concierge` 才能正确部署
2. **域名生效时间** - DNS 配置后等待 5-30 分钟
3. **SSL 证书** - 域名配置后自动签发
4. **网络问题** - GitHub 推送可能超时，需要重试

---

## 📊 验证清单

部署完成后检查：

- [ ] https://service-site-gamma.vercel.app 显示陪诊页面
- [ ] https://13801380.site 显示陪诊页面（域名配置后）
- [ ] https://tattoo-site-steel.vercel.app 显示纹身页面
- [ ] https://tattoo.13801380.site 显示纹身页面（域名配置后）
- [ ] GitHub 推送成功
- [ ] Vercel 自动部署完成

---

## 🔗 相关链接

### Vercel 控制台
- service-site: https://vercel.com/baroqueliu6-devs-projects/service-site
- tattoo-site: https://vercel.com/baroqueliu6-devs-projects/tattoo-site

### GitHub 仓库
- https://github.com/baroqueliu6-dev/tattoo-shop

### 域名管理
- 域名注册商控制台（配置 DNS）

---

## 📝 历史 Commit 参考

关键 Commits：
- `fc380f7` - Add Beijing Medical Concierge service page
- `cc48c16` - Redesign medical concierge homepage with professional UI
- `8d7274e` - Move concierge to main domain, prepare tattoo for subdomain
- `9b7639c` - Restore tattoo design homepage (当前 HEAD)

---

**最后更新:** 2026-03-20 08:00
