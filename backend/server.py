import http.server
import socketserver
import json
import mysql.connector
import urllib.parse
from datetime import datetime
from config import DB_CONFIG, SERVER_CONFIG

class StudyAbroadHandler(http.server.BaseHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        self.db_config = DB_CONFIG
        super().__init__(*args, **kwargs)
    
    def log_message(self, format, *args):
        """Custom log format"""
        print(f"[{self.date_time_string()}] {format % args}")
    
    def send_json_response(self, data, status_code=200):
        """Send JSON response with proper headers"""
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', SERVER_CONFIG['cors_origin'])
        self.send_header('Access-Control-Allow-Credentials', 'true')
        self.end_headers()
        
        response_json = json.dumps(data, ensure_ascii=False, default=str)
        self.wfile.write(response_json.encode('utf-8'))
        print(f"✅ Response sent: {len(response_json)} bytes")
    
    def send_error_response(self, status_code, message, details=None):
        """Send error response in JSON format"""
        error_data = {
            'error': True,
            'message': message,
            'status_code': status_code
        }
        if details:
            error_data['details'] = details
        
        self.send_json_response(error_data, status_code)
        print(f"❌ Error response: {status_code} - {message}")
    
    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', SERVER_CONFIG['cors_origin'])
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
        self.send_header('Access-Control-Allow-Credentials', 'true')
        self.end_headers()
    
    def do_GET(self):
        """Handle GET requests"""
        try:
            # Parse URL path
            path = self.path.split('?')[0]
            query_params = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            
            print(f"API Request: {path}")
            print(f"Parameters: {query_params}")
            
            # Route handling
            if path == '/api/schools':
                data = self.get_schools(query_params)
                self.send_json_response(data)
            elif path.startswith('/api/schools/'):
                school_id = path.split('/')[-1]
                data = self.get_school_detail(school_id)
                if 'error' in data:
                    self.send_error_response(404, data['error'])
                else:
                    self.send_json_response(data)
            elif path == '/api/programs':
                data = self.get_programs(query_params)
                self.send_json_response(data)
            elif path.startswith('/api/programs/'):
                program_id = path.split('/')[-1]
                data = self.get_program_detail(program_id)
                self.send_json_response(data)
            elif path == '/api/scholarships':
                data = self.get_scholarships(query_params)
                self.send_json_response(data)
            elif path == '/api/destinations':
                data = self.get_destinations()
                self.send_json_response(data)
            elif path == '/api/health':
                data = {'status': 'ok', 'message': 'API server is running normally'}
                self.send_json_response(data)
            else:
                self.send_error_response(404, 'API endpoint not found')
                return
            
        except mysql.connector.Error as db_err:
            print(f"❌ Database error: {db_err}")
            self.send_error_response(500, 'Database error', str(db_err))
        except Exception as e:
            print(f"❌ Server error: {e}")
            self.send_error_response(500, 'Internal server error', str(e))
    
    def get_program_detail(self, program_id):
        """Get program details"""
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        try:
            cursor.execute("""
                SELECT p.*, s.school_name, s.location
                FROM programs p
                JOIN schools s ON p.school_id = s.id
                WHERE p.id = %s
            """, (program_id,))
            program = cursor.fetchone()
            
            if not program:
                return {'error': 'Program not found'}
            
            return {'program': program}
        finally:
            cursor.close()
            conn.close()
    
    def get_db_connection(self):
        """Get database connection"""
        try:
            conn = mysql.connector.connect(**self.db_config)
            return conn
        except mysql.connector.Error as err:
            print(f"Database connection failed: {err}")
            raise
    
    def get_schools(self, params):
        """Get schools list"""
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        try:
            # Base query
            query = """
            SELECT s.*, 
                   GROUP_CONCAT(DISTINCT tf.level) as available_levels,
                   MIN(tf.fee) as min_tuition,
                   MAX(tf.fee) as max_tuition
            FROM schools s
            LEFT JOIN tuition_fees tf ON s.id = tf.school_id
            """
            
            conditions = []
            params_list = []
            
            # Add search conditions
            if 'search' in params and params['search'][0]:
                conditions.append("(s.school_name LIKE %s OR s.location LIKE %s)")
                search_term = f"%{params['search'][0]}%"
                params_list.extend([search_term, search_term])
            
            if 'location' in params and params['location'][0] and params['location'][0] != 'All Regions':
                conditions.append("s.location LIKE %s")
                params_list.append(f"%{params['location'][0]}%")
            
            if 'type' in params and params['type'][0] and params['type'][0] != 'All Types':
                conditions.append("s.type = %s")
                params_list.append(params['type'][0])
            
            if conditions:
                query += " WHERE " + " AND ".join(conditions)
            
            query += " GROUP BY s.id ORDER BY s.school_name"
            
            # Pagination
            page = int(params.get('page', [1])[0])
            limit = int(params.get('limit', [12])[0])
            offset = (page - 1) * limit
            query += f" LIMIT {limit} OFFSET {offset}"
            
            cursor.execute(query, params_list)
            schools = cursor.fetchall()
            
            # Get total count
            count_query = "SELECT COUNT(*) as total FROM schools s"
            if conditions:
                count_query += " WHERE " + " AND ".join(conditions)
            cursor.execute(count_query, params_list[:-2] if conditions else [])
            total = cursor.fetchone()['total']
            
            return {
                'schools': schools,
                'total': total,
                'page': page,
                'totalPages': (total + limit - 1) // limit
            }
            
        finally:
            cursor.close()
            conn.close()
    
    def get_school_detail(self, school_id):
        """Get school details"""
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        try:
            # Get school basic info
            cursor.execute("SELECT * FROM schools WHERE id = %s", (school_id,))
            school = cursor.fetchone()
            
            if not school:
                return {'error': 'School not found'}
            
            # Get programs info
            cursor.execute("SELECT * FROM programs WHERE school_id = %s", (school_id,))
            programs = cursor.fetchall()
            
            # Get tuition fees info
            cursor.execute("SELECT * FROM tuition_fees WHERE school_id = %s", (school_id,))
            tuition_fees = cursor.fetchall()
            
            # Get accommodation fees info
            cursor.execute("SELECT * FROM accommodation_fees WHERE school_id = %s", (school_id,))
            accommodation_fees = cursor.fetchall()
            
            # Get other fees
            cursor.execute("SELECT * FROM other_fees WHERE school_id = %s", (school_id,))
            other_fees = cursor.fetchall()
            
            # Get scholarships info
            cursor.execute("SELECT * FROM scholarships WHERE school_id = %s", (school_id,))
            scholarships = cursor.fetchall()
            
            return {
                'school': school,
                'programs': programs,
                'tuition_fees': tuition_fees,
                'accommodation_fees': accommodation_fees,
                'other_fees': other_fees,
                'scholarships': scholarships
            }
        finally:
            cursor.close()
            conn.close()
    
    def get_programs(self, params):
        """Get programs list"""
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        try:
            query = """
            SELECT p.*, s.school_name, s.location
            FROM programs p
            JOIN schools s ON p.school_id = s.id
            """
            
            conditions = []
            params_list = []
            
            if 'course_type' in params and params['course_type'][0]:
                conditions.append("p.course_type = %s")
                params_list.append(params['course_type'][0])
            
            if 'language' in params and params['language'][0]:
                conditions.append("p.language = %s")
                params_list.append(params['language'][0])
            
            if 'search' in params and params['search'][0]:
                conditions.append("(p.course_name LIKE %s OR s.school_name LIKE %s)")
                search_term = f"%{params['search'][0]}%"
                params_list.extend([search_term, search_term])
            
            if conditions:
                query += " WHERE " + " AND ".join(conditions)
            
            query += " ORDER BY p.created_at DESC"
            
            # Pagination
            page = int(params.get('page', [1])[0])
            limit = int(params.get('limit', [12])[0])
            offset = (page - 1) * limit
            query += f" LIMIT {limit} OFFSET {offset}"
            
            cursor.execute(query, params_list)
            programs = cursor.fetchall()
            
            return {'programs': programs}
        finally:
            cursor.close()
            conn.close()
    
    def get_scholarships(self, params):
        """Get scholarships list"""
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        try:
            query = """
            SELECT sc.*, s.school_name, s.location
            FROM scholarships sc
            JOIN schools s ON sc.school_id = s.id
            ORDER BY sc.created_at DESC
            """
            
            cursor.execute(query)
            scholarships = cursor.fetchall()
            
            return {'scholarships': scholarships}
        finally:
            cursor.close()
            conn.close()
    
    def get_destinations(self):
        """Get popular destinations"""
        conn = self.get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        try:
            query = """
            SELECT location, COUNT(*) as school_count
            FROM schools
            GROUP BY location
            ORDER BY school_count DESC
            LIMIT 8
            """
            
            cursor.execute(query)
            destinations = cursor.fetchall()
            
            return {'destinations': destinations}
        finally:
            cursor.close()
            conn.close()

if __name__ == "__main__":
    PORT = SERVER_CONFIG['port']
    Handler = StudyAbroadHandler
    
    print("=== Study Abroad Platform API Server ===")
    print(f"Server starting...")
    print(f"Address: http://{SERVER_CONFIG['host']}:{PORT}")
    print(f"CORS allowed origin: {SERVER_CONFIG['cors_origin']}")
    print("\nAPI Endpoints:")
    print("  GET /api/health - Health check")
    print("  GET /api/schools - Get schools list")
    print("  GET /api/schools/{id} - Get school details")
    print("  GET /api/programs - Get programs list")
    print("  GET /api/scholarships - Get scholarships list")
    print("  GET /api/destinations - Get popular destinations")
    print("\nPress Ctrl+C to stop server")
    print("="*50)
    
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped")
    except Exception as e:
        print(f"Server startup failed: {e}")
