#!/bin/sh

echo "Waiting for MySQL to be ready..."
while ! nc -z mysql 3306; do
  sleep 2
done
echo "MySQL is up. Proceeding with database initialization."
