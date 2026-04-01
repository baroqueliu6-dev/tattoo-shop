# 法律合规修改清单

**修改日期:** 2026-03-30  
**修改目的:** 避免法律风险和夸大宣传

---

## 修改原则

1. **避免资质声明** - 不说"medical professionals"，说"bilingual staff"
2. **避免具体数字** - 不说"hundreds of"，说"many"或直接删除
3. **避免绝对承诺** - 不说"2 小时响应"，说"2 小时内（视网络情况）"
4. **删除免费表述** - 所有"免费"改为付费或中性表述
5. **删除具体年份** - 不说"Founded in 2026"

---

## 修改文件清单

### 1. contact-form.html（新建）

**创建新文件:** `contact-form.html`

**内容:** 联系表单页面，实现"填表→付费→显示联系方式"流程

**关键功能:**
- 用户填写姓名、邮箱、联系方式、医疗需求
- 表单提交后引导至支付页面（$20 咨询费）
- 使用 Formspree 服务转发到邮箱（需配置）

---

### 2. index.html

#### 修改 1: 联系方式展示
**位置:** Contact Section

**修改前:**
```html
<p>WeChat: louisleo99 | Email: hello@13801380.site</p>
```

**修改后:**
```html
<a href="contact-form.html" class="btn btn-primary">Contact Us →</a>
<p style="font-size: 0.9rem; color: #666; margin-top: 1rem;">
  Fill in your information → Pay $20 consultation fee → Get our contact details
</p>
```

#### 修改 2: 响应时间描述
**位置:** Contact Section

**修改前:** `Within 2 hours (24/7 for emergencies)`

**修改后:** `Within 2 hours (subject to network conditions)`

#### 修改 3: 删除具体数字声明
**位置:** Trust Badges

**修改前:**
- ✓ 500+ Patients Served
- ✓ 30+ Countries
- ✓ 2-Hour Response

**修改后:**
- ✓ Patients Served
- ✓ Multiple Countries
- ✓ Fast Response

#### 修改 4: Social Proof 数字删除
**位置:** Enhanced Social Proof

**修改前:** `Trusted by 500+ international patients from 30+ countries`

**修改后:** `Trusted by international patients from multiple countries`

#### 修改 5: Trust Bar 数字删除
**位置:** Trust Bar Section

**修改前:** `Trusted by 500+ International Patients from 30+ Countries`

**修改后:** `Trusted by International Patients from Multiple Countries`

#### 修改 6: Patient Card 数字删除
**位置:** Who We Serve Best Section

**修改前:** `we've helped 500+ patients from 30+ countries`

**修改后:** `we've helped international patients from multiple countries`

#### 修改 7: FAQ 语言描述
**位置:** FAQ Section

**修改前:** `Our team speaks fluent English`

**修改后:** `Our team will communicate in English`

---

### 3. about.html

#### 修改 1: 删除成立年份
**位置:** Our Story Section

**修改前:** `Founded in 2026, Beijing Medical Concierge was created to...`

**修改后:** `Beijing Medical Concierge was created to...`

#### 修改 2: 团队资质描述
**位置:** Our Story Section

**修改前:** `Our team consists of bilingual medical professionals`

**修改后:** `Our team consists of bilingual staff`

#### 修改 3: 患者数量描述
**位置:** Our Story Section

**修改前:** `After helping hundreds of international patients`

**修改后:** `After helping international patients`

#### 修改 4: 翻译服务描述
**位置:** Our Mission Section

**修改前:** `Break language barriers with professional translation`

**修改后:** `Break language barriers with dedicated translation`

#### 修改 5: 价值观描述
**位置:** Our Values Section

**修改前:** `Professional Excellence - Medical-grade translation and support`

**修改后:** `Professional Excellence - Dedicated translation and support`

#### 修改 6: 支持范围描述
**位置:** Our Values Section

**修改前:** `Continuous Support - From first contact to follow-up care`

**修改后:** `Continuous Support - From first contact until you return home and beyond for medical affairs`

#### 修改 7: 团队语言描述
**位置:** Our Team Section

**修改前:** `Our core team is fluent in both English and Mandarin`

**修改后:** `Our team will communicate in both English and Mandarin`

#### 修改 8: 响应时间描述
**位置:** Our Team Section

**修改前:** `Within 2 hours (local Beijing support)`

**修改后:** `Within 2 hours (subject to network conditions)`

#### 修改 9: 删除"免费"表述
**位置:** CTA Section

**修改前:** 
```
Schedule a free consultation to discuss your medical needs in Beijing.
Get Free Consultation →
```

**修改后:**
```
Schedule a consultation to discuss your medical needs in Beijing.
Get Consultation ($20) →
```

---

### 4. patient-guide.html

#### 修改: 删除"免费"表述
**位置:** CTA Section

**修改前:** `Get Free Assessment →`

**修改后:** `Get Assessment ($20) →`

---

### 5. faq.html

#### 修改 1: 流程描述
**位置:** FAQ - Process Question

**修改前:** `1. Free initial consultation → 2. Medical assessment → ...`

**修改后:** `1. Initial consultation ($20) → 2. Medical assessment → ...`

#### 修改 2: 语言描述
**位置:** FAQ - Languages Question

**修改前:** `Our core team is fluent in English and Mandarin.`

**修改后:** `Our core team will communicate in English and Mandarin.`

---

## 验证结果

✅ 所有修改已完成  
✅ 文案流畅、准确  
✅ 避免了法律风险的表述  
✅ 删除了所有"免费"表述  
✅ 删除了具体数字和年份声明  
✅ 避免了资质声明  

---

## 下一步

1. **配置 Formspree:** 
   - 注册 https://formspree.io
   - 创建表单 endpoint
   - 更新 `contact-form.html` 中的 `action` 属性

2. **本地测试:**
   - 打开 `index.html` 测试联系表单跳转
   - 检查所有修改页面的显示效果
   - 验证链接正确性

3. **不要推送** - 完成后本地测试即可

---

## 修改总结

| 文件 | 修改项数 | 主要改动 |
|------|----------|----------|
| contact-form.html | 新建 | 联系表单页面 |
| index.html | 7 处 | 联系方式流程、数字删除、响应时间 |
| about.html | 9 处 | 年份删除、资质声明、免费表述 |
| patient-guide.html | 1 处 | 免费表述 |
| faq.html | 2 处 | 免费表述、语言描述 |
| **总计** | **19 处 + 1 新建** | **法律合规优化** |

---

**修改完成时间:** 2026-03-30 16:49 GMT+8  
**执行人:** 巴洛克 (运营官)
