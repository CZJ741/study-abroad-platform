# Study in China 项目架构说明

## 技术栈
- **前端**: Next.js 15 + React 19 + TypeScript + Tailwind CSS
- **后端**: Python 原生 HTTP 服务器
- **数据库**: MySQL
- **UI组件**: shadcn/ui + Radix UI

## 项目结构
\`\`\`
Study-in-China/
├── app/                    # Next.js App Router 页面
│   ├── universities/       # 大学列表和详情页
│   ├── courses/           # 课程页面
│   ├── scholarships/      # 奖学金页面
│   └── auth/              # 认证页面
├── components/            # React 组件
├── lib/                   # 工具函数和API客户端
├── backend/               # Python 后端服务器
│   ├── server.py          # 主服务器文件
│   └── requirements.txt   # Python 依赖
└── scripts/               # 部署和设置脚本
\`\`\`

## 数据流程

### 1. 数据库层 (MySQL)
- `schools` - 学校基本信息
- `programs` - 学术项目
- `scholarships` - 奖学金信息
- `tuition_fees` - 学费信息
- `accommodation_fees` - 住宿费用
- `other_fees` - 其他费用

### 2. 后端API层 (Python)
- **端点**: `https://studyapi.vgit.cn/api/`
- **主要API**:
  - `GET /api/schools` - 获取学校列表（支持搜索、过滤、分页）
  - `GET /api/schools/{id}` - 获取学校详情
  - `GET /api/programs` - 获取项目列表
  - `GET /api/scholarships` - 获取奖学金列表
  - `GET /api/destinations` - 获取热门目的地

### 3. 前端API客户端 (lib/api.ts)
- 封装所有API调用
- 处理错误和加载状态
- 提供类型安全的接口
- 包含离线模式的模拟数据

### 4. React组件层
- **页面组件**: 处理数据获取和状态管理
- **UI组件**: 展示数据和用户交互
- **共享组件**: 导航、卡片、表单等

## 运行流程

### 开发环境启动
1. **后端服务器**: `cd backend && python3 server.py`
   - 启动在 `https://studyapi.vgit.cn`
   - 连接 MySQL 数据库
   - 提供 RESTful API

2. **前端服务器**: `npm run dev`
   - 启动在 `https://studyapi.vgit.cn`
   - 调用后端API获取数据
   - 热重载开发模式

### 数据渲染流程
1. **用户访问页面** → Next.js 路由
2. **页面组件加载** → 调用 `lib/api.ts` 中的函数
3. **API客户端** → 发送HTTP请求到Python后端
4. **Python服务器** → 查询MySQL数据库
5. **数据库返回结果** → Python处理并返回JSON
6. **前端接收数据** → 更新React状态
7. **组件重新渲染** → 显示最新数据

## 错误处理
- **网络错误**: 自动降级到模拟数据
- **数据库错误**: 返回友好的错误信息
- **CORS问题**: 已配置跨域访问
- **类型安全**: TypeScript确保数据结构正确

## 部署说明
- **前端**: 可部署到Vercel、Netlify等平台
- **后端**: 需要支持Python的服务器环境
- **数据库**: MySQL 5.7+ 或 MariaDB
