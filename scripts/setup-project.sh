#!/bin/bash

echo "=== Study in China 项目环境设置 ==="

# 检查 Node.js 版本
echo "检查 Node.js 版本..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js 18+ 版本"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 版本过低，需要 18+ 版本"
    exit 1
fi

echo "✅ Node.js 版本: $(node -v)"

# 清理并安装前端依赖
echo "清理并安装前端依赖..."
rm -rf node_modules package-lock.json
npm install

# 检查 Python 环境
echo "检查 Python 环境..."
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 未安装"
    exit 1
fi

echo "✅ Python 版本: $(python3 --version)"

# 安装 Python 依赖
echo "安装 Python 后端依赖..."
cd backend
pip3 install -r requirements.txt
cd ..

echo "=== 环境设置完成 ==="
echo ""
echo "启动说明："
echo "1. 启动后端服务器: cd backend && python3 server.py"
echo "2. 启动前端服务器: npm run dev"
echo "3. 访问应用: https://studyapi.vgit.cn"
