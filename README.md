
# Microservice Booking App

## Overview
This project is a microservice-based application with two main services:
1. **User Service**: Manages user information and uses MySQL as the database.
2. **Booking Service**: Manages booking information and uses Redis as the database.

The services are containerized using Docker and orchestrated with Docker Compose.

## Prerequisites
Ensure you have the following installed on your system:
- **Docker**: [Installation Guide](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Installation Guide](https://docs.docker.com/compose/install/)
- **Git**: [Installation Guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Installation

1. **Clone the Repository**
   ```bash
   git clone <your-repo-url>
   cd microservice_booking_app
   ```

2. **Set Up the Environment**
   Ensure that you have the required files and directory structure:
   ```
   microservice_booking_app/
   ├── booking-service/
   │   ├── Dockerfile
   │   ├── index.js
   │   ├── init-redis.sh
   │   └── package.json
   ├── user-service/
   │   ├── Dockerfile
   │   ├── index.js
   │   ├── init.sql
   │   ├── wait-for-mysql.sh
   │   └── package.json
   └── docker-compose.yml
   ```

3. **Build and Start the Services**
   ```bash
   docker-compose build
   docker-compose up -d
   ```

4. **Verify the Services**
   Check if all services are running:
   ```bash
   docker-compose ps
   ```

## Testing the API

1. **Test User Information Endpoint**
   ```bash
   curl http://localhost:3000/user/1
   ```

2. **Test User Information with Bookings**
   ```bash
   curl http://localhost:3000/user/1/bookings
   ```

   **Expected Response:**
   ```json
   {
     "id": 1,
     "name": "Ahmed",
     "email": "ahmed@example.com",
     "bookings": {
       "booking1": "Flight to Cairo",
       "booking2": "Hotel in Alexandria"
     }
   }
   ```

## Packages Used

### User Service
- **express**: Web framework for Node.js
- **mysql2**: MySQL client for Node.js
- **dotenv**: Environment variable management
- **axios**: HTTP client for API requests

### Booking Service
- **express**: Web framework for Node.js
- **redis**: Redis client for Node.js
- **dotenv**: Environment variable management

## Troubleshooting

- **Connection Issues**: If you encounter connection issues, ensure that Docker services are running and check the logs:
  ```bash
  docker-compose logs -f user-service
  docker-compose logs -f booking-service
  ```

- **Empty Redis Data**: If the Redis data is empty, try manually initializing the data:
  ```bash
  docker-compose exec booking-service sh /app/init-redis.sh
  ```

## Cleanup

To stop and remove all containers, networks, and volumes:
```bash
docker-compose down -v
```

## License
This project is licensed under the MIT License.
