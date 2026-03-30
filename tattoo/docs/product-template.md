# 东方符号 - 产品介绍模板

## 产品设计要素模板

每个产品应该包含以下信息：

---

### 📐 **视觉特征 (Visual Characteristics)**

```
字体风格：[楷书/行书/草书/篆书]
笔画数量：[X 画]
结构特点：[左右结构/上下结构/独体字]
视觉印象：[简洁/复杂/对称/流动/刚劲/柔美]
推荐尺寸：[小 (2-4cm) / 中 (5-8cm) / 大 (10cm+)]
```

---

### 🎨 **设计风格 (Design Style)**

```
适合风格：[极简/传统/现代/水彩/几何]
线条特点：[粗线条/细线条/渐变/实心]
推荐位置：[手腕/手臂/背部/肋骨/脚踝/颈部]
配色建议：[纯黑/灰度/彩色/金色]
```

---

### 👤 **适合人群 (Target Audience)**

```
纹身经验：[首次纹身 / 有纹身经验 / 收藏家]
年龄层：[18-25 / 25-35 / 35+]
性格特点：[内敛/外向/艺术型/传统型/现代型]
文化背景：[东方文化爱好者 / 哲学思考者 / 纯粹美学追求]
```

---

### 💡 **含义深度 (Meaning Depth)**

```
核心含义：[一句话概括]
延伸含义：[2-3 个相关概念]
历史典故：[可选，有故事的话]
常见误解：[提醒用户注意的点]
```

---

### ⚠️ **注意事项 (Considerations)**

```
书写方向：[从上到下/从左到右 - 重要！]
常见错误：[容易纹错的笔画]
文化敏感：[是否有文化禁忌]
维护难度：[简单/中等/需要补色]
愈合时间：[1-2 周 / 2-3 周]
```

---

## 产品卡片模板（英文）

```html
<div class="product-card">
    <h3>愛 (Love)</h3>
    
    <!-- 视觉特征 -->
    <div class="visual-info">
        <span class="badge">13 笔画</span>
        <span class="badge">上下结构</span>
        <span class="badge">极简风格</span>
    </div>
    
    <!-- 简短描述 -->
    <p class="product-desc">
        An ancient Eastern symbol representing love, care, and warmth.
    </p>
    
    <!-- 适合人群 -->
    <div class="target-audience">
        <strong>Perfect for:</strong>
        <ul>
            <li>First-time tattoo seekers</li>
            <li>Minimalist design lovers</li>
            <li>Those expressing deep connections</li>
        </ul>
    </div>
    
    <!-- 推荐位置 -->
    <div class="placement-suggestions">
        <strong>Recommended placement:</strong>
        <p>Wrist, forearm, or behind the ear (2-5cm)</p>
    </div>
    
    <!-- 价格 + 购买 -->
    <div class="product-price">
        <span class="original-price">$19.99</span>
        <span class="sale-price">$9.99</span>
    </div>
    <div class="paypal-button-container"></div>
</div>
```

---

## 完整产品页面模板

### 愛 (Love) - 示例

**视觉特征**
- 字体风格：楷书
- 笔画数量：13 画
- 结构特点：上下结构，中心有"心"
- 视觉印象：平衡、包容、温暖
- 推荐尺寸：中号 (5-8cm)

**设计风格**
- 适合风格：极简、传统、书法风格
- 线条特点：流畅、有粗细变化
- 推荐位置：前臂、上臂、背部、肋骨
- 配色建议：纯黑、黑灰渐变

**适合人群**
- 纹身经验：首次或有经验均可
- 年龄层：20-40 岁
- 性格特点：感性、重视情感连接
- 文化背景：东方文化爱好者、浪漫主义者

**含义深度**
- 核心含义：爱、关怀、温暖
- 延伸含义：家庭之爱、浪漫之爱、博爱
- 常见误解：不同于西方的"love"，東方的"愛"更强调付出而非占有

**注意事项**
- 书写方向：从上到下书写
- 常见错误：中间的"心"容易写错
- 文化敏感：无特殊禁忌
- 维护难度：简单，线条清晰

---

## CSS 样式建议

```css
/* 标签样式 */
.badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: #f0f0f0;
    border-radius: 20px;
    font-size: 0.75rem;
    color: #666;
    margin: 0.25rem;
}

/* 信息区块 */
.visual-info,
.target-audience,
.placement-suggestions {
    background: #f9f9f9;
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem 0;
    font-size: 0.875rem;
}

/* 列表样式 */
.target-audience ul {
    list-style: none;
    padding-left: 0;
    margin-top: 0.5rem;
}

.target-audience li {
    padding: 0.25rem 0;
    color: #666;
}

.target-audience li:before {
    content: "✓ ";
    color: var(--accent-color);
}
```

---

## 下一步行动

1. **确定 4 个产品的详细要素**
   - 愛 (Love)
   - 勇 (Courage)
   - 自由 (Freedom)
   - 梦 (Dream)

2. **设计视觉展示**
   - 每个字的书法图片
   - 笔画顺序图
   - 尺寸参考图

3. **更新产品页面**
   - 添加结构化信息
   - 优化移动端显示
   - 添加"适合人群"筛选

---

*创建时间：2026-03-15*
