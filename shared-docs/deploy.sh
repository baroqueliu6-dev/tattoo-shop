#!/bin/bash

# 🎨 Oriental Symbols - 一键部署脚本
# 用法：./deploy.sh

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  🎨 Oriental Symbols - 一键部署        ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# 检查是否在正确的目录
if [ ! -f "index.html" ]; then
    echo -e "${RED}❌ 错误：请在 tattoo-shop 目录下运行此脚本${NC}"
    echo "   当前目录：$(pwd)"
    exit 1
fi

# 检查 git 状态
echo -e "${YELLOW}📋 检查文件变更...${NC}"
git_status=$(git status --porcelain)

if [ -z "$git_status" ]; then
    echo -e "${GREEN}✅ 没有文件变更，无需部署${NC}"
    exit 0
fi

# 显示变更的文件
echo ""
echo -e "${BLUE}以下文件将被提交：${NC}"
echo "$git_status"
echo ""

# 获取提交信息
read -p "请输入提交信息 (默认：更新网站内容): " commit_msg
commit_msg=${commit_msg:-"更新网站内容"}

# 执行 git 操作
echo ""
echo -e "${YELLOW}🔄 正在提交文件...${NC}"
git add .
git commit -m "$commit_msg"

echo ""
echo -e "${YELLOW}🚀 正在推送到 GitHub...${NC}"
git push

# 检查推送结果
if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║  ✅ 部署成功！                         ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${BLUE}📦 Vercel 正在自动部署，预计 1-2 分钟完成${NC}"
    echo -e "${BLUE}🌐 网站：https://13801380.site${NC}"
    echo ""
    echo -e "${YELLOW}💡 提示：可以在 Vercel 控制台查看部署进度${NC}"
else
    echo ""
    echo -e "${RED}❌ 推送失败，请检查网络连接或 GitHub 权限${NC}"
    exit 1
fi
