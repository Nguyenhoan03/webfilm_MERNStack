#!/bin/bash

# Simple Database Backup & Rollback Script
# Usage: ./backup.sh [backup|rollback|status]

ACTION=${1:-"help"}

# Load .env
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

DB_HOST=${DB_HOST:-127.0.0.1}
DB_PORT=${DB_PORT:-3306}
DB_DATABASE=${DB_DATABASE:-homwork}
DB_USERNAME=${DB_USERNAME:-root}
DB_PASSWORD=${DB_PASSWORD:-}
BACKUP_DIR="./database/backups"
mkdir -p $BACKUP_DIR

case $ACTION in
    "backup")
        BACKUP_NAME="backup_$(date +%Y%m%d_%H%M%S)"
        echo "💾 Creating backup: $BACKUP_NAME"
        mysqldump -h $DB_HOST -P $DB_PORT -u $DB_USERNAME -p$DB_PASSWORD \
            --single-transaction --routines --triggers --events --hex-blob \
            $DB_DATABASE > "$BACKUP_DIR/${BACKUP_NAME}.sql"
        echo "✅ Backup saved: $BACKUP_DIR/${BACKUP_NAME}.sql"
        ;;
    
    "rollback")
        echo "📋 Available backups:"
        ls -t $BACKUP_DIR/*.sql 2>/dev/null | head -10 | nl
        read -p "Enter backup number: " num
        BACKUP_FILE=$(ls -t $BACKUP_DIR/*.sql 2>/dev/null | sed -n "${num}p")
        if [ -f "$BACKUP_FILE" ]; then
            echo "⚠️  Restoring: $BACKUP_FILE"
            read -p "Continue? (y/n): " confirm
            if [ "$confirm" = "y" ]; then
                mysql -h $DB_HOST -P $DB_PORT -u $DB_USERNAME -p$DB_PASSWORD \
                    -e "DROP DATABASE IF EXISTS $DB_DATABASE; CREATE DATABASE $DB_DATABASE;"
                mysql -h $DB_HOST -P $DB_PORT -u $DB_USERNAME -p$DB_PASSWORD \
                    $DB_DATABASE < "$BACKUP_FILE"
                echo "✅ Database restored"
            fi
        else
            echo "❌ Invalid backup number"
        fi
        ;;
    
    "status")
        echo "📊 Database: $DB_DATABASE@$DB_HOST:$DB_PORT"
        if mysql -h $DB_HOST -P $DB_PORT -u $DB_USERNAME -p$DB_PASSWORD -e "SELECT 1;" > /dev/null 2>&1; then
            echo "✅ Connection OK"
        else
            echo "❌ Connection failed"
        fi
        echo "💾 Backups: $(ls $BACKUP_DIR/*.sql 2>/dev/null | wc -l) files"
        ;;
    
    "help"|*)
        echo "🎯 Simple Database Manager"
        echo "Usage: ./backup.sh [backup|rollback|status]"
        echo ""
        echo "Commands:"
        echo "  backup   - Create database backup"
        echo "  rollback - Restore from backup"
        echo "  status   - Check connection & backups"
        echo "  help     - Show this help"
        ;;
esac
