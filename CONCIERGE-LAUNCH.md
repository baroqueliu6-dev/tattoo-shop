# 陪诊服务实施清单

**创建日期:** 2026-03-19  
**状态:** 进行中

---

## ✅ 已完成

### 第 1 步：创建服务介绍页面
- **文件:** `/concierge/index.html`
- **内容:** 完整的英文服务介绍
- **包含:**
  - 服务说明
  - 价格表
  - 联系方式
  - 工作流程
  - 为什么选择我们

---

## ⏳ 待完成

### 第 2 步：推送代码到 GitHub
```bash
cd ~/.openclaw/workspace/tattoo-shop
git add -A
git commit -m "Add Beijing Medical Concierge service page"
git push
```

### 第 3 步：在 Vercel 添加子域名
1. 访问：https://vercel.com/baroqueliu6-devs-projects/tattoo-site/settings/domains
2. 点击 "Add Domain"
3. 输入：`service.13801380.site`
4. 确认添加

### 第 4 步：配置 DNS 记录
在域名注册商添加 CNAME 记录：
```
类型：CNAME
名称：service
值：cname.vercel-dns.com
TTL: 自动
```

### 第 5 步：验证部署
- 访问：https://service.13801380.site
- 检查页面是否正常显示
- 测试联系链接

### 第 6 步：开始推广
**发布渠道:**
1. Reddit r/expats
2. Reddit r/beijing
3. Reddit r/China
4. InterNations Beijing
5. Beijing Expats 微信群
6. Facebook Beijing Expats 群组

**帖子内容:**
- 标题："Professional Medical Assistance for Expats in Beijing"
- 内容：服务介绍 + 网站链接
- 定价：首单 8 折优惠

---

## 📊 推广追踪

### 第 1 周目标
- [ ] 发布 5 个帖子
- [ ] 获得 3 个咨询
- [ ] 完成 1 个付费客户

### 第 1 个月目标
- [ ] 总收入 > 3000 元
- [ ] 客户满意度 100%
- [ ] 无纠纷

---

## 📝 重要提醒

1. **WhatsApp 号码** - 页面显示的是 +86 138 0138 0000，需要确认是否正确
2. **定价策略** - 首单 8 折吸引第一批客户
3. **免责声明** - 已添加，强调不是医疗服务机构
4. **保险** - 建议购买责任保险（月收入>3000 元后）

---

**下一步:** 等刘宇确认 WhatsApp 号码后，推送代码并配置 DNS
