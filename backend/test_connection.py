#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
数据库连接测试工具
运行此脚本来测试数据库连接是否正常
"""

import mysql.connector
from config import DB_CONFIG

def test_database_connection():
    """测试数据库连接"""
    print("正在测试数据库连接...")
    print(f"连接信息: {DB_CONFIG['host']}:{DB_CONFIG.get('port', 3306)}")
    print(f"数据库: {DB_CONFIG['database']}")
    print(f"用户: {DB_CONFIG['user']}")
    
    try:
        # 尝试连接数据库
        conn = mysql.connector.connect(**DB_CONFIG)
        cursor = conn.cursor()
        
        # 测试基本查询
        cursor.execute("SELECT VERSION()")
        version = cursor.fetchone()
        print(f"✅ 数据库连接成功!")
        print(f"MySQL版本: {version[0]}")
        
        # 检查数据库是否存在
        cursor.execute("SHOW DATABASES LIKE %s", (DB_CONFIG['database'],))
        db_exists = cursor.fetchone()
        
        if db_exists:
            print(f"✅ 数据库 '{DB_CONFIG['database']}' 存在")
            
            # 检查表是否存在
            cursor.execute(f"USE {DB_CONFIG['database']}")
            cursor.execute("SHOW TABLES")
            tables = cursor.fetchall()
            
            expected_tables = ['schools', 'programs', 'scholarships', 'tuition_fees', 'accommodation_fees', 'other_fees']
            existing_tables = [table[0] for table in tables]
            
            print(f"现有表: {existing_tables}")
            
            missing_tables = [table for table in expected_tables if table not in existing_tables]
            if missing_tables:
                print(f"⚠️  缺少表: {missing_tables}")
                print("请确保已导入SQL文件创建所有必要的表")
            else:
                print("✅ 所有必要的表都存在")
                
                # 测试数据查询
                cursor.execute("SELECT COUNT(*) FROM schools")
                school_count = cursor.fetchone()[0]
                print(f"学校数据: {school_count} 条记录")
                
        else:
            print(f"❌ 数据库 '{DB_CONFIG['database']}' 不存在")
            print("请先创建数据库并导入SQL文件")
        
        cursor.close()
        conn.close()
        
    except mysql.connector.Error as err:
        print(f"❌ 数据库连接失败: {err}")
        print("\n可能的解决方案:")
        print("1. 检查MySQL服务是否正在运行")
        print("2. 验证用户名和密码是否正确")
        print("3. 确保数据库已创建")
        print("4. 检查防火墙设置")
        return False
    
    except Exception as e:
        print(f"❌ 发生未知错误: {e}")
        return False
    
    return True

def test_api_server():
    """测试API服务器连接"""
    import urllib.request
    import json
    from config import SERVER_CONFIG
    
    print(f"\n正在测试API服务器连接...")
    api_url = f"http://{SERVER_CONFIG['host']}:{SERVER_CONFIG['port']}/api/schools"
    
    try:
        with urllib.request.urlopen(api_url, timeout=5) as response:
            data = json.loads(response.read().decode())
            print("✅ API服务器连接成功!")
            print(f"返回数据: {len(data.get('schools', []))} 所学校")
            return True
    except Exception as e:
        print(f"❌ API服务器连接失败: {e}")
        print("请确保Python后端服务器正在运行")
        return False

if __name__ == "__main__":
    print("=== Study Abroad Platform 连接测试 ===\n")
    
    # 测试数据库连接
    db_success = test_database_connection()
    
    if db_success:
        print("\n" + "="*50)
        # 测试API服务器
        api_success = test_api_server()
        
        if api_success:
            print("\n🎉 所有连接测试通过! 系统可以正常运行")
        else:
            print("\n⚠️  数据库连接正常，但API服务器未运行")
            print("请运行: python start_server.py")
    else:
        print("\n❌ 请先解决数据库连接问题")
    
    print("\n" + "="*50)
    print("测试完成")
