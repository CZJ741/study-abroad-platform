#!/usr/bin/env python3
import subprocess
import sys
import os

def install_requirements():
    """安装Python依赖"""
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Python依赖安装成功")
    except subprocess.CalledProcessError:
        print("❌ Python依赖安装失败")
        sys.exit(1)

def start_server():
    """启动API服务器"""
    try:
        print("🚀 启动Study in China API服务器...")
        print("📍 服务器地址: https://studyapi.vgit.cn")
        print("📋 可用API端点:")
        print("   GET /api/schools - 获取学校列表")
        print("   GET /api/schools/{id} - 获取学校详情")
        print("   GET /api/programs - 获取项目列表")
        print("   GET /api/scholarships - 获取奖学金列表")
        print("   GET /api/destinations - 获取热门目的地")
        print("\n按 Ctrl+C 停止服务器\n")
        
        subprocess.run([sys.executable, "server.py"])
    except KeyboardInterrupt:
        print("\n🛑 服务器已停止")
    except Exception as e:
        print(f"❌ 服务器启动失败: {e}")

if __name__ == "__main__":
    # 检查是否在backend目录
    if not os.path.exists("server.py"):
        print("❌ 请在backend目录下运行此脚本")
        sys.exit(1)
    
    # 安装依赖
    if os.path.exists("requirements.txt"):
        install_requirements()
    
    # 启动服务器
    start_server()
