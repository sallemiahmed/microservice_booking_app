#!/bin/sh

echo "Waiting for Redis to be ready..."
while ! redis-cli -h redis ping | grep -q PONG; do
  sleep 5
done

echo "Initializing Redis with booking data..."
redis-cli -h redis HSET bookings:1 booking1 "Flight to Cairo" booking2 "Hotel in Alexandria"
redis-cli -h redis HSET bookings:2 booking1 "Train to Tunis" booking2 "Resort in Sousse"
echo "Redis data initialized."
