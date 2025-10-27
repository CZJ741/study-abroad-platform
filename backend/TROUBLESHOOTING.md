# API Connection Troubleshooting Guide

## Quick Test

Run the API test script to check if everything is working:

\`\`\`bash
cd backend
python test_api.py
\`\`\`

## Common Issues and Solutions

### 1. "Failed to fetch" Error in Frontend

**Symptoms:**
- Frontend shows "Using Demo Data" 
- Console shows "Failed to fetch" errors
- API test script fails with connection errors

**Solutions:**
1. **Check if backend server is running:**
   \`\`\`bash
   cd backend
   python start_server.py
   \`\`\`
   You should see: "Server starting..." and "Address: https://studyapi.vgit.cn"

2. **Verify server is accessible:**
   Open https://studyapi.vgit.cn/api/health in your browser
   Should return: `{"status": "ok", "message": "API server is running normally"}`

### 2. Database Connection Errors

**Symptoms:**
- Backend shows "Database connection failed" errors
- API returns "Database error" responses

**Solutions:**
1. **Check MySQL is running:**
   - Windows: Check Services for MySQL
   - Mac: `brew services list | grep mysql`
   - Linux: `sudo systemctl status mysql`

2. **Verify database credentials in config.py:**
   \`\`\`python
   DB_CONFIG = {
       'host': 'localhost',
       'user': 'root',
       'password': 'YOUR_ACTUAL_PASSWORD',  # ← Update this
       'database': 'study_abroad',
       'charset': 'utf8mb4'
   }
   \`\`\`

3. **Test database connection:**
   \`\`\`bash
   cd backend
   python test_connection.py
   \`\`\`

### 3. Unicode/Encoding Errors

**Symptoms:**
- Backend crashes with "UnicodeEncodeError"
- Server stops responding after errors

**Solutions:**
- ✅ **Fixed in latest server.py** - Now uses English error messages
- Restart the server: `python start_server.py`

### 4. CORS Issues

**Symptoms:**
- Browser console shows CORS errors
- Network tab shows preflight request failures

**Solutions:**
- ✅ **Already configured** - Server allows requests from https://studyapi.vgit.cn
- Make sure frontend is running on port 3000: `npm run dev`

### 5. Empty Database

**Symptoms:**
- API returns empty arrays: `{"schools": [], "total": 0}`
- No data visible in frontend even when connected

**Solutions:**
1. **Import your SQL data:**
   \`\`\`bash
   mysql -u root -p study_abroad < your_database_file.sql
   \`\`\`

2. **Verify data exists:**
   \`\`\`sql
   USE study_abroad;
   SELECT COUNT(*) FROM schools;
   SELECT COUNT(*) FROM programs;
   \`\`\`

## Step-by-Step Connection Process

1. **Start MySQL Database**
2. **Update config.py with correct password**
3. **Test database connection:** `python test_connection.py`
4. **Start backend server:** `python start_server.py`
5. **Test API endpoints:** `python test_api.py`
6. **Start frontend:** `npm run dev`
7. **Check frontend shows "Using Live Data"**

## Getting Help

If you're still having issues:

1. **Check the console logs** in both backend terminal and browser developer tools
2. **Run the test script** and share the output
3. **Verify your database** has the expected tables and data
4. **Check firewall/antivirus** isn't blocking port 8000

The system is designed to gracefully fall back to demo data if the backend isn't available, so the frontend will always work - but you'll see "Using Demo Data" instead of "Using Live Data" when there are connection issues.
