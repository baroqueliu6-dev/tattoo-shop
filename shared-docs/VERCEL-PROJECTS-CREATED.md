# Vercel 项目创建成功

**创建日期:** 2026-03-19  
**创建人:** 巴洛克

---

## ✅ 已创建的项目

### 1. tattoo-site（纹身设计网站）
- **Vercel 项目:** `tattoo-site`
- **URL:** https://tattoo-site-steel.vercel.app
- **GitHub 仓库:** `baroqueliu6-dev/tattoo-shop`
- **分支:** `main`
- **用途:** 纹身设计产品展示和销售
- **状态:** ✅ 已部署

### 2. service-site（陪诊服务网站）
- **Vercel 项目:** `service-site`
- **URL:** https://service-site-gamma.vercel.app
- **GitHub 仓库:** `baroqueliu6-dev/tattoo-shop`
- **分支:** `main`
- **用途:** 北京陪诊服务展示和预约
- **状态:** ✅ 已部署

---

## 🌐 域名配置计划

### tattoo-site（纹身设计）
| 域名 | 用途 | 状态 |
|------|------|------|
| `tattoo.13801380.site` | 主域名 | ⏳ 待配置 |

### service-site（陪诊服务）
| 域名 | 用途 | 状态 |
|------|------|------|
| `13801380.site` | 主域名 | ⏳ 待配置 |
| `www.13801380.site` | 备用域名 | ⏳ 待配置 |

---

## 📋 下一步操作

### 1. 配置域名（在 Vercel 项目设置中）

#### tattoo-site
1. 访问：https://vercel.com/baroqueliu6-devs-projects/tattoo-site/settings/domains
2. 添加域名：`tattoo.13801380.site`
3. 配置 DNS：CNAME → `cname.vercel-dns.com`

#### service-site
1. 访问：https://vercel.com/baroqueliu6-devs-projects/service-site/settings/domains
2. 添加域名：`13801380.site` 和 `www.13801380.site`
3. 配置 DNS：
   - A 记录：@ → `76.76.21.21`
   - CNAME: www → `cname.vercel-dns.com`

### 2. 验证访问
- 访问 https://tattoo.13801380.site 确认纹身网站
- 访问 https://13801380.site 确认陪诊网站

---

## 🔑 重要信息

### 项目分离原则
- **tattoo-site** = 纹身设计（副业）
- **service-site** = 陪诊服务（主业）
- **共享同一个 GitHub 仓库** - `tattoo-shop`
- **通过不同目录或分支管理内容**

### 目录结构建议
```
tattoo-shop/
├── index.html          # 陪诊服务主页（用于 service-site）
├── tattoo/             # 纹身设计页面（用于 tattoo-site）
│   └── index.html
├── products/           # 纹身产品
└── concierge/          # 陪诊服务资源
```

---

## ⚠️ 注意事项

1. **域名配置** - 每个项目需要单独配置域名
2. **DNS 生效** - 配置后等待 5-30 分钟生效
3. **SSL 证书** - 域名配置后自动签发
4. **部署同步** - 推送到 main 分支后两个项目都会自动部署

---

## 📞 项目链接

### tattoo-site
- Vercel Dashboard: https://vercel.com/baroqueliu6-devs-projects/tattoo-site
- 预览域名：https://tattoo-site-steel.vercel.app

### service-site
- Vercel Dashboard: https://vercel.com/baroqueliu6-devs-projects/service-site
- 预览域名：https://service-site-gamma.vercel.app

---

**创建完成时间:** 2026-03-19 22:30  
**下次检查:** 配置域名后验证访问
