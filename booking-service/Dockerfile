FROM node:18-alpine
WORKDIR /app

# Install Redis CLI
RUN apk update && apk add redis

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy application code and initialization script
COPY . .
COPY init-redis.sh /app/init-redis.sh
RUN chmod +x /app/init-redis.sh

# Expose the service port
EXPOSE 4000

# Run the Redis initialization script and start the Node.js application
CMD ["/bin/sh", "-c", "/app/init-redis.sh && node index.js"]
