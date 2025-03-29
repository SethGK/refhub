#!/bin/bash
# api_tests.sh
# Base URL of your API. Adjust if needed.
BASE_URL="http://localhost:8080"

echo "========== Register Endpoint Tests =========="

# Test: Valid Registration (with unique username)
echo "Test: Register Valid User"
curl -X POST "$BASE_URL/register" \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser1", "password": "password123"}'
echo -e "\n\n"

# Test: Registration with Missing Username
echo "Test: Register Missing Username"
curl -X POST "$BASE_URL/register" \
     -H "Content-Type: application/json" \
     -d '{"password": "password123"}'
echo -e "\n\n"

# Test: Registration with Missing Password
echo "Test: Register Missing Password"
curl -X POST "$BASE_URL/register" \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser2"}'
echo -e "\n\n"

# Test: Registration Duplicate (attempting to re-register same user)
echo "Test: Register Duplicate User"
curl -X POST "$BASE_URL/register" \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser1", "password": "password123"}'
echo -e "\n\n"

echo "========== Login Endpoint Tests =========="

# Test: Valid Login (using same username and password from above)
echo "Test: Login Valid User"
curl -X POST "$BASE_URL/login" \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser1", "password": "password123"}'
echo -e "\n\n"

# Test: Login with Invalid Username
echo "Test: Login with Invalid Username"
curl -X POST "$BASE_URL/login" \
     -H "Content-Type: application/json" \
     -d '{"username": "nonexistent", "password": "password123"}'
echo -e "\n\n"

# Test: Login with Invalid Password
echo "Test: Login with Invalid Password"
curl -X POST "$BASE_URL/login" \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser1", "password": "wrongpassword"}'
echo -e "\n\n"

# Test: Login Missing Username
echo "Test: Login Missing Username"
curl -X POST "$BASE_URL/login" \
     -H "Content-Type: application/json" \
     -d '{"password": "password123"}'
echo -e "\n\n"

# Test: Login Missing Password
echo "Test: Login Missing Password"
curl -X POST "$BASE_URL/login" \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser1"}'
echo -e "\n\n"
