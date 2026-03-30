# 项目文件结构说明

**更新日期:** 2026-03-30  
**备份位置:** `~/.openclaw/workspace/tattoo-shop-backup-20260330-104821/`

---

## 📁 目录结构

```
tattoo-shop/
├── .git/                      # Git 版本控制
├── tattoo/                    # 纹身项目（独立网站）
│   ├── index.html             # 纹身网站首页
│   ├── css/                   # 纹身项目样式
│   ├── js/                    # 纹身项目脚本
│   ├── images/                # 纹身项目图片
│   ├── products/              # 纹身产品设计文件（SVG/PNG）
│   └── docs/                  # 纹身项目文档
│       ├── GUMROAD-SETUP.md
│       ├── MARKETING-PLAN.md
│       ├── SOCIAL-MEDIA-POSTS.md
│       ├── TATTOO-FORUMS.md
│       └── product-template.md
│
├── medical-concierge/         # 陪诊项目（独立网站）
│   ├── concierge/             # 陪诊网站代码
│   │   ├── index.html         # 陪诊网站首页
│   │   ├── css/               # 陪诊项目样式
│   │   ├── js/                # 陪诊项目脚本
│   │   ├── questionnaire-phase1.html
│   │   ├── payment.html
│   │   ├── patient-stories.html
│   │   └── ... (其他页面)
│   ├── docs/                  # 陪诊项目文档
│   │   ├── CONCIERGE-*.md     # 陪诊配置和部署文档
│   │   ├── PATIENT-STORIES-GUIDE.md
│   │   ├── COPYWRITING-SOCIAL-MEDIA.md
│   │   ├── 北京拔智齿医院对比.md
│   │   └── ... (其他文档)
│   └── research/              # 陪诊市场调研
│
└── shared-docs/               # 共享文档（两个项目通用）
    ├── ACCOUNTS.md            # 账号信息
    ├── DNS-CONFIG.md          # DNS 配置
    ├── VERCEL-*.md            # Vercel 部署文档
    ├── PROJECT-*.md           # 项目规划文档
    ├── WORKFLOW.md            # 工作流程
    ├── BLOG-POST-1.md         # 博客文章
    ├── CHAT-SUMMARY.md        # 聊天总结
    ├── CLEANUP-REPORT.md      # 清理报告
    ├── FILE-STRUCTURE.md      # 文件结构（本文档）
    ├── LEARNING-ROADMAP.md    # 学习路线
    ├── LESSONS-LEARNED.md     # 经验教训
    ├── NAMING-CONVENTION.md   # 命名规范
    ├── SSL-CHECK.md           # SSL 检查
    ├── SUBDOMAIN-ADDED.md     # 子域名配置
    ├── TODAY-PLAN.md          # 每日计划
    ├── UI-UX-FIX-REPORT.md    # UI/UX 修复报告
    ├── deploy.sh              # 部署脚本
    ├── index-tattoo-backup.html  # 纹身网站备份
    ├── license.html           # 许可证
    ├── privacy.html           # 隐私政策
    ├── terms.html             # 服务条款
    └── marketing-strategy.md  # 营销策略
```

---

## 🎯 项目分离说明

### 纹身项目 (tattoo/)
- **域名:** tattoo.13801380.site
- **Vercel 项目:** tattoo-site
- **Root Directory:** `/` (仓库根目录)
- **用途:** 销售中文字纹身设计（数字产品）
- **支付:** Gumroad

### 陪诊项目 (medical-concierge/concierge/)
- **域名:** 13801380.site
- **Vercel 项目:** service-site
- **Root Directory:** `medical-concierge/concierge/`
- **用途:** 北京外籍人士医疗陪诊服务
- **支付:** PayPal（待配置）

---

## 📝 文档分类规则

### 纹身项目文档 (tattoo/docs/)
- Gumroad 配置
- 纹身市场推广
- 社交媒体内容
- 纹身论坛列表
- 产品设计模板

### 陪诊项目文档 (medical-concierge/docs/)
- 陪诊服务配置
- 部署文档
- 患者故事指南
- 文案和社交媒体
- 医院对比调研
- 北京医疗市场调研

### 共享文档 (shared-docs/)
- 账号信息
- DNS 和域名配置
- Vercel 部署
- 项目规划
- 工作流程
- 法律文件（隐私政策、服务条款等）
- 备份文件

---

## 🔄 部署流程

### 纹身项目
```bash
cd tattoo-shop/tattoo
# Vercel 自动部署（Git push 触发）
# Root Directory: /
```

### 陪诊项目
```bash
cd tattoo-shop/medical-concierge/concierge
# Vercel 自动部署（Git push 触发）
# Root Directory: medical-concierge/concierge/
```

---

## ⚠️ 重要提示

1. **不要删除 .git/ 目录** - 包含所有版本历史
2. **备份优先** - 重大修改前先备份
3. **Git 提交** - 修改后及时提交并推送
4. **Vercel 配置** - 确保两个项目的 Root Directory 正确

---

## 📦 备份管理

备份位置：`~/.openclaw/workspace/tattoo-shop-backup-YYYYMMDD-HHMMSS/`

备份策略：
- 重大修改前自动备份
- 每周手动备份一次
- 保留最近 3 个备份版本

清理旧备份：
```bash
# 删除超过 30 天的备份
find ~/.openclaw/workspace -name "tattoo-shop-backup-*" -mtime +30 -exec rm -rf {} \;
```

---

**最后更新:** 2026-03-30  
**维护人:** 巴洛克 👻
