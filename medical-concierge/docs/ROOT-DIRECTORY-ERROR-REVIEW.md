# Vercel Root Directory 配置错误复盘

**发生时间:** 2026-03-20（首次错误） → 2026-03-27（第二次错误）  
**发现时间:** 2026-03-27 11:30  
**修复人:** 巴洛克  
**状态:** ✅ 已修复

---

## 📋 错误描述

**错误配置:** `Root Directory: concierge`  
**正确配置:** `Root Directory: medical-concierge/concierge`

**后果:**
- Vercel 部署失败，报错：`The specified Root Directory "concierge" does not exist`
- 陪诊网站无法更新，一直是旧版本
- 用户测试表单时仍然跳转到 Formspree 错误页面

---

## 🔍 错误根源

### 第一次错误（2026-03-20）
**创建文档时就写错了**

涉及的文档：
- `FILE-STRUCTURE.md` - 写成 `Root Directory: concierge`
- `CONCIERGE-CONFIG.md` - 写成 `Root Directory: concierge`
- `MEMORY.md` - 写成 `Root Directory: concierge`

**原因分析:**
1. **没有实际验证** - 写完文档后没有立即去 Vercel 配置并测试
2. **路径理解错误** - 误以为 Vercel 的 Root Directory 是相对于某个子目录，而不是相对于仓库根目录
3. **想当然** - 看到本地路径是 `medical-concierge/concierge/`，但以为 Vercel 只需要最后一段

### 第二次错误（2026-03-27）
**修复时仍然用错误的配置**

**原因分析:**
1. **文档污染** - 多个文档都记录了错误配置，互相"印证"错误
2. **没有质疑** - 看到文档都写 `concierge`，没有质疑是否正确
3. **记忆搜索失效** - 搜索记忆时找到了错误信息，没有验证

---

## ✅ 修复行动

### 立即修复
1. ✅ Vercel 控制台修改 Root Directory 为 `medical-concierge/concierge`
2. ✅ 更新 `FILE-STRUCTURE.md`
3. ✅ 更新 `CONCIERGE-CONFIG.md`
4. ✅ 更新 `MEMORY.md`
5. ✅ 更新 `TOOLS.md`

### 长期预防
1. **文档即代码原则** - 所有配置写进文档后，必须立即验证
2. **截图证明** - 关键配置要截图保存到文档中
3. **检查清单** - 创建 Vercel 部署检查清单
4. **定期审查** - 每月审查一次配置文档

---

## 📝 教训总结

### 1. 文档不能代替验证
> **"文档写的不等于对的，只有实际能跑的才是对的"**

- 写完配置文档 → 立即去控制台配置 → 立即测试 → 截图证明
- 不要相信"应该这样"，要相信"实际这样"

### 2. 路径配置要完整
> **"相对路径要写完整，不要省略父目录"**

- Vercel Root Directory 是相对于仓库根目录的
- 本地路径 `a/b/c/` → Vercel Root Directory 就是 `a/b/c`
- 不要只写最后一段 `c`

### 3. 记忆会污染
> **"错误信息会被复制到多个地方，互相印证错误"**

- 第一次写错 → 复制到 MEMORY.md → 复制到 TOOLS.md → 所有人都信了
- 修复时要搜索所有相关文件，不能只改一个

### 4. 2 次原则触发
> **"同一错误出现 2 次，必须深度复盘"**

- 第 1 次：2026-03-20 创建文档时
- 第 2 次：2026-03-27 修复时
- 现在触发深度复盘，写入文档

---

## 📋 检查清单（未来使用）

### Vercel Root Directory 配置检查
- [ ] 确认本地代码实际路径（从仓库根目录开始）
- [ ] Root Directory 填写完整路径（不是最后一段）
- [ ] 保存配置
- [ ] 触发部署
- [ ] 等待部署完成
- [ ] 访问预览域名验证
- [ ] 截图保存到文档

### 文档更新检查
- [ ] 更新所有相关文档（FILE-STRUCTURE.md, CONCIERGE-CONFIG.md, MEMORY.md, TOOLS.md）
- [ ] 添加⚠️警告标记
- [ ] 说明常见错误
- [ ] 添加截图证明

---

## 🔗 相关文件

- `FILE-STRUCTURE.md` - 项目文件结构
- `CONCIERGE-CONFIG.md` - 陪诊项目配置
- `MEMORY.md` - 长期记忆
- `TOOLS.md` - 本地工具配置

---

**复盘完成时间:** 2026-03-27 11:35  
**复盘人:** 巴洛克 👻

---

*记住：文档写的不等于对的，只有实际能跑的才是对的！*
