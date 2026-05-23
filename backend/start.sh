#!/bin/sh
set -e

echo "🌱 Running database seed from siteData.json..."
node seed.js

echo "🚀 Starting backend server..."
exec node server.js
