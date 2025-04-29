# docker/mariadb/Dockerfile
FROM ubuntu:20.04

# Install MariaDB
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y mariadb-server && \
    apt-get clean

# Expose MariaDB port
EXPOSE 3306










# Fix permissions
RUN mkdir -p /var/run/mysqld && chown -R mysql:mysql /var/run/mysqld
RUN chown -R mysql:mysql /var/lib/mysql

# Copy entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["mysqld"]

