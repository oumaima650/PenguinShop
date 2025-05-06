FROM mysql:8.0

# Set default environment variables
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=projetlinux

# Copy custom configuration if needed
COPY my.cnf /etc/mysql/conf.d/

# Set the working directory
WORKDIR /var/lib/mysql

# Expose the MySQL port
EXPOSE 3306

# Start the MySQL server
CMD ["mysqld"]
