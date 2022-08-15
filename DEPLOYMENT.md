# Deployment Guide

## Prerequisites
- Java 17+
- Node.js 16+
- MongoDB 4.4+
- Maven 3.6+

## Backend Deployment

1. Build the project:
   ```bash
   mvn clean package
   ```

2. Configure environment variables:
   - MONGODB_URI
   - JWT_SECRET
   - MAIL_USERNAME

3. Run the JAR:
   ```bash
   java -jar target/nyaya-mitra-backend-1.0.0.jar
   ```

## Frontend Deployment

1. Build for production:
   ```bash
   npm run build
   ```

2. Serve the build folder with any static file server

## Docker Deployment (Coming Soon)
- Dockerfile for backend
- Dockerfile for frontend
- docker-compose.yml
