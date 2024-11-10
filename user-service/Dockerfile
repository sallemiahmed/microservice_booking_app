FROM node:18-alpine
WORKDIR /app

# Install MySQL client
RUN apk update && apk add mysql-client

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy application code and initialization scripts
COPY . .
COPY init.sql /app/init.sql
COPY wait-for-mysql.sh /wait-for-mysql.sh
RUN chmod +x /wait-for-mysql.sh

# Expose the service port
EXPOSE 3000

# Wait for MySQL to be ready, run the init.sql script, then start the Node.js application
CMD ["/bin/sh", "-c", "/wait-for-mysql.sh && mysql -h mysql -u root -prootpassword < /app/init.sql && node index.js"]
