# 后端API设置指南

## 1. 环境准备

### 安装Python依赖
\`\`\`bash
pip install mysql-connector-python
\`\`\`

### 确保MySQL服务运行
- Windows: 启动MySQL服务
- macOS: `brew services start mysql`
- Linux: `sudo systemctl start mysql`

## 2. 数据库配置

### 修改数据库密码
编辑 `config.py` 文件，将 `your_password_here` 替换为你的MySQL密码：

\`\`\`python
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '你的MySQL密码',  # 修改这里
    'database': 'study_abroad',
    'charset': 'utf8mb4'
}
\`\`\`

### 创建数据库并导入数据
\`\`\`sql
-- 登录MySQL
mysql -u root -p

-- 创建数据库
CREATE DATABASE study_abroad CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 导入SQL文件
USE study_abroad;
SOURCE /path/to/your/study_abroad.sql;
\`\`\`

## 3. 测试连接

运行连接测试工具：
\`\`\`bash
python test_connection.py
\`\`\`

这将测试：
- 数据库连接
- 表结构完整性
- API服务器连接

## 4. 启动服务器

\`\`\`bash
python start_server.py
\`\`\`

或直接运行：
\`\`\`bash
python server.py
\`\`\`

## 5. 验证API

访问以下URL验证API是否正常工作：
- https://studyapi.vgit.cn/api/health
- https://studyapi.vgit.cn/api/schools
- https://studyapi.vgit.cn/api/destinations

## 6. 前端连接

确保前端运行在 https://studyapi.vgit.cn，然后：
\`\`\`bash
npm run dev
\`\`\`

## 故障排除

### 常见问题

1. **数据库连接失败**
   - 检查MySQL服务是否运行
   - 验证用户名密码
   - 确认数据库已创建

2. **CORS错误**
   - 确保前端运行在 https://studyapi.vgit.cn
   - 检查服务器CORS配置

3. **端口占用**
   - 修改 `config.py` 中的端口号
   - 或停止占用8000端口的其他服务

4. **API返回空数据**
   - 检查数据库中是否有数据
   - 运行 `test_connection.py` 验证
