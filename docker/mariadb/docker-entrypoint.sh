#!/bin/bash
set -e

# Initialize database if empty
if [ ! -d /var/lib/mysql/mysql ]; then
    echo "Initializing database..."

    # Start MySQL server
    mysqld --initialize-insecure --user=mysql --datadir=/var/lib/mysql

    # Start temporary MySQL server
    echo "Starting temporary server..."
    mysqld_safe --skip-networking &
    pid="$!"

    # Wait for server to start
    echo "Waiting for MySQL to start..."
    for i in {30..0}; do
        if mysqladmin ping &>/dev/null; then
            break
        fi
        echo -n '.'
        sleep 1
    done
    if [ "$i" = 0 ]; then
        echo "MySQL init process failed."
        exit 1
    fi

    # Set root password
    echo "Setting root password..."
    mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '${MYSQL_ROOT_PASSWORD}';"

    # Create database if set
    if [ "$MYSQL_DATABASE" ]; then
        echo "Creating database: $MYSQL_DATABASE"
        mysql -e "CREATE DATABASE IF NOT EXISTS \`${MYSQL_DATABASE}\`;"
    fi

    # Create user (optional) if provided
    if [ "$MYSQL_USER" ] && [ "$MYSQL_PASSWORD" ]; then
        echo "Creating user: $MYSQL_USER"
        mysql -e "CREATE USER '${MYSQL_USER}'@'%' IDENTIFIED BY '${MYSQL_PASSWORD}';"
        mysql -e "GRANT ALL PRIVILEGES ON \`${MYSQL_DATABASE}\`.* TO '${MYSQL_USER}'@'%';"
        mysql -e "FLUSH PRIVILEGES;"
    fi

    # Stop temporary MySQL server
    echo "Stopping temporary server..."
    mysqladmin shutdown

    # Wait for MySQL to finish shutdown
    wait "$pid"
fi

# Start the real MySQL server
exec "$@"
