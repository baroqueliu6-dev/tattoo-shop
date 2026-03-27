# 项目文件结构说明

**更新日期:** 2026-03-20  
**目的:** 将刺青项目和陪诊项目的文件分开存放，便于管理

---

## 📁 目录结构

```
tattoo-shop/
├── tattoo/                     # 刺青项目文件
│   ├── index.html             # 刺青网站首页
│   ├── css/
│   │   └── style.css          # 刺青网站样式
│   ├── js/
│   │   └── main.js            # 刺青网站交互
│   ├── images/                # 刺青网站图片
│   └── products/              # 纹身产品设计文件
│       ├── love-character.png
│       ├── love-character.svg
│       ├── joy-character.png
│       └── ... (6 个产品设计)
│
├── medical-concierge/          # 陪诊项目文件
│   ├── concierge/
│   │   ├── index.html         # 陪诊网站首页
│   │   ├── css/
│   │   │   └── concierge-style.css
│   │   └── js/
│   │       └── concierge-main.js
│   ├── research/              # 陪诊市场研究
│   │   └── medical-concierge-cases-raw.md
│   └── CONCIERGE-*.md         # 陪诊项目文档
│
├── PROJECT-*.md               # 通用项目文档
├── WORKFLOW.md                # 工作流程
├── ACCOUNTS.md                # 账号信息
└── ... (其他通用文档)
```

---

## 🎯 项目对应关系

### 刺青项目 (Tattoo)
- **本地目录:** `tattoo-shop/tattoo/`
- **GitHub 仓库:** `baroqueliu6-dev/tattoo-shop`
- **Vercel 项目:** `tattoo-site`
- **域名:** `tattoo.13801380.site`
- **Root Directory:** 根目录 `/`

### 陪诊项目 (Medical Concierge)
- **本地目录:** `tattoo-shop/medical-concierge/concierge/`
- **GitHub 仓库:** `baroqueliu6-dev/tattoo-shop`
- **Vercel 项目:** `service-site`
- **域名:** `13801380.site`
- **Root Directory:** `medical-concierge/concierge` ⚠️ 完整路径，不是 `concierge`

---

## 📝 文件分类说明

### 刺青项目独有文件 → `tattoo/`
- `index.html` - 刺青网站首页
- `css/style.css` - 刺青网站样式
- `js/main.js` - 刺青网站交互脚本
- `images/` - 刺青网站图片资源
- `products/` - 纹身设计产品文件（PNG、SVG、PDF 等）

### 陪诊项目独有文件 → `medical-concierge/`
- `concierge/index.html` - 陪诊网站首页
- `concierge/css/concierge-style.css` - 陪诊网站样式
- `concierge/js/concierge-main.js` - 陪诊网站交互脚本
- `research/` - 市场调研、案例收集
- `CONCIERGE-*.md` - 陪诊项目相关文档

### 通用文档 → 根目录
- `PROJECT-*.md` - 项目状态、计划等
- `WORKFLOW.md` - 工作流程
- `ACCOUNTS.md` - 账号信息
- `DNS-CONFIG.md` - DNS 配置
- `VERCEL-*.md` - Vercel 配置文档
- `LESSONS-LEARNED.md` - 经验总结

---

## 🔄 部署说明

### 刺青项目部署
```bash
cd ~/.openclaw/workspace/tattoo-shop/tattoo
# 文件直接从 tattoo/ 目录部署到 Vercel
```

### 陪诊项目部署
```bash
cd ~/.openclaw/workspace/tattoo-shop/medical-concierge/concierge
# 文件从 medical-concierge/concierge/ 目录部署到 Vercel
```

### Git 推送
两个项目共享同一个 GitHub 仓库，推送到 `main` 分支后：
- Vercel 的 `tattoo-site` 项目从根目录部署
- Vercel 的 `service-site` 项目从 `concierge` 子目录部署

---

## ⚠️ 注意事项

1. **Vercel Root Directory 设置**
   - tattoo-site: 根目录 `/`
   - service-site: `medical-concierge/concierge`

2. **文件路径引用**
   - 刺青网站：`css/style.css`, `js/main.js`
   - 陪诊网站：`css/concierge-style.css`, `js/concierge-main.js`

3. **产品文件**
   - 纹身设计产品文件保留在 `tattoo/products/`
   - 陪诊服务没有实体产品

4. **研究文档**
   - 纹身市场调研：已完成的在根目录
   - 陪诊市场研究：在 `medical-concierge/research/`

---

**整理完成时间:** 2026-03-20 21:18  
**整理人:** 巴洛克
