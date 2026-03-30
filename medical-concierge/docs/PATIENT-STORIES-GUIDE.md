# 患者故事页面使用指南

**创建日期:** 2026-03-22  
**页面位置:** `medical-concierge/concierge/patient-stories.html`

---

## 📋 文件结构

```
medical-concierge/concierge/
├── index.html              # 主页面（已更新导航）
├── patient-stories.html    # 患者故事页面（新建）
├── css/
│   ├── concierge-style.css # 主样式
│   └── stories-style.css   # 故事页面样式（新建）
└── js/
    ├── concierge-main.js   # 主脚本
    └── stories-main.js     # 故事页面脚本（新建）
```

---

## 🎬 替换 YouTube 视频

当前页面使用的是占位符视频 ID。要替换成真实的 YouTube 视频：

### 步骤 1: 准备视频

你可以使用以下类型的视频：
- 医院环境介绍（30 秒 -2 分钟）
- 客户采访/感谢视频（1-3 分钟）
- 服务流程演示（2-5 分钟）
- 常见问题解答（3-10 分钟）

### 步骤 2: 上传到 YouTube

1. 登录 YouTube
2. 点击右上角相机图标 → "Upload video"
3. 上传你的视频文件
4. 填写标题、描述、标签
5. 设置可见性（建议设为"Unlisted"或"Public"）
6. 等待处理完成

### 步骤 3: 获取视频 ID

视频上传后，URL 格式为：
```
https://www.youtube.com/watch?v=VIDEO_ID
```

例如：`https://www.youtube.com/watch?v=dQw4w9WgXcQ`  
视频 ID 是：`dQw4w9WgXcQ`

### 步骤 4: 替换代码中的视频 ID

打开 `patient-stories.html`，找到第 124-160 行左右的视频部分：

```html
<!-- Video 1 -->
<div class="video-card">
    <div class="video-thumbnail">
        <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" ...></iframe>
        <div class="video-duration">5:32</div>
    </div>
    ...
</div>
```

将 `dQw4w9WgXcQ` 替换成你的视频 ID。

**需要替换 4 个视频的 ID：**
1. 医院介绍视频
2. 客户感谢视频
3. 服务流程视频
4. FAQ 视频

---

## 📸 添加真实案例图片

当前使用的是 emoji 占位符。要添加真实图片：

### 方法 1: 使用本地图片

1. 将图片放入 `images/` 文件夹
2. 替换代码中的占位符：

```html
<!-- 原来 -->
<div class="image-placeholder">🏥</div>

<!-- 替换为 -->
<img src="images/hospital-tour.jpg" alt="Hospital Tour" style="width: 100%; height: 100%; object-fit: cover;">
```

### 方法 2: 使用网络图片

```html
<img src="https://example.com/your-image.jpg" alt="Description" style="width: 100%; height: 100%; object-fit: cover;">
```

### 图片建议尺寸

- **轮播大图:** 800x600px 或 4:3 比例
- **故事卡片:** 400x300px 或 4:3 比例
- **视频缩略图:** 1280x720px 或 16:9 比例

---

## ✏️ 编辑案例内容

案例故事在 `js/stories-main.js` 文件中，从第 80 行开始。

### 编辑现有案例

找到对应的故事数据：

```javascript
story1: {
    title: 'Emergency Appendectomy at 3 AM',
    author: 'James M.',
    date: 'British Expat, 3 years in Beijing',
    hospital: 'PUMC Hospital',
    dateOfService: 'March 2025',
    content: `
        <p>这里是故事内容...</p>
    `
}
```

修改文字内容即可。

### 添加新案例

在 `stories` 对象中添加新的故事：

```javascript
story7: {
    title: '新案例标题',
    author: '作者名',
    date: '作者描述',
    hospital: '医院名称',
    dateOfService: '服务日期',
    content: `
        <p>故事内容...</p>
    `
}
```

然后在 HTML 中添加对应的卡片：

