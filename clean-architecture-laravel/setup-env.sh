#!/bin/bash

# Environment Setup Script
# Usage: ./setup-env.sh

echo "🔧 Setting up environment configuration..."

# Check if .env already exists
if [ -f .env ]; then
    echo "⚠️  .env file already exists"
    read -p "Do you want to backup and recreate? (yes/no): " confirm
    if [ "$confirm" = "yes" ]; then
        cp .env .env.backup.$(date +%Y%m%d_%H%M%S)
        echo "✅ Current .env backed up"
    else
        echo "❌ Setup cancelled"
        exit 0
    fi
fi

# Create .env from template
cat > .env << 'EOF'
APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=homwork
DB_USERNAME=root
DB_PASSWORD=

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1

VITE_APP_NAME="${APP_NAME}"
VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
EOF

echo "✅ .env file created"

# Prompt for database configuration
echo ""
echo "🔧 Please configure your database connection:"
echo ""

read -p "Database Host (default: 127.0.0.1): " db_host
db_host=${db_host:-127.0.0.1}

read -p "Database Port (default: 3306): " db_port
db_port=${db_port:-3306}

read -p "Database Name (default: homwork): " db_database
db_database=${db_database:-homwork}

read -p "Database Username (default: root): " db_username
db_username=${db_username:-root}

read -s -p "Database Password: " db_password
echo ""

# Update .env with user input
sed -i "s/DB_HOST=.*/DB_HOST=$db_host/" .env
sed -i "s/DB_PORT=.*/DB_PORT=$db_port/" .env
sed -i "s/DB_DATABASE=.*/DB_DATABASE=$db_database/" .env
sed -i "s/DB_USERNAME=.*/DB_USERNAME=$db_username/" .env
sed -i "s/DB_PASSWORD=.*/DB_PASSWORD=$db_password/" .env

echo "✅ Database configuration updated"

# Generate APP_KEY if not exists
if ! grep -q "APP_KEY=base64:" .env; then
    echo "🔑 Generating application key..."
    php artisan key:generate
fi

echo ""
echo "✅ Environment setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Test database connection: ./backup.sh status"
echo "2. Create backup: ./backup.sh backup"
