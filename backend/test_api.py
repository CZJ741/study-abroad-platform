#!/usr/bin/env python3
"""
API Connection Test Script
Tests all API endpoints to verify they're working correctly
"""

import requests
import json
import sys

API_BASE_URL = "http://studyapi.vgit.cn/api"

def test_endpoint(endpoint, description):
    """Test a single API endpoint"""
    url = f"{API_BASE_URL}{endpoint}"
    print(f"\n🔍 Testing {description}")
    print(f"   URL: {url}")
    
    try:
        response = requests.get(url, timeout=5)
        print(f"   Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, dict) and 'error' in data:
                print(f"   ❌ API Error: {data.get('message', 'Unknown error')}")
                return False
            else:
                print(f"   ✅ Success - Response size: {len(response.text)} bytes")
                return True
        else:
            print(f"   ❌ HTTP Error: {response.status_code}")
            try:
                error_data = response.json()
                print(f"   Error details: {error_data.get('message', 'No details')}")
            except:
                print(f"   Error text: {response.text[:100]}...")
            return False
            
    except requests.exceptions.ConnectionError:
        print(f"   ❌ Connection Error: Cannot connect to server")
        print(f"   💡 Make sure the Python backend server is running on port 8000")
        return False
    except requests.exceptions.Timeout:
        print(f"   ❌ Timeout Error: Server took too long to respond")
        return False
    except Exception as e:
        print(f"   ❌ Unexpected Error: {e}")
        return False

def main():
    """Run all API tests"""
    print("=" * 60)
    print("🚀 Study Abroad Platform API Connection Test")
    print("=" * 60)
    
    # Test endpoints
    tests = [
        ("/health", "Health Check"),
        ("/schools", "Schools List"),
        ("/schools?page=1&limit=5", "Schools with Pagination"),
        ("/schools?search=大学", "Schools Search"),
        ("/programs", "Programs List"),
        ("/scholarships", "Scholarships List"),
        ("/destinations", "Destinations List"),
    ]
    
    passed = 0
    total = len(tests)
    
    for endpoint, description in tests:
        if test_endpoint(endpoint, description):
            passed += 1
    
    print("\n" + "=" * 60)
    print(f"📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Your API is working correctly.")
        print("💡 You can now use the frontend - it should connect to real data.")
    else:
        print("⚠️  Some tests failed. Check the errors above.")
        print("💡 Common issues:")
        print("   - Make sure MySQL database is running")
        print("   - Check database connection settings in config.py")
        print("   - Verify your database has the required tables and data")
    
    print("=" * 60)
    
    return passed == total

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
