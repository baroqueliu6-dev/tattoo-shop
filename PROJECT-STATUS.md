# 纹身店网站项目状态

**最后更新:** 2026-03-18  
**负责人:** 巴洛克（网络端）、刘宇（现实端）

---

## 🎯 当前目标

**短期（本周）:** 完成网站基础功能，准备上线测试

**中期（本月）:** 接入支付系统，开始测试销售

**长期:** 稳定运营，月销 10+ 单

---

## 📋 下一步行动

### 技术类
| 任务 | 负责人 | 状态 | 截止 | 备注 |
|------|--------|------|------|------|
| 清理不必要的文件 | 巴洛克 | ⏳ 待办 | 今天 | 删除测试/临时文件 |
| 检查图片文件完整性 | 巴洛克 | ⏳ 待办 | 今天 | 确认所有产品图片存在 |
| 测试支付流程 | 刘宇 | ⏳ 待办 | 本周 | PayPal 配置 |
| 域名 DNS 检查 | 刘宇 | ⏳ 待办 | 本周 | 确认 DNS 指向 Vercel |

### 营销推广类 📢
| 任务 | 负责人 | 状态 | 截止 | 备注 |
|------|--------|------|------|------|
| 创建 Instagram 账号 | 刘宇 | ⏳ 待办 | 今天 | @orientalsymbols_tattoo |
| 创建 Pinterest 账号 | 刘宇 | ⏳ 待办 | 今天 | Oriental Symbols Tattoo |
| 发布第一篇博客 | 巴洛克 | ✅ 完成 | 今天 | 已写好，待发布到网站/Medium |
| 准备 10 个帖子素材 | 巴洛克 | ✅ 完成 | 今天 | 文案已写好，需配图发布 |
| 加入 Reddit 板块 | 刘宇 | ⏳ 待办 | 本周 | r/tattoos, r/ChineseLanguage 等 |
| 联系 5 个纹身师 | 刘宇 | ⏳ 待办 | 下周 | 免费设计换推广 |

---

## 🔑 关键信息（别再靠脑子记！）

### 仓库
- **GitHub:** `baroqueliu6-dev/tattoo-shop`
- **本地路径:** `~/.openclaw/workspace/tattoo-shop/`

### 部署
- **平台:** Vercel
- **项目:** `tatoo-shop-2024`
- **域名:** `13801380.site` → Vercel → `tatoo-shop-2024.vercel.app`

### 访问
- **生产环境:** https://13801380.site
- **Vercel 预览:** https://tatoo-shop-2024.vercel.app
- **GitHub:** https://github.com/baroqueliu6-dev/tattoo-shop
- **Vercel 控制台:** https://vercel.com/baroqueliu6-devs-projects/tatoo-shop-2024

---

## ✅ 已完成

- [x] 网站基础页面完成
- [x] 6 个产品设计完成（Love, Joy, Cool, Good, Beauty, History）
- [x] 域名绑定 Vercel
- [x] GitHub → Vercel 自动部署配置完成
- [x] 全站英文化完成

---

## 📝 工作流程规则（从今天开始执行）

### 1. 操作前确认（3 问）
- 目标是什么？
- 当前状态是什么？
- 操作后怎么验证？

### 2. 关键节点同步
任何以下操作后，必须同步结果：
- 代码推送后
- 部署完成后
- 配置修改后
- 域名/DNS 修改后

### 3. 验证清单
部署后必须检查：
- [ ] 访问生产域名，确认内容正确
- [ ] 检查 Vercel 部署状态（Ready/Failed）
- [ ] 强制刷新（Cmd+Shift+R）排除缓存

### 4. 记录决策
重要决定写在这里，避免反复讨论：
- 2026-03-18: 选择 Vercel 而非 GitHub Pages（自动部署、CDN 快）
- 2026-03-18: 域名从 `tattoo-site` 移到 `tatoo-shop-2024`

---

## 🚨 常见问题排查

**网站没更新？**
1. 检查 GitHub 最新 commit
2. 检查 Vercel 部署状态
3. 强制刷新浏览器（Cmd+Shift+R）
4. 等 2 分钟 CDN 缓存

**推送失败？**
1. 检查网络连接
2. 确认在正确目录 `~/.openclaw/workspace/tattoo-shop/`
3. 2 次失败后换人操作

**Vercel 没自动部署？**
1. 检查 GitHub webhook 配置
2. 手动触发部署（Vercel 控制台）

---

**记住:** 文字 > 脑子。所有关键信息写在这里，别靠记忆！
