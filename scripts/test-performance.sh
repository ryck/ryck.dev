#!/bin/bash

# Performance testing script for ryck.dev
echo "🚀 Starting performance tests for ryck.dev"

# URLs to test
URLS=(
  "http://localhost:3000/"
  "http://localhost:3000/blog"
  "http://localhost:3000/resume"
  "http://localhost:3000/stats"
  "http://localhost:3000/use"
  "http://localhost:3000/projects"
)

# Check if server is running
if ! curl -s http://localhost:3000 > /dev/null; then
  echo "❌ Server not running on localhost:3000"
  echo "Please start your development server with 'npm run dev'"
  exit 1
fi

echo "✅ Server is running"

# Test each URL
for url in "${URLS[@]}"; do
  echo "📊 Testing: $url"
  
  # Basic performance metrics using curl
  curl -w "⏱️  Total time: %{time_total}s | DNS: %{time_namelookup}s | Connect: %{time_connect}s | Transfer: %{time_starttransfer}s | Size: %{size_download} bytes\n" \
       -o /dev/null -s "$url"
  
  echo ""
done

echo "🎯 Performance test completed!"
echo ""
echo "📈 For detailed analysis:"
echo "   1. Open Chrome DevTools (F12)"
echo "   2. Go to Lighthouse tab" 
echo "   3. Run performance audit"
echo ""
echo "🔍 For bundle analysis:"
echo "   npm run analyze"
echo ""
echo "📝 Monitor real-time metrics in browser console (development mode)"