```html
<div class="story-card" data-category="类别">
    <div class="story-icon">图标</div>
    <h3>新案例标题</h3>
    <p class="story-short">简短描述</p>
    <div class="story-tags">
        <span class="tag">标签 1</span>
    </div>
    <button class="read-story-btn" data-story="story7">Read Story</button>
</div>
```

---

## 🎨 自定义样式

如果需要调整样式，编辑 `css/stories-style.css`。

### 常用自定义

**修改主色调：**
```css
:root {
    --primary-color: #667eea;  /* 改成你的品牌色 */
    --secondary-color: #764ba2;
}
```

**调整轮播速度：**
在 `js/stories-main.js` 第 56 行：
```javascript
}, 5000);  // 改成你想要的毫秒数（3000 = 3 秒）
```

**修改筛选类别：**
在 HTML 第 23-28 行，添加或修改按钮：
```html
<button class="filter-btn" data-filter="新类别">新类别名称</button>
```

---

## 📱 移动端适配

页面已完全响应式，会自动适配手机和平板。

测试方法：
1. 在浏览器中打开页面
2. 按 F12 打开开发者工具
3. 点击设备切换图标
4. 选择不同设备查看效果

---

## 🚀 部署上线

### 本地测试

```bash
cd ~/.openclaw/workspace/tattoo-shop/medical-concierge/concierge
python3 -m http.server 8000
# 访问 http://localhost:8000/patient-stories.html
```

### 推送到 GitHub

```bash
cd ~/.openclaw/workspace/tattoo-shop
git add medical-concierge/concierge/
git commit -m "Add patient stories page with video support"
git push origin main
```

Vercel 会自动部署。

---

## 📊 视频内容建议

### 视频 1: 医院环境介绍 (5:32)
**内容建议：**
- 医院外观和入口
- 挂号处和等候区
- 诊室环境
- 药房和缴费处
- 国际部特色设施

**拍摄要点：**
- 横屏拍摄（16:9）
- 保持稳定（使用三脚架）
- 光线充足
- 加入简单字幕

### 视频 2: 客户感谢视频 (3:15)
**内容建议：**
- 客户自我介绍（可选打码）
- 遇到的问题
- 服务过程体验
- 最终结果和感受
- 推荐给其他人

**拍摄要点：**
- 自然光或柔光
- 安静环境
- 准备采访提纲
- 可远程录制（Zoom 录屏）

### 视频 3: 服务流程演示 (4:20)
**内容建议：**
- 第 1 步：联系咨询
- 第 2 步：需求评估
- 第 3 步：医院预约
- 第 4 步：陪同就诊
- 第 5 步：后续跟进

**拍摄要点：**
- 使用动画或图示
- 加入文字说明
- 配背景音乐
- 节奏明快

### 视频 4: FAQ 解答 (6:45)
**内容建议：**
- 服务价格是多少？
- 如何预约？
- 是否接受保险？
- 紧急情况怎么办？
- 服务覆盖哪些医院？
- 翻译是否专业？

**拍摄要点：**
- 问答形式
- 问题显示在屏幕上
- 回答简洁清晰
- 可加入案例说明

---

## 🔗 相关资源

- **YouTube 创作者学院:** https://creatoracademy.youtube.com/
- **免费视频编辑软件:** DaVinci Resolve, Shotcut
- **在线缩略图制作:** Canva, Adobe Express
- **背景音乐库:** YouTube Audio Library, Epidemic Sound

---

## ✅ 上线前检查清单

- [ ] 替换所有 4 个 YouTube 视频 ID
- [ ] 添加真实案例图片（可选）
- [ ] 检查所有链接是否有效
- [ ] 测试移动端显示
- [ ] 验证筛选功能
- [ ] 验证轮播功能
- [ ] 验证模态框弹出
- [ ] 更新 footer 版权年份
- [ ] 测试表单提交（如果有）
- [ ] 推送到 GitHub
- [ ] 验证 Vercel 部署
- [ ] 在主页面添加故事页面入口

---

**最后更新:** 2026-03-22  
**负责人:** 巴洛克
