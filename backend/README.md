# Study in China Backend API

## 环境要求
- Python 3.8+
- MySQL 8.0+
- 数据库名称: `study_abroad`

## 快速启动

### 1. 数据库配置
修改 `server.py` 中的数据库连接配置:
\`\`\`python
self.db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'your_password',  # 修改为您的密码
    'database': 'study_abroad',
    'charset': 'utf8mb4'
}
\`\`\`

### 2. 安装依赖并启动
\`\`\`bash
cd backend
python start_server.py
\`\`\`

### 3. 测试API
访问 http://studyapi.vgit.cn/api/schools 测试API是否正常工作

## API端点

| 端点 | 方法 | 描述 | 参数 |
|------|------|------|------|
| `/api/schools` | GET | 获取学校列表 | page, limit, search, location, type |
| `/api/schools/{id}` | GET | 获取学校详情 | - |
| `/api/programs` | GET | 获取项目列表 | course_type, language, search |
| `/api/scholarships` | GET | 获取奖学金列表 | - |
| `/api/destinations` | GET | 获取热门目的地 | - |

## 前端集成
确保前端项目中的 `lib/api.ts` 文件中的 `API_BASE_URL` 指向正确的后端地址:
\`\`\`typescript
const API_BASE_URL = 'http://studyapi.vgit.cn/api'
